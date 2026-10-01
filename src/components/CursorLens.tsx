import { useEffect, useRef, useState } from "react";

// A glass bubble that follows the mouse and magnifies/bends whatever is behind it.
// Only for devices with a real mouse; touch devices never render it.
const SIZE = 140;
const FINE_POINTER = "(hover: hover) and (pointer: fine)";
const FILTER_ID = "cursor-lens-filter";
const SVG_NS = "http://www.w3.org/2000/svg";

// Spherical lens map: every pixel samples from closer to the center, which
// magnifies the middle and compresses the rim like a glass ball.
const buildLensMap = (size: number) => {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(size, size);
  const R = size / 2;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const px = (x + 0.5 - R) / R;
      const py = (y + 0.5 - R) / R;
      const r = Math.min(1, Math.hypot(px, py));
      const k = 0.6 + 0.4 * r ** 4;
      const i = (y * size + x) * 4;
      img.data[i] = 128 - px * k * 127;
      img.data[i + 1] = 128 - py * k * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
};

// Displaces each color channel by a slightly different amount: rainbow fringes at the rim
const buildFilter = (size: number) => {
  const scale = size * 0.32;
  const channel = (name: string, s: number, matrix: string) =>
    `<feDisplacementMap in="SourceGraphic" in2="map" scale="${s}" xChannelSelector="R" yChannelSelector="G" result="d${name}"/>` +
    `<feColorMatrix in="d${name}" type="matrix" values="${matrix}" result="${name}"/>`;

  const filter = document.createElementNS(SVG_NS, "filter");
  filter.id = FILTER_ID;
  for (const [attr, value] of [
    ["x", "0"],
    ["y", "0"],
    ["width", String(size)],
    ["height", String(size)],
    ["filterUnits", "userSpaceOnUse"],
    ["primitiveUnits", "userSpaceOnUse"],
    ["color-interpolation-filters", "sRGB"],
  ]) {
    filter.setAttribute(attr, value);
  }
  filter.innerHTML =
    `<feImage href="${buildLensMap(size)}" x="0" y="0" width="${size}" height="${size}" preserveAspectRatio="none" result="map"/>` +
    channel("r", scale, "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0") +
    channel("g", scale * 1.03, "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0") +
    channel("b", scale * 1.06, "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0") +
    '<feBlend in="r" in2="g" mode="screen" result="rg"/>' +
    '<feBlend in="rg" in2="b" mode="screen"/>';
  return filter;
};

const CursorLens = () => {
  const [enabled, setEnabled] = useState(() => window.matchMedia(FINE_POINTER).matches);
  const lensRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia(FINE_POINTER);
    const onChange = () => setEnabled(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const lens = lensRef.current;
    if (!enabled || !lens) return;

    // backdrop-filter: url(#filter) only works in Chromium; others keep a clear bubble
    let svg: SVGSVGElement | null = null;
    if (/Chrome\//.test(navigator.userAgent)) {
      svg = document.createElementNS(SVG_NS, "svg");
      svg.setAttribute("aria-hidden", "true");
      svg.setAttribute("width", "0");
      svg.setAttribute("height", "0");
      svg.style.position = "absolute";
      svg.appendChild(buildFilter(SIZE));
      document.body.appendChild(svg);
      lens.style.setProperty("--lens-filter", `url(#${FILTER_ID})`);
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = 0;
    let y = 0;
    let scale = 1;
    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;
    let visible = false;
    let frame = 0;

    const tick = () => {
      const ease = reduceMotion ? 1 : 0.2;
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      scale += (targetScale - scale) * ease;
      lens.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0) scale(${scale})`;
      const settled =
        Math.abs(targetX - x) < 0.1 && Math.abs(targetY - y) < 0.1 && Math.abs(targetScale - scale) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      targetX = e.clientX;
      targetY = e.clientY;
      // Grow a little over anything clickable
      targetScale = (e.target as Element).closest?.("a, button, [role='button']") ? 1.2 : 1;
      if (!visible) {
        x = targetX;
        y = targetY;
        visible = true;
        lens.style.opacity = "1";
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    const onLeave = () => {
      visible = false;
      lens.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      svg?.remove();
    };
  }, [enabled]);

  if (!enabled) return null;
  return <div ref={lensRef} aria-hidden className="cursor-lens" style={{ width: SIZE, height: SIZE }} />;
};

export default CursorLens;
