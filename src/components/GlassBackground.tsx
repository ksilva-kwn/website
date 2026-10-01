import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

// Flowing iridescent "liquid glass" ribbons rendered with WebGL2.
// Sharp on purpose: the .glass surfaces blur whatever sits behind them.
const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform float uLight;
out vec4 outColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = m * p;
    a *= 0.44;
  }
  return v;
}

// Looping 4-stop gradient: deep blue -> violet -> magenta -> cyan
vec3 iridescent(float t) {
  t = fract(t) * 4.0;
  vec3 c0 = vec3(0.10, 0.25, 0.95);
  vec3 c1 = vec3(0.50, 0.20, 0.95);
  vec3 c2 = vec3(0.95, 0.35, 0.80);
  vec3 c3 = vec3(0.10, 0.85, 1.00);
  if (t < 1.0) return mix(c0, c1, smoothstep(0.0, 1.0, t));
  if (t < 2.0) return mix(c1, c2, smoothstep(1.0, 2.0, t));
  if (t < 3.0) return mix(c2, c3, smoothstep(2.0, 3.0, t));
  return mix(c3, c0, smoothstep(3.0, 4.0, t));
}

// Shades one layer of ribbons as glossy glass tubes running along the bands.
// Returns premultiplied color in rgb and coverage in a.
vec4 ribbons(float bands, vec2 gdir, float hue, float width) {
  float s = sin(bands);
  float aa = fwidth(s) * 2.0 + 0.02;
  float mask = smoothstep(-width, -width + aa, s);

  // Position across the tube: 1 at the center line, 0 at the edges
  float a = clamp((s + width) / (1.0 + width), 0.0, 1.0);
  float side = sign(cos(bands));
  vec3 n = normalize(vec3(gdir * side * sqrt(1.0 - a * a), a));

  vec3 L = normalize(vec3(-0.45, 0.6, 0.65));
  float diff = max(dot(n, L), 0.0);
  float spec = pow(max(dot(reflect(-L, n), vec3(0.0, 0.0, 1.0)), 0.0), 36.0);
  float fres = pow(1.0 - n.z, 2.0);

  vec3 base = iridescent(hue);
  vec3 rim = iridescent(hue + 0.3);
  vec3 col = base * (0.08 + 0.8 * diff);
  col += rim * fres * 1.3;
  col += vec3(1.0) * spec * 1.1;
  return vec4(col * mask, mask);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.035;
  // Stretch and tilt the field so shapes flow as long diagonal ribbons
  mat2 rot = mat2(0.82, -0.57, 0.57, 0.82);
  vec2 p = (rot * uv) * vec2(0.55, 1.5);

  // Domain warping gives the fluid, folded shapes
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(
    fbm(p + 2.5 * q + vec2(1.7, 9.2) + 0.6 * t),
    fbm(p + 2.5 * q + vec2(8.3, 2.8) - 0.4 * t)
  );

  vec2 w = 2.2 * r;
  float e = 2.0 / uRes.y;
  float f  = fbm(p + w);
  float fx = fbm(p + w + vec2(e, 0.0));
  float fy = fbm(p + w + vec2(0.0, e));
  vec2 gdir = normalize(vec2(fx - f, fy - f) + 1e-6);

  // Two layers: a dimmer one behind, a bright one in front
  float hue = f * 1.4 + r.y * 0.7 + t * 0.5;
  vec4 back = ribbons(f * 8.0 + r.x * 4.0 + 1.7, gdir, hue + 0.5, 0.15);
  vec4 front = ribbons(f * 11.0 + r.x * 2.0, gdir, hue, 0.05);

  // Ribbons gather in flowing clusters, leaving dark negative space
  float density = smoothstep(0.3, 0.6, fbm(uv * 0.8 + vec2(t * 0.6, -t * 0.4)) + 0.15 * uv.x);
  front *= density;
  back *= smoothstep(0.2, 0.55, fbm(uv * 0.8 + vec2(3.1, 7.7) - t * 0.4) + 0.1 * uv.x);

  vec3 dark = vec3(0.012, 0.014, 0.04);
  vec3 col = dark * (1.0 - back.a) + back.rgb * 0.45;
  col = col * (1.0 - front.a) + front.rgb;

  // Soft vignette keeps the edges calm
  float vig = smoothstep(1.7, 0.5, length(uv));
  col = mix(dark, col, vig);

  if (uLight > 0.5) {
    float cover = max(front.a, back.a * 0.6) * vig;
    vec3 paper = vec3(0.93, 0.94, 1.0);
    col = mix(paper, mix(col, vec3(1.0), 0.25) * 1.15, cover);
  }

  // Subtle grain avoids banding
  col += (hash(gl_FragCoord.xy + uTime) - 0.5) * 0.015;
  outColor = vec4(col, 1.0);
}`;

const compile = (gl: WebGL2RenderingContext, type: number, src: string) => {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
};

const GlassBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const lightRef = useRef(0);
  lightRef.current = resolvedTheme === "light" ? 1 : 0;

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2", { antialias: false, alpha: false });
    if (!canvas || !gl) return; // falls back to the CSS mesh underneath

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uLight = gl.getUniformLocation(program, "uLight");

    // Render below native resolution: the shapes are smooth, so this keeps it cheap
    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now() - 20000;
    let frame = 0;

    const draw = (now: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduceMotion ? 20 : (now - start) / 1000);
      gl.uniform1f(uLight, lightRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!document.hidden) frame = requestAnimationFrame(draw);
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(draw);
    canvas.style.opacity = "1";

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-mesh" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000"
      />
    </div>
  );
};

export default GlassBackground;
