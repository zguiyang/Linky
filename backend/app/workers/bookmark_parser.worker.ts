import { parentPort, isMainThread, workerData, Worker } from 'node:worker_threads'
import { fileURLToPath } from 'node:url'
import { JSDOM } from 'jsdom'
import type { ParsedBookmark, ParsedFolder, ParseResult, WorkerMessage } from '#types/bookmark'

const NETSCAPE_BOOKMARK_HEADER = 'NETSCAPE-Bookmark-file-1'

async function parseHtml(htmlContent: string): Promise<ParseResult> {
  const result: ParseResult = {
    bookmarks: [],
    totalCount: 0,
    errors: [],
  }

  if (!htmlContent.includes(NETSCAPE_BOOKMARK_HEADER)) {
    throw new Error('无效的书签文件格式')
  }

  try {
    const dom = new JSDOM(htmlContent)
    const document = dom.window.document

    const dlElement = document.querySelector('dl')
    if (!dlElement) {
      throw new Error('无法找到书签根元素')
    }

    const folder = parseDlElement(dlElement, '')
    result.bookmarks = flattenFolder(folder)
    result.totalCount = result.bookmarks.length
  } catch (error) {
    throw new Error(`解析书签文件失败: ${error instanceof Error ? error.message : '未知错误'}`)
  }

  return result
}

function parseDlElement(dlElement: Element, parentFolderName: string): ParsedFolder {
  const bookmarks: ParsedBookmark[] = []
  const children: ParsedFolder[] = []
  let addDate = 0
  let lastModified = 0

  const childNodes = Array.from(dlElement.childNodes)

  for (const node of childNodes) {
    if (node.nodeType !== 1) continue

    const element = node as Element

    if (element.tagName.toLowerCase() === 'dt') {
      const h3Element = element.querySelector('h3')
      if (h3Element) {
        const folderName = h3Element.textContent?.trim() || ''
        addDate = parseDate(h3Element.getAttribute('add_date'))
        lastModified = parseDate(h3Element.getAttribute('last_modified'))

        const nestedDl = findNextDlSibling(h3Element)
        if (nestedDl) {
          const childFolder = parseDlElement(nestedDl, folderName)
          children.push(childFolder)
        }
      } else {
        const aElement = element.querySelector('a')
        if (aElement) {
          const url = aElement.getAttribute('href') || ''
          const title = (aElement.textContent || '')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/&quot;/g, '"')
            .trim()

          if (url && isValidUrl(url)) {
            const addDateVal = parseDate(aElement.getAttribute('add_date'))
            const icon = aElement.getAttribute('icon') || undefined

            bookmarks.push({
              title: title || url,
              url,
              addDate: addDateVal,
              icon,
              tags: parentFolderName ? [parentFolderName] : [],
            })
          }
        }
      }
    }
  }

  for (const child of children) {
    for (const bookmark of child.bookmarks) {
      bookmark.tags = [child.name, ...bookmark.tags]
    }
    bookmarks.push(...child.bookmarks)
  }

  return {
    name: parentFolderName,
    bookmarks,
    children,
    addDate,
    lastModified,
  }
}

function findNextDlSibling(h3Element: Element): Element | null {
  let nextSibling = h3Element.nextSibling
  let iterations = 0
  const maxIterations = 1000

  while (nextSibling && iterations < maxIterations) {
    iterations++
    if (nextSibling.nodeType === 1) {
      const element = nextSibling as Element
      if (element.tagName.toLowerCase() === 'dl') {
        return element
      }
      if (element.tagName.toLowerCase() !== 'p') {
        break
      }
    }
    nextSibling = nextSibling.nextSibling
  }

  if (iterations >= maxIterations) {
    console.warn('findNextDlSibling: 达到最大迭代次数限制')
  }

  return null
}

function parseDate(value: string | null): number {
  if (!value) return 0
  const parsed = Number.parseInt(value, 10)
  return Number.isNaN(parsed) ? 0 : parsed
}

function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

function flattenFolder(folder: ParsedFolder): ParsedBookmark[] {
  return folder.bookmarks
}

const port = parentPort

interface WorkerInput {
  htmlContent: string
}

if (!isMainThread && port && workerData) {
  const data = workerData as WorkerInput
  parseHtml(data.htmlContent)
    .then((result) => {
      const message: WorkerMessage = {
        success: true,
        data: result,
      }
      port.postMessage(message)
    })
    .catch((error) => {
      const message: WorkerMessage = {
        success: false,
        error: error instanceof Error ? error.message : '未知错误',
      }
      port.postMessage(message)
    })
}

const PARSE_TIMEOUT_MS = 30000

export async function parseInWorker(htmlContent: string): Promise<ParseResult> {
  const workerPath = fileURLToPath(import.meta.url)

  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData: { htmlContent },
    })

    const timeoutId = setTimeout(() => {
      worker.terminate()
      reject(new Error(`解析超时（${PARSE_TIMEOUT_MS / 1000}秒），请检查文件格式或大小`))
    }, PARSE_TIMEOUT_MS)

    worker.on('message', (message: WorkerMessage) => {
      clearTimeout(timeoutId)
      if (message.success && message.data) {
        resolve(message.data)
      } else {
        reject(new Error(message.error || '解析失败'))
      }
    })

    worker.on('error', (error: Error) => {
      clearTimeout(timeoutId)
      reject(error)
    })

    worker.on('exit', (code: number) => {
      clearTimeout(timeoutId)
      if (code !== 0) {
        reject(new Error(`Worker 退出，退出码: ${code}`))
      }
    })
  })
}
