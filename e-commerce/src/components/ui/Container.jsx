export function Container({ children, className = '', ...props }) {
  return (
    <div className={['container', className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  )
}
