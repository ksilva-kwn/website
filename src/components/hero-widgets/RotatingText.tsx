import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface RotatingTextProps {
  words: string[];
  interval?: number;
  className?: string;
  // Applied to each word (e.g. text-gradient, which must sit on the text itself)
  wordClassName?: string;
}

// Cycles through words with a blur/slide transition. The widest word reserves
// the space, so the layout never jumps.
const RotatingText = ({ words, interval = 2600, className, wordClassName }: RotatingTextProps) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={cn("relative inline-grid", className)} aria-live="polite">
      {words.map((word, i) => (
        <span
          key={word}
          aria-hidden={i !== index}
          className={cn(
            "col-start-1 row-start-1 whitespace-nowrap transition-all duration-700 ease-out",
            wordClassName,
            i === index ? "opacity-100 blur-0 translate-y-0" : "opacity-0 blur-md translate-y-3",
          )}
        >
          {word}
        </span>
      ))}
    </span>
  );
};

export default RotatingText;
