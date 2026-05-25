/* eslint-disable @next/next/no-img-element */
"use client";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { RainbowHeading } from "@/components/magicui/rainbow-heading";
import { IconCloudDemo } from "@/components/magicui/icon-cloud";
import AvatarNeon from "@/components/avatar-neon";
import { DATA } from "@/data/resume";
import Markdown from "react-markdown";
import HackathonsSection from "@/components/section/hackathons-section";
import { AnimatedGradientTextDemo } from "@/components/magicui/animated-gradient-text-demo";
import { ConfettiButtonDemo } from "@/components/magicui/confetti-button-demo";
import { useState } from "react";
import { Tree } from "@/registry/magicui/file-tree";
import type { TreeViewElement } from "@/registry/magicui/file-tree";

const BLUR_FADE_DELAY = 0.04;

const ELEMENTS: TreeViewElement[] = [
  {
    id: "src",
    name: "src",
    type: "folder" as const,
    children: [
      {
        id: "folder1",
        type: "folder" as const,
        isSelectable: true,
        name: "毛选",
        children: [
          {
            id: "file1",
            type: "file" as const,
            isSelectable: true,
            name: "原文：这些阶级代表中国最落后的生产关系.txt",
          },
          {
            id: "file2",
            type: "file" as const,
            isSelectable: true,
            name: "地主与买办阶级维护的旧生产关系，严重阻碍社会生产力的发展.txt",
          },
        ],
      },
      {
        id: "folder2",
        type: "folder" as const,
        isSelectable: true,
        name: "毛选",
        children: [
          {
            id: "file3",
            type: "file" as const,
            isSelectable: true,
            name: "原文：阻碍中国生产力的发展.txt",
          },
        ],
      },
      {
        id: "folder3",
        type: "folder" as const,
        isSelectable: true,
        name: "毛选",
        children: [
          {
            id: "file4",
            type: "file" as const,
            isSelectable: true,
            name: "原文：他们和中国革命的目的完全不相容.txt",
          },
          {
            id: "file5",
            type: "file" as const,
            isSelectable: true,
            name:"译文：他们的利益诉求与中国革命反帝反封建的目标根本对立.txt",
          },
        ],
      },
    ],
  },
];

function FileTreeDemo() {
  const [showError, setShowError] = useState(false);
  const [errorPosition, setErrorPosition] = useState({ top: 0, left: 0 });

  const handleExpandChange = (element: TreeViewElement, expanded: boolean) => {
    if (element.id === "folder2" && expanded) {
      const folderElement = document.querySelector('[data-id="folder2"]') as HTMLDivElement;
      if (folderElement) {
        const rect = folderElement.getBoundingClientRect();
        const parentRect = folderElement.closest('.file-tree-container')?.getBoundingClientRect();
        if (parentRect) {
          setErrorPosition({
            top: rect.top - parentRect.top - 80,
            left: (rect.width / 2) - 100
          });
        }
      }
      setShowError(true);
    }
  };

  return (
    <div className="bg-background relative w-full max-w-md aspect-[9/16] rounded-lg border flex items-center justify-center file-tree-container">
      <div className="w-full px-4 py-[25%] overflow-y-auto h-full flex flex-col justify-center">
        <Tree
          className="bg-background overflow-hidden rounded-md"
          initialSelectedId="file1"
          initialExpandedItems={["src", "folder1", "folder3"]}
          elements={ELEMENTS}
          onExpandChange={handleExpandChange}
        />
      </div>

      {showError && (
        <div className="absolute bg-card border rounded-lg shadow-lg p-4 w-[280px] z-50" style={{ top: errorPosition.top, left: errorPosition.left }}>
          <div className="text-lg font-semibold mb-2">提示</div>
          <div className="text-muted-foreground mb-4">⚠️ ReferenceError: Cannot access file before initialization.</div>
          <div className="flex justify-end">
            <button
              className="bg-primary text-primary-foreground px-4 py-1 rounded-md hover:bg-primary/90 transition-colors"
              onClick={() => setShowError(false)}
            >
              确定
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-dvh flex flex-col gap-14 relative">
      <section id="hero">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 gap-y-6 flex flex-col md:flex-row justify-between">
            <div className="gap-2 flex flex-col order-2 md:order-1">
              <BlurFade delay={BLUR_FADE_DELAY}>
                <RainbowButton variant="outline">Hi，我是果粒橙✨</RainbowButton>
              </BlurFade>
              <BlurFadeText
                className="text-muted-foreground max-w-[600px] md:text-lg lg:text-xl"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} className="order-1 md:order-2">
              <AvatarNeon />
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <RainbowHeading className="text-xl font-bold">一颗小橙子的向阳日记🍊</RainbowHeading>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <div className="prose max-w-full text-pretty font-sans leading-relaxed text-muted-foreground dark:prose-invert">
              <Markdown>
                {DATA.summary}
              </Markdown>
            </div>
          </BlurFade>
        </div>
      </section>

      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-4">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <RainbowHeading className="text-xl font-bold">奇思妙想集🧚‍♀️</RainbowHeading>
          </BlurFade>
          <IconCloudDemo />
        </div>
      </section>
      <section id="hackathons">
        <BlurFade delay={BLUR_FADE_DELAY * 13}>
          <HackathonsSection />
        </BlurFade>
      </section>
      <section className="py-14">
        <AnimatedGradientTextDemo />
      </section>
      <section className="pb-14">
        <ConfettiButtonDemo />
      </section>
      <section className="pb-14 flex justify-center">
        <FileTreeDemo />
      </section>
    </main>
  );
}