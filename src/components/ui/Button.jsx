const Button = ({ as = 'a', href = '#', children, variant = 'default', className = '', style, ...rest }) => {
  const Component = as === 'button' ? 'button' : 'a';
  const classes = [`btn`, variant === 'primary' ? 'btn--primary' : '', className]
    .filter(Boolean)
    .join(' ');

  const commonProps = { className: classes, style, ...rest };
  if (Component === 'a') {
    return (
      <a href={href} {...commonProps}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" {...commonProps}>
      {children}
    </button>
  );
};

export default Button;
