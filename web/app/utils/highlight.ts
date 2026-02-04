export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

export function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '\'': '&#039;'
  }

  return text.replace(/[&<>"']/g, char => htmlEscapes[char] || char)
}

export function highlightText(html: string, query: string): string {
  if (!query.trim()) {
    return escapeHtml(stripHtml(html))
  }

  const escapedQuery = query.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const regex = new RegExp(`(${escapedQuery})`, 'gi')

  const escapedHtml = escapeHtml(html)

  return escapedHtml.replace(
    regex,
    '<mark class="bg-warning/30 text-warning-foreground px-0.5 rounded">$1</mark>'
  )
}
