export default function Logo({ className = 'h-9 w-9' }) {
  return (
    <svg viewBox="0 0 1024 1024" className={className} aria-hidden="true">
      <rect width="1024" height="1024" rx="220" fill="#5B5FEF" />
      <rect x="256" y="180" width="512" height="664" rx="72" fill="none" stroke="#FFFFFF" strokeWidth="40" />
      <rect x="340" y="320" width="200" height="34" rx="17" fill="#FFFFFF" />
      <rect x="340" y="410" width="200" height="34" rx="17" fill="#FFFFFF" />
      <rect x="340" y="500" width="140" height="34" rx="17" fill="#FFFFFF" />
      <circle cx="512" cy="700" r="160" fill="#2E9E5B" />
      <path
        d="M 440 700 L 490 752 L 590 640"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="46"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
