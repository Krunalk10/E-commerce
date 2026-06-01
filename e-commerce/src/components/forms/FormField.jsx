export function FormField({
  autoComplete,
  checked,
  error,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  type = 'text',
  value,
}) {
  const inputId = `${name}-field`
  const errorId = `${name}-error`

  if (type === 'checkbox') {
    return (
      <label className="checkbox-field">
        <input
          checked={checked}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          type="checkbox"
        />
        <span>{label}</span>
        {error ? <small>{error}</small> : null}
      </label>
    )
  }

  return (
    <label className="form-field" htmlFor={inputId}>
      <span>{label}</span>
      <input
        aria-describedby={error ? errorId : undefined}
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        id={inputId}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? <small id={errorId}>{error}</small> : null}
    </label>
  )
}
