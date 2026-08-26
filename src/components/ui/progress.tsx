import * as React from "react";
import { cn } from "@/lib/utils";

export function Progress({
  value = 0,
  max = 100,
  className,
  indicatorClassName,
}: {
  value?: number;
  max?: number;
  className?: string;
  indicatorClassName?: string;
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <div
      className={cn(
        "relative h-2 w-full overflow-hidden rounded-full bg-secondary/80 border border-border/40",
        className
      )}
    >
      <div
        className={cn(
          "h-full w-full flex-1 bg-gradient-to-r from-indigo-500 to-cyan-400 transition-all duration-300 ease-in-out",
          indicatorClassName
        )}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
}
