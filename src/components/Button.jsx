export function Button({ as: Tag = "button", variant = "primary", className = "", children, type, ...props }) {
  const classNames = `btn btn--${variant} ${className}`.trim();
  if (Tag === "a") {
    return (
      <a className={classNames} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type ?? "button"} className={classNames} {...props}>
      {children}
    </button>
  );
}
