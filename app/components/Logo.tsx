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
      {/* Back card — left reflection, light blue tint */}
      <rect x="1" y="5" width="18" height="23" rx="4" fill="white" opacity="0.55" />

      {/* Front card — fully white */}
      <rect x="9" y="2" width="19" height="25" rx="4" fill="white" />

      {/* Kanji 字 */}
      <text
        x="18.5"
        y="21"
        fontFamily="serif"
        fontSize="14"
        fontWeight="bold"
        fill="#3F51B5"
        textAnchor="middle"
      >
        字
      </text>
    </svg>
  );
}
