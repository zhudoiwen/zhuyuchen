"use client";

import { cn } from "@/lib/utils";

interface RainbowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
  className?: string;
}

const RainbowButton = ({
  variant = "default",
  className,
  children,
  ...props
}: RainbowButtonProps) => {
  return (
    <button
      className={cn(
        "relative px-8 py-4 font-semibold rounded-full transition-all duration-300 cursor-pointer hover:-translate-y-1 active:scale-[0.98] shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]",
        className
      )}
      style={{
        background: "transparent",
        border: "none",
        overflow: "hidden",
      }}
      {...props}
    >
      <span
        className={cn(
          "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />

      <span className="relative z-10">
        <span
          className="relative inline-block bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:300%_100%] bg-clip-text text-transparent"
          style={{
            animation: "rainbow-flow-border 4s linear infinite",
          }}
        >
          {children}
        </span>
      </span>
      <style>{`
        @keyframes rainbow-flow-border {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </button>
  );
};

export { RainbowButton };