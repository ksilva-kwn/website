import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Line {
  text: string;
  command?: boolean;
  className?: string;
}

const SCRIPT: Line[] = [
  { text: "terraform apply -auto-approve", command: true },
  { text: "+ aws_eks_cluster.prod", className: "text-emerald-300" },
  { text: "+ azurerm_kubernetes_cluster.aks", className: "text-emerald-300" },
  { text: "+ oci_containerengine_cluster.oke", className: "text-emerald-300" },
  { text: "Apply complete! Resources: 3 added.", className: "text-emerald-400 font-medium" },
  { text: "kubectl get nodes", command: true },
  { text: "NAME          STATUS   CLOUD", className: "text-white/50" },
  { text: "eks-node-01   Ready    aws", className: "text-white/85" },
  { text: "aks-node-01   Ready    azure", className: "text-white/85" },
  { text: "oke-node-01   Ready    oci", className: "text-white/85" },
];

const TYPE_MS = 45;
const OUTPUT_MS = 260;
const RESTART_MS = 4500;

// Glass terminal that types a multi-cloud deploy, then loops
const TerminalCard = ({ className }: { className?: string }) => {
  const [line, setLine] = useState(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLine(SCRIPT.length);
      return;
    }
    let timer: number;
    if (line >= SCRIPT.length) {
      timer = window.setTimeout(() => {
        setLine(0);
        setChars(0);
      }, RESTART_MS);
    } else if (SCRIPT[line].command && chars < SCRIPT[line].text.length) {
      timer = window.setTimeout(() => setChars((c) => c + 1), TYPE_MS);
    } else {
      timer = window.setTimeout(
        () => {
          setLine((l) => l + 1);
          setChars(0);
        },
        SCRIPT[line].command ? 400 : OUTPUT_MS,
      );
    }
    return () => window.clearTimeout(timer);
  }, [line, chars]);

  return (
    <div className={cn("glass rounded-2xl overflow-hidden", className)}>
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/10">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 text-[11px] text-white/50 font-mono">kawan@cloud: ~</span>
      </div>
      <div className="px-4 py-3 font-mono text-[11.5px] leading-relaxed h-[212px]">
        {SCRIPT.slice(0, Math.min(line + 1, SCRIPT.length)).map((l, i) => {
          const isCurrent = i === line;
          const text = l.command && isCurrent ? l.text.slice(0, chars) : l.text;
          if (!l.command && isCurrent) return null;
          return (
            <div key={i} className={cn("whitespace-pre", l.className)}>
              {l.command && <span className="text-sky-300">$ </span>}
              <span className={l.command ? "text-white" : undefined}>{text}</span>
              {isCurrent && <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-white/80 animate-pulse" />}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TerminalCard;
