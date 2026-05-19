interface Props {
  size?: number;
}

export default function Logo({ size = 32 }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#6d28d9" />
        </linearGradient>
      </defs>

      {/* Back card — offset up-right, muted */}
      <rect x="9" y="2" width="20" height="26" rx="4" fill="#c4b5fd" opacity="0.45" />

      {/* Front card */}
      <rect x="3" y="6" width="20" height="26" rx="4" fill="url(#logoGrad)" />

      {/* Kanji 字 ("character") */}
      <text
        x="13"
        y="25"
        fontFamily="serif"
        fontSize="15"
        fontWeight="bold"
        fill="white"
        textAnchor="middle"
        opacity="0.95"
      >
        字
      </text>
    </svg>
  );
}
