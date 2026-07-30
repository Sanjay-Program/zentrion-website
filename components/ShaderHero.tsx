'use client';

import { useEffect, useRef } from 'react';

const VERTEX_SRC = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SRC = `
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);
  vec2 mouse = (u_mouse.xy - 0.5 * u_resolution.xy) / min(u_resolution.y, u_resolution.x);

  vec3 color = vec3(0.012, 0.02, 0.04);

  vec2 grid = fract(uv * 9.0 + u_time * 0.03);
  float lines = smoothstep(0.0, 0.02, grid.x) * smoothstep(1.0, 0.98, grid.x);
  lines *= smoothstep(0.0, 0.02, grid.y) * smoothstep(1.0, 0.98, grid.y);
  color += (1.0 - lines) * vec3(0.05, 0.16, 0.3) * 0.18;

  for (int i = 0; i < 34; i++) {
    float fi = float(i);
    float t = u_time * 0.15 + fi * 12.9898;
    vec2 pos = vec2(cos(t * 0.7 + fi), sin(t * 0.9 + fi * 1.3)) * 0.85;

    float distToMouse = length(pos - mouse);
    pos += normalize(mouse - pos + 0.0001) * smoothstep(0.5, 0.0, distToMouse) * 0.08;

    float dist = max(length(uv - pos), 0.0008);
    float brightness = 0.0016 / dist;
    color += vec3(0.1, 0.55, 1.0) * brightness * (0.5 + 0.5 * sin(u_time + fi));

    if (dist < 0.16) {
      color += vec3(0.0, 0.35, 0.55) * (0.16 - dist) * 0.6;
    }
  }

  float glow = smoothstep(1.1, 0.0, length(uv - mouse));
  color += vec3(0.0, 0.18, 0.35) * glow * 0.45;

  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderHero({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = (canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const vertexShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    let dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    let mouse = { x: 0, y: 0 };
    let visible = true;
    let raf = 0;

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const w = Math.max(1, Math.floor(rect.width * dpr));
      const h = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas!.width !== w || canvas!.height !== h) {
        canvas!.width = w;
        canvas!.height = h;
      }
      mouse = { x: canvas!.width / 2, y: canvas!.height / 2 };
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = 1.0 - (e.clientY - rect.top) / rect.height;
      mouse = { x: nx * canvas!.width, y: ny * canvas!.height };
    }

    function onVisibility() {
      visible = document.visibilityState === 'visible';
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    function render(t: number) {
      if (visible) {
        gl!.viewport(0, 0, canvas!.width, canvas!.height);
        gl!.uniform1f(uTime, prefersReduced ? 0 : t * 0.001);
        gl!.uniform2f(uRes, canvas!.width, canvas!.height);
        gl!.uniform2f(uMouse, mouse.x, mouse.y);
        gl!.drawArrays(gl!.TRIANGLE_STRIP, 0, 4);
      }
      if (!prefersReduced) raf = requestAnimationFrame(render);
    }
    render(0);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 h-full w-full ${className}`}
    />
  );
}
