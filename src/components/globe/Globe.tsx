import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { isLand } from "./landMask";

type Provider = "aws" | "azure" | "oci";

interface Region {
  label: string;
  provider: Provider;
  lat: number;
  lon: number;
}

const PROVIDER_COLOR: Record<Provider, string> = {
  aws: "255, 170, 60",
  azure: "70, 160, 255",
  oci: "255, 90, 90",
};

// Every arc starts at the São Paulo hub, where all three clouds have a region
const HUB = { label: "São Paulo", lat: -23.55, lon: -46.63 };

const REGIONS: Region[] = [
  { label: "AWS · N. Virginia", provider: "aws", lat: 38.9, lon: -77.4 },
  { label: "AWS · Dublin", provider: "aws", lat: 53.35, lon: -6.26 },
  { label: "AWS · Mumbai", provider: "aws", lat: 19.08, lon: 72.88 },
  { label: "Azure · Amsterdam", provider: "azure", lat: 52.37, lon: 4.9 },
  { label: "Azure · Joanesburgo", provider: "azure", lat: -26.2, lon: 28.05 },
  { label: "Azure · Sydney", provider: "azure", lat: -33.87, lon: 151.2 },
  { label: "OCI · Santiago", provider: "oci", lat: -33.45, lon: -70.67 },
  { label: "OCI · Tóquio", provider: "oci", lat: 35.68, lon: 139.69 },
  { label: "OCI · Phoenix", provider: "oci", lat: 33.45, lon: -112.07 },
];

const DEG = Math.PI / 180;
// Slightly negative so the southern hemisphere (and the São Paulo hub) sits near the center
const TILT = -0.12;
const SPIN_SPEED = 0.06; // radians per second
const ARC_SAMPLES = 64;

type Vec3 = [number, number, number];

const toVec = (lat: number, lon: number): Vec3 => [
  Math.cos(lat * DEG) * Math.cos(lon * DEG),
  Math.sin(lat * DEG),
  Math.cos(lat * DEG) * Math.sin(lon * DEG),
];

// Dots on a roughly even grid, kept only where there is land
const buildDots = () => {
  const dots: Vec3[] = [];
  const step = 2.0;
  for (let lat = -84; lat <= 84; lat += step) {
    const count = Math.max(1, Math.round((360 * Math.cos(lat * DEG)) / step));
    for (let i = 0; i < count; i++) {
      const lon = -180 + (i * 360) / count;
      if (isLand(lat, lon)) dots.push(toVec(lat, lon));
    }
  }
  return dots;
};

// Great-circle arc lifted above the surface, higher for longer routes
const buildArc = (a: Vec3, b: Vec3) => {
  const dot = Math.min(1, Math.max(-1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2]));
  const angle = Math.acos(dot);
  const sin = Math.sin(angle) || 1;
  const lift = 0.08 + 0.32 * (angle / Math.PI);
  const points: Vec3[] = [];
  for (let i = 0; i <= ARC_SAMPLES; i++) {
    const t = i / ARC_SAMPLES;
    const wa = Math.sin((1 - t) * angle) / sin;
    const wb = Math.sin(t * angle) / sin;
    const h = 1 + lift * Math.sin(Math.PI * t);
    points.push([(a[0] * wa + b[0] * wb) * h, (a[1] * wa + b[1] * wb) * h, (a[2] * wa + b[2] * wb) * h]);
  }
  return points;
};

interface GlobeProps {
  className?: string;
}

