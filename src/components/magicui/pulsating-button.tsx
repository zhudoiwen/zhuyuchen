"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { BorderBeam } from "@/registry/magicui/border-beam";

interface PulsatingButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
}

const PulsatingButton = ({ children, className = "", href, onClick }: PulsatingButtonProps) => {
  const content = (
    <div className={cn(
      "relative px-6 py-2.5 rounded-full overflow-hidden transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer",
      className
    )}
    style={{
      background: "transparent",
      border: "none",
    }}>
      {/* 玻璃高光描边 */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border: "0.5px solid transparent",
          background: `
            linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.6) 0%,
              rgba(255, 255, 255, 0.12) 25%,
              rgba(255, 255, 255, 0.04) 50%,
              rgba(255, 255, 255, 0.12) 75%,
              rgba(255, 255, 255, 0.6) 100%
            ) border-box`,
          mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
      {/* 霓虹灯流光边框 */}
      <span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: "linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #54a0ff, #5f27cd, #ff6b6b)",
          backgroundSize: "300% 100%",
          animation: "rainbow-flow-border 4s linear infinite",
          padding: "0.5px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          opacity: 0.4,
        }}
      />
      {/* 顶部极细高光线 */}
      <span
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.5) 85%, transparent 100%)",
        }}
      />
      {/* 左侧极细高光线 */}
      <span
        className="absolute top-1/4 left-0 w-px h-1/2 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.4) 15%, rgba(255, 255, 255, 0.75) 50%, rgba(255, 255, 255, 0.4) 85%, transparent 100%)",
        }}
      />
      <BorderBeam duration={99} size={100} />
      <span className="relative z-10 text-white/90 text-sm font-medium">
        {children}
      </span>
      <style>{`
        @keyframes rainbow-flow-border {
          0% { background-position: 0% 50%; }
          100% { background-position: 300% 50%; }
        }
      `}</style>
    </div>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }

  if (onClick) {
    return (
      <div onClick={onClick} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}>
        {content}
      </div>
    );
  }

  return content;
};

export { PulsatingButton };
