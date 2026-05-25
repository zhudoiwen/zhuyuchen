"use client";

import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { BorderBeam } from "@/registry/magicui/border-beam";

interface RainbowHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const RainbowHeading = ({ children, className = "" }: RainbowHeadingProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "group relative px-8 py-4 rounded-full cursor-pointer shadow-[inset_0_-8px_10px_#8fdfff1f] transition-all duration-300 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] hover:-translate-y-1 active:scale-[0.98]",
        className
      )}
    >
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

      <span className="relative z-10 font-semibold">
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
    </div>
  );
};

export { RainbowHeading };
