export function Button({ as: Tag = "button", variant = "primary", className = "", children, type, ...props }) {
  const classNames = `btn btn--${variant} ${className}`.trim();
  if (Tag === "button") {
    return (
      <button type={type ?? "button"} className={classNames} {...props}>
        {children}
      </button>
    );
  }
  return (
    <Tag className={classNames} {...props}>
      {children}
    </Tag>
  );
}
