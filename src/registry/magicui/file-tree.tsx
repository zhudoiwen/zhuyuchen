"use client";

import * as React from "react";
import { ChevronRight, File, Folder } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type TreeViewElement = {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: TreeViewElement[];
  isSelectable?: boolean;
};

interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  elements: TreeViewElement[];
  initialExpandedItems?: string[];
  initialSelectedId?: string;
  onSelectChange?: (element: TreeViewElement) => void;
  onExpandChange?: (element: TreeViewElement, expanded: boolean) => void;
}

const Tree = React.forwardRef<HTMLDivElement, TreeProps>(
  (
    {
      elements,
      initialExpandedItems = [],
      initialSelectedId,
      onSelectChange,
      onExpandChange,
      className,
      ...props
    },
    ref
  ) => {
    const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
      new Set(initialExpandedItems)
    );
    const [selectedId, setSelectedId] = React.useState<string | undefined>(
      initialSelectedId
    );

    const handleToggle = (id: string) => {
      setExpandedItems((prev) => {
        const newExpanded = new Set(prev);
        if (newExpanded.has(id)) {
          newExpanded.delete(id);
          onExpandChange?.(findElementById(elements, id)!, false);
        } else {
          newExpanded.add(id);
          onExpandChange?.(findElementById(elements, id)!, true);
        }
        return newExpanded;
      });
    };

    const handleSelect = (element: TreeViewElement) => {
      if (element.isSelectable === false) return;
      setSelectedId(element.id);
      onSelectChange?.(element);
    };

    const findElementById = (
      elements: TreeViewElement[],
      id: string
    ): TreeViewElement | undefined => {
      for (const element of elements) {
        if (element.id === id) return element;
        if (element.children) {
          const found = findElementById(element.children, id);
          if (found) return found;
        }
      }
      return undefined;
    };

    const renderTree = (elements: TreeViewElement[], level = 0) => {
      return elements.map((element) => (
        <div key={element.id} className="relative" data-id={element.id}>
          <div
            className={cn(
              "group flex items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors",
              selectedId === element.id && "bg-accent text-accent-foreground",
              element.isSelectable === false && "cursor-not-allowed opacity-50"
            )}
            style={{ paddingLeft: `${level * 16 + 8}px` }}
          >
            {element.type === "folder" && (
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 transition-transform duration-200"
                onClick={() => handleToggle(element.id)}
                style={{
                  transform: expandedItems.has(element.id)
                    ? "rotate(90deg)"
                    : "rotate(0deg)",
                }}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            )}
            {element.type === "folder" ? (
              <Folder className="mr-1 h-4 w-4 text-blue-500" />
            ) : (
              <File className="mr-1 h-4 w-4 text-gray-500" />
            )}
            <span
              className="flex-1 cursor-pointer whitespace-pre-wrap break-words bg-gradient-to-r from-[#ffaa40] via-[#9c40ff] to-[#ffaa40] bg-[length:300%_100%] bg-clip-text text-transparent"
              style={{
                animation: "rainbow-flow-border 4s linear infinite",
              }}
              onClick={() => handleSelect(element)}
            >
              {element.name}
            </span>
          </div>
          {element.type === "folder" && element.children && (
            <AnimatePresence>
              {expandedItems.has(element.id) && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {level < 2 && (
                    <div
                      className="absolute left-4 top-6 h-[calc(100%-24px)] w-px bg-border"
                      style={{ left: `${level * 16 + 16}px` }}
                    />
                  )}
                  {renderTree(element.children, level + 1)}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      ));
    };

    return (
      <div
        ref={ref}
        className={cn("w-full min-w-[300px] overflow-auto", className)}
        {...props}
      >
        {renderTree(elements)}
      </div>
    );
  }
);
Tree.displayName = "Tree";

export { Tree };
