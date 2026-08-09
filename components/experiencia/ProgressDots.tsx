"use client";

export default function ProgressDots({
  total,
  activeActo,
}: {
  total: number;
  activeActo: number;
}) {
  return (
    <div className="absolute bottom-6 right-6 flex gap-2 z-30 pointer-events-none">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i + 1 === activeActo;
        return (
          <span
            key={i}
            className="block rounded-full transition-all duration-300"
            style={{
              width: isActive ? 22 : 6,
              height: 6,
              backgroundColor: isActive ? "#A7E12F" : "rgba(255,255,255,0.25)",
            }}
          />
        );
      })}
    </div>
  );
}
