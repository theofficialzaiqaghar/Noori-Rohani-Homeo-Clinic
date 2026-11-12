/** Word wrappers for GSAP stagger — SplitText-style without Club plugin. */
export function SplitWords({ as: Tag = "span", text, className = "", innerClass = "hero-word__inner", ...rest }) {
  if (!text) return null;
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <Tag className={className} {...rest}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="hero-word">
          <span className={innerClass}>{word}</span>
          {i < words.length - 1 ? "\u00a0" : null}
        </span>
      ))}
    </Tag>
  );
}
