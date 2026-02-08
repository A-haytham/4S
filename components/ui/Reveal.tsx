"use client";

import type { CSSProperties, ReactNode } from "react";
import useInView from "./useInView";

type RevealProps = {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 600,
  once = true,
  className = "",
}: RevealProps) {
  const { ref, isInView } = useInView({ once });

  const hiddenTransforms: Record<NonNullable<RevealProps["direction"]>, string> = {
    up: "translate3d(0, 16px, 0)",
    down: "translate3d(0, -16px, 0)",
    left: "translate3d(16px, 0, 0)",
    right: "translate3d(-16px, 0, 0)",
  };

  const style: CSSProperties = {
    ["--reveal-delay" as string]: `${delay}ms`,
    ["--reveal-duration" as string]: `${duration}ms`,
    opacity: isInView ? 1 : 0,
    transform: isInView ? "translate3d(0, 0, 0)" : hiddenTransforms[direction],
    transition: `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
    willChange: "opacity, transform",
  };

  const classes = [
    "reveal",
    `reveal--${direction}`,
    isInView ? "is-visible" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={ref} className={classes} style={style} data-reveal>
      {children}
    </div>
  );
}
