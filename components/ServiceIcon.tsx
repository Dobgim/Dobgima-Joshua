import type { Service } from "@/lib/services";

const paths: Record<Service["icon"], React.ReactNode> = {
  web: (
    <>
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4M3 8h18" />
    </>
  ),
  mobile: (
    <>
      <rect x="6.5" y="2" width="11" height="20" rx="2.5" />
      <path d="M11 18h2" />
    </>
  ),
  ai: (
    <>
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15z" />
    </>
  ),
};

export default function ServiceIcon({ icon, className = "h-6 w-6" }: { icon: Service["icon"]; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {paths[icon]}
    </svg>
  );
}
