"use client";

type LogoProps = {
  size?: number;
  wordmark?: boolean;
  className?: string;
  tone?: "cream" | "dark";
};

export default function Logo({
  size = 24,
  wordmark = true,
  className = "",
  tone = "cream",
}: LogoProps) {
  const color = tone === "cream" ? "#E4E0DD" : "#1C1C1A";
  const triangleWidth = Math.round(size * 0.34);
  const triangleHeight = Math.round(size * 0.44);

  return (
    <span
      className={`inline-flex items-center gap-2.5 leading-none ${className}`}
      aria-label="PG Estrategias"
    >
      <span
        className="relative inline-flex items-center leading-none"
        style={{ height: size }}
      >
        <span
          className="font-title"
          style={{
            fontWeight: 800,
            fontSize: size,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            color,
          }}
        >
          p
        </span>
        <span
          className="inline-flex items-center justify-center"
          style={{ width: triangleWidth, height: size, marginInline: -size * 0.05 }}
          aria-hidden
        >
          <svg
            width={triangleWidth}
            height={triangleHeight}
            viewBox="0 0 10 12"
            fill="none"
          >
            <path d="M0 0 L10 6 L0 12 Z" fill="#D63A27" />
          </svg>
        </span>
        <span
          className="font-title"
          style={{
            fontWeight: 800,
            fontSize: size,
            letterSpacing: "-0.06em",
            lineHeight: 1,
            color,
          }}
        >
          g
        </span>
      </span>

      {wordmark && (
        <span
          className="font-title uppercase leading-none"
          style={{
            fontWeight: 700,
            fontSize: Math.max(11, Math.round(size * 0.42)),
            letterSpacing: "0.14em",
            color,
          }}
        >
          Estrategias
        </span>
      )}
    </span>
  );
}
