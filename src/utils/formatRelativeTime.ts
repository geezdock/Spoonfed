export function formatRelativeTime(dateString: string) {
  const date = new Date(dateString)
  const diffInSeconds = Math.round((date.getTime() - Date.now()) / 1000)
  const absSeconds = Math.abs(diffInSeconds)

  if (absSeconds < 60) {
    return 'just now'
  }

  if (absSeconds < 60 * 60) {
    return `${Math.round(absSeconds / 60)}m ago`
  }

  if (absSeconds < 60 * 60 * 24) {
    return `${Math.round(absSeconds / (60 * 60))}h ago`
  }

  if (absSeconds < 60 * 60 * 24 * 30) {
    return `${Math.round(absSeconds / (60 * 60 * 24))}d ago`
  }

  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
}