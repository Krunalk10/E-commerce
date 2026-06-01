export function Button({
  children,
  className = '',
  icon: Icon,
  isFullWidth = false,
  variant = 'primary',
  ...props
}) {
  const classes = [
    'button',
    `button--${variant}`,
    isFullWidth ? 'button--full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button className={classes} type="button" {...props}>
      {Icon ? <Icon aria-hidden="true" size={18} /> : null}
      <span>{children}</span>
    </button>
  )
}
