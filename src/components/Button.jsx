// Small reusable button component that wraps the existing
// `.btn`, `.btn-primary`, `.btn-secondary` styles so we
// keep the visual language but gain a consistent API.
function Button({ variant = 'primary', children, className = '', ...rest }) {
  const variantClass =
    variant === 'secondary'
      ? 'btn-secondary'
      : variant === 'danger'
      ? 'btn-danger'
      : variant === 'ghost'
      ? 'btn-ghost'
      : 'btn-primary';

  const composed = ['btn', variantClass, className].filter(Boolean).join(' ');

  return (
    <button type="button" className={composed} {...rest}>
      {children}
    </button>
  );
}

export default Button;

