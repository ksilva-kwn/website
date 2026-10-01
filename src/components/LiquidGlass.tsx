import { useEffect } from "react";

// Gives every .glass / .glass-control element an Apple-style "Liquid Glass" lens:
// an SVG displacement filter that bends the backdrop near the rounded edges.
// backdrop-filter: url(#filter) only works in Chromium, so other browsers keep
// the plain CSS glass (they never get --lg-filter set).
const SELECTOR = ".glass, .glass-control";
const SVG_NS = "http://www.w3.org/2000/svg";
const MAX_MAP_SIZE = 360;

// Displacement map for a rounded rect: pixels inside the bezel are pushed toward
// the center, strongest at the edge, like light refracting through a convex rim.
const buildMap = (w: number, h: number, r: number, bezel: number) => {
  const s = Math.min(1, MAX_MAP_SIZE / Math.max(w, h));
  const cw = Math.max(2, Math.round(w * s));
  const ch = Math.max(2, Math.round(h * s));
  const canvas = document.createElement("canvas");
  canvas.width = cw;
  canvas.height = ch;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(cw, ch);
  const hw = w / 2;
  const hh = h / 2;

  for (let y = 0; y < ch; y++) {
    for (let x = 0; x < cw; x++) {
      const px = (x + 0.5) / s - hw;
      const py = (y + 0.5) / s - hh;
      const qx = Math.abs(px) - (hw - r);
      const qy = Math.abs(py) - (hh - r);
      const ox = Math.max(qx, 0);
      const oy = Math.max(qy, 0);
      const inside = -(Math.hypot(ox, oy) + Math.min(Math.max(qx, qy), 0) - r);

      let nx = 0;
      let ny = 0;
      if (qx > 0 && qy > 0) {
        const l = Math.hypot(ox, oy) || 1;
        nx = ox / l;
        ny = oy / l;
      } else if (qx > qy) {
        nx = 1;
      } else {
        ny = 1;
      }
      nx *= Math.sign(px);
      ny *= Math.sign(py);

      const t = Math.max(0, 1 - inside / bezel);
      const m = t * t * (3 - 2 * t);
      const i = (y * cw + x) * 4;
      img.data[i] = 128 - nx * m * 127;
      img.data[i + 1] = 128 - ny * m * 127;
      img.data[i + 2] = 128;
      img.data[i + 3] = 255;
    }
  }

  ctx.putImageData(img, 0, 0);
  return canvas.toDataURL();
};

const LiquidGlass = () => {
  useEffect(() => {
    if (!/Chrome\//.test(navigator.userAgent)) return;

    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("width", "0");
    svg.setAttribute("height", "0");
    svg.style.position = "absolute";
    const defs = document.createElementNS(SVG_NS, "defs");
    svg.appendChild(defs);
    document.body.appendChild(svg);

    const filters = new Map<HTMLElement, SVGFilterElement>();
    let counter = 0;

    const apply = (el: HTMLElement) => {
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (!w || !h) return;
      const r = Math.min(parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0, w / 2, h / 2);
      const bezel = Math.max(6, Math.min(r * 0.9, Math.min(w, h) / 2, 36));
      const key = `${w}x${h}x${Math.round(r)}`;

      let filter = filters.get(el);
      if (!filter) {
        filter = document.createElementNS(SVG_NS, "filter");
        filter.id = `liquid-glass-${counter++}`;
        filter.setAttribute("color-interpolation-filters", "sRGB");
        filter.setAttribute("filterUnits", "userSpaceOnUse");
        filter.setAttribute("primitiveUnits", "userSpaceOnUse");
        filter.innerHTML =
          '<feImage x="0" y="0" preserveAspectRatio="none" result="map"/>' +
          '<feDisplacementMap in="SourceGraphic" in2="map" xChannelSelector="R" yChannelSelector="G"/>';
        defs.appendChild(filter);
        filters.set(el, filter);
        el.style.setProperty("--lg-filter", `url(#${filter.id})`);
      }
      if (filter.dataset.key === key) return;
      filter.dataset.key = key;

      for (const [attr, value] of [["x", 0], ["y", 0], ["width", w], ["height", h]] as const) {
        filter.setAttribute(attr, String(value));
      }
      const image = filter.querySelector("feImage")!;
      image.setAttribute("width", String(w));
      image.setAttribute("height", String(h));
      image.setAttribute("href", buildMap(w, h, r, bezel));
      filter.querySelector("feDisplacementMap")!.setAttribute("scale", String(Math.round(bezel * 2.6)));
    };

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) apply(entry.target as HTMLElement);
    });

    const scan = () => {
      for (const [el, filter] of filters) {
        if (!el.isConnected || !el.matches(SELECTOR)) {
          resizeObserver.unobserve(el);
          el.style.removeProperty("--lg-filter");
          filter.remove();
          filters.delete(el);
        }
      }
      document.querySelectorAll<HTMLElement>(SELECTOR).forEach((el) => {
        if (!filters.has(el)) resizeObserver.observe(el);
        apply(el);
      });
    };

    scan();
    const mutationObserver = new MutationObserver(scan);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      filters.forEach((_, el) => el.style.removeProperty("--lg-filter"));
      svg.remove();
    };
  }, []);

  return null;
};

export default LiquidGlass;
