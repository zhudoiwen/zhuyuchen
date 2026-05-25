/* eslint-disable @next/next/no-img-element */
"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Markdown from "react-markdown";
import { BorderBeam } from "@/registry/magicui/border-beam";

function ProjectImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false);

  if (!src || imageError) {
    return <div className="w-full h-48 bg-muted" />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-48 object-cover"
      onError={() => setImageError(true)}
    />
  );
}

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  link,
  image,
  video,
  links,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col h-full rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-muted hover:text-foreground active:scale-[0.96] active:-translate-y-0.5 relative",
        className
      )}
      style={{
        background: "transparent",
        border: "none",
      }}
    >
      {/* 柔和发光效果 */}
      <span
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 ease-out opacity-0 hover:opacity-100"
        style={{
          boxShadow: "0 0 30px rgba(255, 107, 107, 0.3), 0 0 60px rgba(72, 219, 251, 0.2), 0 0 90px rgba(155, 89, 182, 0.1)",
        }}
      />
      {/* 玻璃高光描边 */}
      <span
        className="absolute inset-0 rounded-xl pointer-events-none"
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
        className="absolute inset-0 rounded-xl pointer-events-none transition-all duration-300 ease-out"
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
        className="absolute top-0 left-0 right-0 pointer-events-none"
        style={{
          height: "0.5px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.5) 15%, rgba(255, 255, 255, 0.85) 50%, rgba(255, 255, 255, 0.5) 85%, transparent 100%)",
        }}
      />
      {/* 左侧极细高光线 */}
      <span
        className="absolute top-0 bottom-0 left-0 pointer-events-none"
        style={{
          width: "0.5px",
          background: "linear-gradient(180deg, transparent 0%, rgba(255, 255, 255, 0.4) 15%, rgba(255, 255, 255, 0.75) 50%, rgba(255, 255, 255, 0.4) 85%, transparent 100%)",
        }}
      />
      <BorderBeam duration={99} size={100} />
      <div className="relative shrink-0">
          {video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-48 object-cover"
            />
          ) : image ? (
            <ProjectImage src={image} alt={title} />
          ) : (
            <div className="w-full h-48 bg-muted" />
          )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{title}</h3>
            <time className="text-xs text-muted-foreground">{dates}</time>
          </div>
        </div>
        <div className="text-xs flex-1 prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
          <Markdown>{description}</Markdown>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-auto">
            {tags.map((tag) => (
              <Badge
                key={tag}
                className="text-[11px] font-medium border border-border h-6 w-fit px-2"
                variant="outline"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
