import { Link } from 'react-router-dom';

const Button = ({ as = 'a', href = '#', to, children, variant = 'default', className = '', style, ...rest }) => {
  const classes = [`btn`, variant === 'primary' ? 'btn--primary' : '', className]
    .filter(Boolean)
    .join(' ');

  const commonProps = { className: classes, style, ...rest };

    if (to) {
    return (
        <Link to={to} {...commonProps}>
        {children}
        </Link>
    );
  }

    if (as === 'button') {
      return (
          <button type="button" {...commonProps}>
              {children}
          </button>
        );
    }

    return (
        <a href={href} {...commonProps}>
            {children}
        </a>
  );
};

export default Button;
