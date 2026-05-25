"use client";

import { IconCloud } from "@/components/ui/icon-cloud";

const imagePaths = Array.from({ length: 27 }, (_, i) => `/${i + 1}.svg`);

export function IconCloudDemo() {
  return (
    <div className="relative flex size-full items-center justify-center overflow-hidden">
      <IconCloud images={imagePaths} />
    </div>
  );
}
