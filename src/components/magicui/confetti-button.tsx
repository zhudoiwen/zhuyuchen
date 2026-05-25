"use client";

import { useCallback } from "react";
import confetti from "canvas-confetti";

interface ConfettiButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function ConfettiButton({ children, onClick, className, ...props }: ConfettiButtonProps) {
  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#ffaa40', '#9c40ff', '#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'],
    });

    onClick?.(e);
  }, [onClick]);

  return (
    <div className="group relative flex items-center justify-center rounded-full px-6 py-3 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-all duration-300 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] hover:-translate-y-3 active:scale-[0.85] active:-translate-y-1">
      <span
        className="animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
        style={{
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      <button
        onClick={handleClick}
        className="relative z-10 bg-transparent border-none outline-none cursor-pointer"
        {...props}
      >
        <span className="relative inline-block bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:300%_100%] bg-clip-text text-transparent font-semibold"
          style={{
            animation: "rainbow-flow-border 4s linear infinite",
          }}
        >
          {children}
        </span>
      </button>
    </div>
  );
}