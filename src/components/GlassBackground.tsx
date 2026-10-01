import { useEffect, useRef } from "react";

// A single flowing, twisting ribbon of iridescent glass on black, rendered with
// WebGL2. Sharp on purpose: the .glass surfaces blur whatever sits behind them.
const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
out vec4 outColor;

const float TAU = 6.2831853;

// Thin-film interference: the rainbow sheen of soap bubbles and coated glass
vec3 film(float phase) {
  return 0.5 + 0.5 * cos(TAU * (phase + vec3(0.0, 0.33, 0.67)));
}

// Bright rim near the ribbon edge (|v| -> 1), anti-aliased by aa
float rim(float av, float aa) {
  return smoothstep(0.7, 1.0, av) * (1.0 - smoothstep(1.0, 1.0 + aa, av));
}

// One sheet of the ribbon: center line c, half-width hw. Returns added color.
vec3 sheet(vec2 uv, float c, float hw, float phase, float strength) {
  float v = (uv.y - c) / hw;
  float av = abs(v);
  float aa = fwidth(v) * 1.5;
  float inside = 1.0 - smoothstep(1.0, 1.0 + aa, av);
  if (inside <= 0.0) return vec3(0.0);

  vec3 f = film(phase + v * 0.6);
  // Slightly different edge per channel = chromatic fringes like real glass
  vec3 edge = vec3(rim(av * 1.025, aa), rim(av, aa), rim(av * 0.975, aa));

  vec3 col = vec3(0.10, 0.28, 1.0) * 0.16 * inside;          // blue glass body
  col += f * 0.35 * av * av * inside;                         // sheen toward the edges
  col += edge * mix(vec3(1.0), f, 0.45) * 1.4;                // bright rim
  // Where the ribbon twists it gets thin and catches a white highlight
  float fold = 1.0 - smoothstep(0.012, 0.05, hw);
  col += vec3(0.9, 0.95, 1.0) * fold * (1.0 - av) * 1.6 * inside;
  return col * strength;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.12;
  float x = uv.x;

  // Main ribbon: diagonal S-curve that rises to the right and twists as it flows
  float c = 0.3 * x + 0.12 * sin(2.2 * x + t * 2.0) + 0.05 * sin(4.7 * x - t * 2.6 + 1.0);
  float hw = 0.11 * (0.1 + 0.9 * abs(cos(1.8 * x - t * 1.4)));

  vec3 col = vec3(0.0);
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    float ci = c + (fi - 1.5) * 0.014 * sin(3.0 * x + t * 2.0 + fi);
    float hwi = hw * (1.0 - fi * 0.14);
    col += sheet(uv, ci, hwi, 2.0 * x + fi * 0.7 + t * 0.8, 0.55);
  }

  // A thin secondary strand, like the stray wisp in the reference
  float c2 = 0.42 * x + 0.06 + 0.1 * sin(1.7 * x - t * 1.7 + 2.0);
  float hw2 = 0.022 * (0.3 + 0.7 * abs(sin(2.3 * x + t * 1.1)));
  col += sheet(uv, c2, hw2, 1.5 * x + t + 0.4, 0.6);

  // Soft blue bloom around the ribbon
  float d = abs(uv.y - c) / max(hw, 0.02);
  col += vec3(0.08, 0.2, 0.9) * 0.12 * exp(-d * 0.6);

  // Fade the ribbon out toward the screen edges
  col *= smoothstep(1.25, 0.55, length(uv * vec2(0.8, 1.0)));

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

    // The shader is cheap, so render near native resolution to keep the thin rims crisp
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let frame = 0;

    const resize = () => {
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(window.innerWidth * scale);
      canvas.height = Math.round(window.innerHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      // With reduced motion there is no render loop, so redraw the still frame
      if (reduceMotion) frame = requestAnimationFrame(draw);
    };

    const draw = (now: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduceMotion ? 0 : (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!document.hidden && !reduceMotion) frame = requestAnimationFrame(draw);
    };
    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(draw);
    };
    document.addEventListener("visibilitychange", onVisibility);
    resize();
    window.addEventListener("resize", resize);
    frame = requestAnimationFrame(draw);
    canvas.style.opacity = "1";

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-black">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-1000"
      />
    </div>
  );
};

export default GlassBackground;
