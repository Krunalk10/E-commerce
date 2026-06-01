import { Search } from 'lucide-react'

export function EmptyState({
  action,
  message = 'Try changing filters or search terms.',
  title = 'Nothing found',
}) {
  return (
    <div className="empty-state">
      <Search aria-hidden="true" size={28} />
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </div>
  )
}