const Globe = ({ className }: GlobeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dots = buildDots();
    const hub = toVec(HUB.lat, HUB.lon);
    const regions = REGIONS.map((r, i) => ({
      ...r,
      vec: toVec(r.lat, r.lon),
      arc: buildArc(hub, toVec(r.lat, r.lon)),
      phase: i / REGIONS.length,
    }));

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let size = 0;
    let dpr = 1;
    // Start with South America facing the viewer
    let spin = (HUB.lon - 90) * DEG;
    let tiltOffset = 0;
    let tiltTarget = 0;
    let dragging = false;
    let lastX = 0;
    let visible = true;
    let frame = 0;
    let last = performance.now();

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      size = canvas.clientWidth;
      canvas.width = Math.round(size * dpr);
      canvas.height = Math.round(size * dpr);
    };

    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!reduceMotion && !dragging) spin += SPIN_SPEED * dt;
      tiltOffset += (tiltTarget - tiltOffset) * 0.08;

      const W = canvas.width;
      const cx = W / 2;
      const cy = W / 2;
      const R = W * 0.38;
      const cosS = Math.cos(spin);
      const sinS = Math.sin(spin);
      const tilt = TILT + tiltOffset;
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      // Rotate around Y (spin), then X (tilt). Returns screen x, y and depth z
      const project = (v: Vec3) => {
        const x1 = v[0] * cosS + v[2] * sinS;
        const z1 = -v[0] * sinS + v[2] * cosS;
        const y2 = v[1] * cosT - z1 * sinT;
        const z2 = v[1] * sinT + z1 * cosT;
        return { x: cx + x1 * R, y: cy - y2 * R, z: z2, outside: x1 * x1 + y2 * y2 > 1 };
      };

      ctx.clearRect(0, 0, W, W);

      // Atmosphere glow and the dark glass sphere
      const glow = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 1.28);
      glow.addColorStop(0, "rgba(70, 120, 255, 0.35)");
      glow.addColorStop(1, "rgba(70, 120, 255, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, W, W);

      const body = ctx.createRadialGradient(cx - R * 0.35, cy - R * 0.4, R * 0.1, cx, cy, R);
      body.addColorStop(0, "rgba(40, 60, 140, 0.55)");
      body.addColorStop(1, "rgba(5, 8, 25, 0.85)");
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.fillStyle = body;
      ctx.fill();
      ctx.lineWidth = 1 * dpr;
      ctx.strokeStyle = "rgba(160, 190, 255, 0.25)";
      ctx.stroke();

      // Land dots, brighter toward the viewer
      const dotSize = 1.5 * dpr;
      for (const d of dots) {
        const p = project(d);
        if (p.z <= 0) continue;
        ctx.fillStyle = `rgba(170, 200, 255, ${0.15 + 0.75 * p.z})`;
        ctx.fillRect(p.x - dotSize / 2, p.y - dotSize / 2, dotSize, dotSize);
      }

      // Arcs with a light pulse travelling from the hub to each region
      const time = reduceMotion ? 0.6 : now / 1000;
      for (const r of regions) {
        const color = PROVIDER_COLOR[r.provider];
        const pts = r.arc.map(project);
        const head = ((time * 0.25 + r.phase) % 1) * ARC_SAMPLES;

        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const hidden = (p: typeof a) => p.z < 0 && !p.outside;
          if (hidden(a) || hidden(b)) continue;
          const distance = head - i;
          const pulse = distance >= 0 && distance < 14 ? 1 - distance / 14 : 0;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${color}, ${0.4 + 0.6 * pulse})`;
          ctx.lineWidth = (1.2 + 1.8 * pulse) * dpr;
          ctx.stroke();
        }
      }

      // Region markers with a pulsing ring and a small label
      const marker = (v: Vec3, color: string, label: string, ringPhase: number, isHub = false) => {
        const p = project(v);
        if (p.z <= 0.05) return;
        const alpha = Math.min(1, p.z * 1.6);
        const ring = (time * 0.6 + ringPhase) % 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (4 + ring * 12) * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${color}, ${(1 - ring) * 0.6 * alpha})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(p.x, p.y, (isHub ? 4 : 3) * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.fill();
        // Only the hub is labelled: region labels overlap when regions are close
        if (isHub) {
          ctx.font = `500 ${12 * dpr}px Inter, -apple-system, sans-serif`;
          ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * alpha})`;
          ctx.fillText(label, p.x + 9 * dpr, p.y - 7 * dpr);
        }
      };
      for (const r of regions) marker(r.vec, PROVIDER_COLOR[r.provider], r.label, r.phase);
      marker(hub, "120, 230, 255", HUB.label, 0, true);

      if (visible && (!reduceMotion || dragging || Math.abs(tiltTarget - tiltOffset) > 0.001)) {
        frame = requestAnimationFrame(draw);
      } else {
        frame = 0;
      }
    };

    const start = () => {
      if (!frame) {
        last = performance.now();
        frame = requestAnimationFrame(draw);
      }
    };

    // Tilt slightly toward the mouse; drag horizontally to spin
    const onMove = (e: PointerEvent) => {
      if (dragging) {
        spin -= ((e.clientX - lastX) / size) * 3;
        lastX = e.clientX;
      } else if (e.pointerType === "mouse") {
        tiltTarget = (e.clientY / window.innerHeight - 0.5) * 0.25;
      }
      start();
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
      start();
    };
    const onUp = () => {
      dragging = false;
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      start();
    });
    resizeObserver.observe(canvas);

    // Stop rendering while the globe is scrolled out of view
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
    });
    intersection.observe(canvas);

    window.addEventListener("pointermove", onMove, { passive: true });
    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    resize();
    start();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Globo com conexões entre regiões de AWS, Azure e Oracle Cloud"
      role="img"
      className={cn("aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing", className)}
    />
  );
};

export default Globe;
