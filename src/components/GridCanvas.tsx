"use client";
import { useEffect, useRef } from "react";

export default function GridCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gfx = canvas.getContext("2d");
    if (!gfx) return;

    const GRID = 40;

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      gfx.clearRect(0, 0, w, h);
      gfx.strokeStyle = "rgba(255,255,255,0.04)";
      gfx.lineWidth = 1;
      for (let x = 0; x <= w + GRID; x += GRID) {
        gfx.beginPath();
        gfx.moveTo(x, 0);
        gfx.lineTo(x, h);
        gfx.stroke();
      }
      for (let y = 0; y <= h + GRID; y += GRID) {
        gfx.beginPath();
        gfx.moveTo(0, y);
        gfx.lineTo(w, y);
        gfx.stroke();
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}
