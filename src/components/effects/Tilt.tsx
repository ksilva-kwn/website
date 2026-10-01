import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltProps {
  children: ReactNode;
  className?: string;
  max?: number; // degrees
}

// Tilts its content in 3D toward the mouse, with a soft spotlight under the cursor.
// Mouse-only: touch devices get a plain, static card.
const Tilt = ({ children, className, max = 5 }: TiltProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!finePointer) return;

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${x * 100}%`);
        el.style.setProperty("--my", `${y * 100}%`);
        if (!reduceMotion) {
          el.style.transform = `perspective(1000px) rotateX(${(0.5 - y) * max}deg) rotateY(${(x - 0.5) * max}deg)`;
        }
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      el.style.transform = "";
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div ref={ref} className={cn("group/tilt relative transition-transform duration-300 ease-out", className)}>
      {children}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), hsl(0 0% 100% / 0.09), transparent 45%)",
        }}
      />
    </div>
  );
};

export default Tilt;
