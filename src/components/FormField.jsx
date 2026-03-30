function FormField({ label, id, type = 'text', as = 'input', ...rest }) {
  const FieldTag = as

  return (
    <div className="form-row">
      <label className="form-label" htmlFor={id}>
        {label}
      </label>
      <FieldTag
        id={id}
        className={
          as === 'textarea' ? 'form-textarea' : type === 'select' ? 'form-select' : 'form-input'
        }
        {...rest}
      />
    </div>
  )
}

export default FormField

