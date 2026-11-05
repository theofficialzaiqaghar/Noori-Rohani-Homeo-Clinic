export function Icon({ name, className = "" }) {
  return (
    <svg className={`icon ${className}`.trim()} aria-hidden="true">
      <use href={`/assets/icons/sprite.svg#${name}`} />
    </svg>
  );
}
