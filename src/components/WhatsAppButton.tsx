import { generalInquiryMessage, inquiryMessage, site, waLink } from "@/lib/site";

type Props = {
  /** Omit for a generic brand enquiry instead of a per-product one. */
  name?: string;
  variant?: "primary" | "outline" | "ghost";
  label?: string;
  className?: string;
};

/**
 * WhatsApp CTA — the only conversion path on the site. Availability, fitting
 * and final pricing are all handled by the owner in the chat thread.
 */
export function WhatsAppButton({
  name,
  variant = "primary",
  label,
  className = "",
}: Props) {
  const href = waLink(name ? inquiryMessage(name) : generalInquiryMessage);

  const styles = {
    primary:
      "bg-primary text-primary-content border-primary hover:bg-transparent hover:text-primary",
    outline:
      "border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-content",
    ghost:
      "border-secondary text-primary bg-transparent hover:bg-primary hover:text-primary-content",
  }[variant];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="whatsapp"
      aria-label={name ? `Tanya tentang ${name} via WhatsApp` : `Hubungi ${site.name} via WhatsApp`}
      className={`inline-flex items-center justify-center gap-2 border px-6 py-3 text-xs tracking-[0.2em] uppercase transition-colors duration-300 ${styles} ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-current"
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m-2.4 3.4c-.17 0-.45.06-.68.32s-.85.83-.85 2.02c0 1.19.87 2.34.99 2.5s2.14 3.27 5.19 4.48c2.53 1.01 3.04.81 3.59.76.55-.05 1.78-.73 2.03-1.43s.25-1.3.18-1.43c-.08-.12-.28-.2-.58-.35s-1.78-.88-2.05-.98c-.27-.1-.47-.15-.67.15s-.77.98-.94 1.18c-.17.2-.35.22-.64.07s-1.28-.47-2.44-1.5c-.9-.8-1.51-1.79-1.69-2.09s-.02-.48.13-.63.32-.35.47-.53c.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57" />
      </svg>
      {label ?? (name ? "Tanya via WhatsApp" : "Chat WhatsApp")}
    </a>
  );
}
