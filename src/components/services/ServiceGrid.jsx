import { ServiceCard } from "./ServiceCard";

/**
 * @param {{ items: { id: string, href: string, icon?: string, title: string, description: string }[], learnMore: string, className?: string, gridClassName?: string }} props
 */
export function ServiceGrid({
  items,
  learnMore,
  className = "services-grid",
  gridClassName = "",
  ...gridProps
}) {
  const gridClasses = [className, gridClassName].filter(Boolean).join(" ");
  return (
    <div className={gridClasses} {...gridProps}>
      {items.map((item) => (
        <ServiceCard
          key={item.id}
          to={item.href}
          icon={item.icon}
          title={item.title}
          description={item.description}
          learnMore={learnMore}
          data-reveal-item
        />
      ))}
    </div>
  );
}
