type Props = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: Props) {
  const centered = align === "center";
  return (
    <div
      className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`}
    >
      {eyebrow && (
        <p className="mb-4 text-[0.65rem] tracking-[0.35em] uppercase text-base-content/70">
          {eyebrow}
        </p>
      )}
      <h2 className="font-serif text-3xl leading-tight text-primary sm:text-4xl md:text-5xl">
        {title}
      </h2>
      <div className={`rule-gold my-6 ${centered ? "mx-auto w-24" : "w-16"}`} />
      {description && (
        <p className="text-sm leading-relaxed text-base-content/70 sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
