import { ref, computed } from 'vue'
import { watchDebounced } from '@vueuse/core'

interface SearchResultItem {
  id: number
  title: string
  description: string | null
  url?: string
  tags: Array<{ id: number, name: string, color: string | null }>
  createdAt: string
  updatedAt: string | null
}

interface SearchResults {
  query: string
  bookmarks: SearchResultItem[]
  memos: SearchResultItem[]
  tags: SearchResultItem[]
}

interface CommandPaletteItem {
  id: string
  type: 'bookmark' | 'memo' | 'tag'
  label: string
  suffix?: string
  icon?: string
  to?: string
  target?: '_blank'
  [key: string]: unknown
}

export function useGlobalSearch() {
  const isOpen = ref(false)
  const searchQuery = ref('')
  const results = ref<SearchResults | null>(null)
  const isLoading = ref(false)

  const open = () => {
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    clearSearch()
  }

  const performSearch = async () => {
    if (!searchQuery.value.trim()) {
      results.value = null
      return
    }

    const { $api } = useNuxtApp()
    isLoading.value = true

    try {
      results.value = await $api<SearchResults>('/search', {
        query: { q: searchQuery.value.trim() }
      })
    } finally {
      isLoading.value = false
    }
  }

  watchDebounced(
    () => searchQuery.value,
    () => {
      if (isOpen.value) {
        performSearch()
      }
    },
    { debounce: 300, deep: true }
  )

  const groups = computed(() => {
    if (!results.value || searchQuery.value.trim() === '') {
      return []
    }

    const groups: Array<{
      id: string
      label: string
      items: CommandPaletteItem[]
    }> = []

    if (results.value.bookmarks.length > 0) {
      groups.push({
        id: 'bookmarks',
        label: '书签',
        items: results.value.bookmarks.map(item => ({
          id: `bookmark-${item.id}`,
          type: 'bookmark' as const,
          label: item.title,
          suffix: item.url,
          icon: 'i-heroicons-bookmark',
          to: item.url,
          target: '_blank' as const
        }))
      })
    }

    if (results.value.memos.length > 0) {
      groups.push({
        id: 'memos',
        label: '备忘录',
        items: results.value.memos.map(item => ({
          id: `memo-${item.id}`,
          type: 'memo' as const,
          label: item.title || '无标题备忘录',
          suffix: item.description || '点击查看详情',
          icon: 'i-heroicons-document-text',
          to: `/workspace/memos?id=${item.id}`
        }))
      })
    }

    if (results.value.tags.length > 0) {
      groups.push({
        id: 'tags',
        label: '标签',
        items: results.value.tags.map(item => ({
          id: `tag-${item.id}`,
          type: 'tag' as const,
          label: item.title,
          icon: 'i-heroicons-tag',
          to: `/workspace/tags/${item.id}`
        }))
      })
    }

    return groups
  })

  const clearSearch = () => {
    searchQuery.value = ''
    results.value = null
  }

  return {
    isOpen,
    searchQuery,
    results,
    isLoading,
    groups,
    open,
    close,
    clearSearch,
    performSearch
  }
}
