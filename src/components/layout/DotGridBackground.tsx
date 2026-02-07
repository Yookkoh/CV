"use client";

/* eslint-disable react-hooks/immutability */

import { useEffect, useRef, useCallback } from "react";

interface Dot {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
}

export function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const dimRef = useRef({ w: 0, h: 0 });
  const darkRef = useRef(false);

  const SPACING = 45;
  const DOT_RADIUS = 1.2;
  const CONNECT_DIST = 120;
  const MOUSE_RADIUS = 150;
  const MOUSE_PUSH = 25;
  const DRIFT_SPEED = 0.15;
  const RETURN_SPEED = 0.03;

  const initDots = useCallback((w: number, h: number) => {
    const dots: Dot[] = [];
    const cols = Math.ceil(w / SPACING) + 2;
    const rows = Math.ceil(h / SPACING) + 2;
    const offsetX = (w - (cols - 1) * SPACING) / 2;
    const offsetY = (h - (rows - 1) * SPACING) / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offsetX + c * SPACING;
        const y = offsetY + r * SPACING;
        dots.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * DRIFT_SPEED,
          vy: (Math.random() - 0.5) * DRIFT_SPEED,
          radius: DOT_RADIUS,
        });
      }
    }
    dotsRef.current = dots;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { w, h } = dimRef.current;
    const isDark = darkRef.current;
    const mouse = mouseRef.current;
    const dots = dotsRef.current;

    ctx.clearRect(0, 0, w, h);

    // Update dot positions
    for (const dot of dots) {
      // Mouse interaction
      const dx = dot.x - mouse.x;
      const dy = dot.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_RADIUS && dist > 0) {
        const force = (1 - dist / MOUSE_RADIUS) * MOUSE_PUSH;
        const angle = Math.atan2(dy, dx);
        dot.vx += Math.cos(angle) * force * 0.02;
        dot.vy += Math.sin(angle) * force * 0.02;
      }

      // Drift
      dot.x += dot.vx;
      dot.y += dot.vy;

      // Return to base position
      dot.vx += (dot.baseX - dot.x) * RETURN_SPEED;
      dot.vy += (dot.baseY - dot.y) * RETURN_SPEED;

      // Damping
      dot.vx *= 0.92;
      dot.vy *= 0.92;
    }

    // Draw connections
    const connectDistSq = CONNECT_DIST * CONNECT_DIST;
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const distSq = dx * dx + dy * dy;

        if (distSq < connectDistSq) {
          const opacity = (1 - Math.sqrt(distSq) / CONNECT_DIST) * 0.15;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = isDark
            ? `rgba(255, 255, 255, ${opacity})`
            : `rgba(0, 0, 0, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    // Draw dots
    for (const dot of dots) {
      const dx = dot.x - mouse.x;
      const dy = dot.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const proximity = Math.max(0, 1 - dist / MOUSE_RADIUS);

      const baseOpacity = isDark ? 0.2 : 0.18;
      const glowOpacity = baseOpacity + proximity * 0.5;
      const r = dot.radius + proximity * 1.5;

      ctx.beginPath();
      ctx.arc(dot.x, dot.y, r, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(255, 255, 255, ${glowOpacity})`
        : `rgba(0, 0, 0, ${glowOpacity})`;
      ctx.fill();

      // Glow effect near mouse
      if (proximity > 0.1) {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, r + 3 * proximity, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(120, 119, 198, ${proximity * 0.15})`
          : `rgba(120, 119, 198, ${proximity * 0.1})`;
        ctx.fill();
      }
    }

    // Draw stronger connections near mouse
    for (let i = 0; i < dots.length; i++) {
      const dx1 = dots[i].x - mouse.x;
      const dy1 = dots[i].y - mouse.y;
      const dist1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
      if (dist1 > MOUSE_RADIUS) continue;

      for (let j = i + 1; j < dots.length; j++) {
        const dx2 = dots[j].x - mouse.x;
        const dy2 = dots[j].y - mouse.y;
        const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        if (dist2 > MOUSE_RADIUS) continue;

        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const distBetween = Math.sqrt(dx * dx + dy * dy);

        if (distBetween < CONNECT_DIST * 1.2) {
          const proximity = Math.min(
            1 - dist1 / MOUSE_RADIUS,
            1 - dist2 / MOUSE_RADIUS
          );
          const opacity = proximity * 0.25;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = isDark
            ? `rgba(120, 119, 198, ${opacity})`
            : `rgba(120, 119, 198, ${opacity * 0.7})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check reduced motion
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      ctx?.scale(dpr, dpr);
      dimRef.current = { w, h };
      initDots(w, h);
    };

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Detect dark mode
    const checkDark = () => {
      darkRef.current =
        document.documentElement.classList.contains("dark");
    };

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    checkDark();

    resize();

    if (!prefersReduced) {
      window.addEventListener("mousemove", handleMouse);
      window.addEventListener("mouseleave", handleMouseLeave);
      window.addEventListener("touchmove", handleTouch, { passive: true });
      window.addEventListener("touchend", handleTouchEnd);
      window.addEventListener("resize", resize);
      rafRef.current = requestAnimationFrame(draw);
    } else {
      // Draw once statically
      draw();
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, [initDots, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
