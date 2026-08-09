"use client";

type LogoProps = {
  size?: number;
  wordmark?: boolean;
  className?: string;
  tone?: "cream" | "dark";
};

export default function Logo({
  size = 28,
  wordmark = true,
  className = "",
  tone = "cream",
}: LogoProps) {
  const color = tone === "cream" ? "#E4E0DD" : "#1C1C1A";
  const triangleWidth = Math.round(size * 0.32);
  const triangleHeight = Math.round(size * 0.4);

  return (
    <span
      className={`inline-flex items-center gap-2.5 leading-none ${className}`}
      aria-label="PG Estrategias"
    >
      <span
        className="relative inline-block leading-none"
        style={{ height: size }}
      >
        <span
          className="font-title inline-block"
          style={{
            fontSize: size,
            fontWeight: 800,
            letterSpacing: "-0.07em",
            lineHeight: 1,
            color,
          }}
        >
          pg
        </span>
        <svg
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
          width={triangleWidth}
          height={triangleHeight}
          viewBox="0 0 10 12"
          fill="none"
        >
          <path d="M0 0 L10 6 L0 12 Z" fill="#D63A27" />
        </svg>
      </span>

      {wordmark && (
        <span
          className="font-title uppercase leading-none"
          style={{
            fontWeight: 700,
            fontSize: Math.max(11, Math.round(size * 0.4)),
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
