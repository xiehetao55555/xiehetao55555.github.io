export default function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">
          <span className="section-number">{number}</span>
          {label}
        </p>
        <h2>
          {title}
          <span className="accent-dot">.</span>
        </h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
