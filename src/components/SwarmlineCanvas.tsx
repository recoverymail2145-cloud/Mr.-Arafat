import React, { useEffect, useRef } from 'react';
import { createSwarmAgents, stepSwarmAgents, SwarmAgent } from '../utils/portfolioLogic';

interface SwarmlineCanvasProps {
  active: boolean;
  burstKey: number;
  accentColor: string;
  textColor: string;
  mutedColor: string;
  mode?: 'overlay' | 'contained';
  intensity?: 'subtle' | 'balanced' | 'expressive';
}

interface BokehOrb {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  alpha: number;
  phase: number;
}

export const SwarmlineCanvas: React.FC<SwarmlineCanvasProps> = ({
  active,
  burstKey,
  accentColor,
  textColor,
  mutedColor,
  mode = 'overlay',
  intensity = 'expressive',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(active);
  const colorsRef = useRef({ accentColor, textColor, mutedColor });
  const agentsRef = useRef<SwarmAgent[]>([]);
  const orbsRef = useRef<BokehOrb[]>([]);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });
  const burstImpulseRef = useRef<number>(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    colorsRef.current = { accentColor, textColor, mutedColor };
  }, [accentColor, textColor, mutedColor]);

  useEffect(() => {
    if (burstKey > 0) {
      burstImpulseRef.current = 60;
      agentsRef.current = agentsRef.current.map((agent, idx) => {
        const angle = (idx / Math.max(agentsRef.current.length, 1)) * Math.PI * 2;
        return {
          ...agent,
          vx: Math.cos(angle) * 6.4,
          vy: Math.sin(angle) * 6.4,
        };
      });
    }
  }, [burstKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const agentCount =
      intensity === 'expressive' ? 32 : intensity === 'subtle' ? 14 : 24;
    const orbCount = mode === 'overlay' ? 18 : 12;

    const initOrbs = (w: number, h: number): BokehOrb[] => {
      const palette = ['#f59e0b', '#e32b3c', '#fbbf24', '#f2efeb'];
      return Array.from({ length: orbCount }, (_, i) => ({
        x: ((i * 97) % Math.max(w, 300)) + 20,
        y: ((i * 67) % Math.max(h, 250)) + 20,
        vx: (i % 2 === 0 ? 1 : -1) * (0.2 + (i % 4) * 0.08),
        vy: (i % 3 === 0 ? 1 : -1) * (0.15 + (i % 3) * 0.07),
        radius: mode === 'overlay' ? 18 + (i % 5) * 14 : 12 + (i % 4) * 9,
        color: palette[i % palette.length],
        alpha: mode === 'overlay' ? 0.09 : 0.14,
        phase: i * 0.7,
      }));
    };

    const updateSize = () => {
      const rect =
        mode === 'overlay'
          ? { width: window.innerWidth, height: window.innerHeight }
          : canvas.parentElement?.getBoundingClientRect() || {
              width: 560,
              height: 460,
            };
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(Math.floor(rect.width * dpr), 320);
      canvas.height = Math.max(Math.floor(rect.height * dpr), 280);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (agentsRef.current.length === 0) {
        agentsRef.current = createSwarmAgents(
          agentCount,
          rect.width,
          rect.height
        );
      }
      if (orbsRef.current.length === 0) {
        orbsRef.current = initOrbs(rect.width, rect.height);
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const handlePointerMove = (e: MouseEvent) => {
      if (mode === 'overlay') {
        pointerRef.current = { x: e.clientX, y: e.clientY, active: true };
      } else {
        const rect = canvas.getBoundingClientRect();
        const inside =
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom;
        pointerRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          active: inside,
        };
      }
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    let rafId = 0;
    let tick = 0;

    const renderLoop = () => {
      const width = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
      const height = canvas.height / Math.min(window.devicePixelRatio || 1, 2);

      if (!activeRef.current) {
        ctx.clearRect(0, 0, width, height);
        rafId = window.requestAnimationFrame(renderLoop);
        return;
      }

      tick += 1;
      if (burstImpulseRef.current > 0) {
        burstImpulseRef.current -= 1;
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Render Luxury Warm Bokeh Orbs (matching the golden café bokeh in portrait)
      ctx.save();
      for (const orb of orbsRef.current) {
        orb.x += orb.vx;
        orb.y += orb.vy;
        if (orb.x < -orb.radius) orb.x = width + orb.radius;
        if (orb.x > width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = height + orb.radius;
        if (orb.y > height + orb.radius) orb.y = -orb.radius;

        const pulse = 0.75 + 0.25 * Math.sin(tick * 0.03 + orb.phase);
        const grad = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          orb.radius * (burstImpulseRef.current > 0 ? 1.4 : 1)
        );
        grad.addColorStop(0, orb.color);
        grad.addColorStop(1, 'transparent');

        ctx.fillStyle = grad;
        ctx.globalAlpha = orb.alpha * pulse;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.radius * 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // 2. Step Swarm Agents
      agentsRef.current = stepSwarmAgents(
        agentsRef.current,
        { width, height },
        pointerRef.current,
        tick
      );

      const agents = agentsRef.current;
      const { accentColor: acc, textColor: txt } = colorsRef.current;

      // 3. Render Constellation Filaments
      ctx.save();
      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          const dx = agents[i].x - agents[j].x;
          const dy = agents[i].y - agents[j].y;
          const dist = Math.hypot(dx, dy);
          const threshold = mode === 'overlay' ? 150 : 115;
          if (dist < threshold) {
            const alpha =
              (1 - dist / threshold) * (mode === 'overlay' ? 0.2 : 0.28);
            ctx.strokeStyle = i % 3 === 0 ? '#f59e0b' : i % 2 === 0 ? acc : txt;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.9;
            ctx.beginPath();
            ctx.moveTo(agents[i].x, agents[i].y);
            ctx.lineTo(agents[j].x, agents[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // 4. Render Multi-Stop Silk Ribbon Trails
      for (let idx = 0; idx < agents.length; idx++) {
        const agent = agents[idx];
        if (agent.trail.length < 2) continue;
        ctx.save();
        const isGolden = idx % 3 === 2;
        const strokeColor =
          agent.hueType === 'accent'
            ? acc
            : isGolden
            ? '#f59e0b'
            : txt;

        ctx.strokeStyle = strokeColor;
        ctx.lineWidth =
          agent.hueType === 'accent' || isGolden
            ? burstImpulseRef.current > 0
              ? 2.8
              : 2.0
            : 1.25;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha =
          mode === 'overlay'
            ? agent.hueType === 'accent' || isGolden
              ? 0.65
              : 0.35
            : 0.78;

        ctx.beginPath();
        ctx.moveTo(agent.trail[0].x, agent.trail[0].y);
        for (let i = 1; i < agent.trail.length - 1; i++) {
          const xc = (agent.trail[i].x + agent.trail[i + 1].x) / 2;
          const yc = (agent.trail[i].y + agent.trail[i + 1].y) / 2;
          ctx.quadraticCurveTo(agent.trail[i].x, agent.trail[i].y, xc, yc);
        }
        const last = agent.trail[agent.trail.length - 1];
        ctx.lineTo(last.x, last.y);
        ctx.stroke();

        // Luminous Head Node
        ctx.fillStyle = strokeColor;
        ctx.globalAlpha = 0.92;
        ctx.beginPath();
        ctx.arc(
          last.x,
          last.y,
          agent.hueType === 'accent' || isGolden ? 2.6 : 1.7,
          0,
          Math.PI * 2
        );
        ctx.fill();
        ctx.restore();
      }

      // 5. Cursor Magnetic Halo when pointer is active
      if (pointerRef.current.active) {
        ctx.save();
        const haloRadius = 26 + Math.sin(tick * 0.08) * 5;
        ctx.strokeStyle = '#f59e0b';
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(
          pointerRef.current.x,
          pointerRef.current.y,
          haloRadius,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        ctx.restore();
      }

      rafId = window.requestAnimationFrame(renderLoop);
    };

    rafId = window.requestAnimationFrame(renderLoop);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', updateSize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [intensity, mode]);

  if (mode === 'contained') {
    return (
      <canvas
        ref={canvasRef}
        data-testid="swarmline-contained-canvas"
        aria-label="Interactive Swarmline vector field"
        className="w-full h-full block pointer-events-none"
      />
    );
  }

  return (
    <canvas
      ref={canvasRef}
      data-testid="swarmline-overlay-canvas"
      data-swarmline-active={active ? 'true' : 'false'}
      aria-hidden="true"
      className={`fixed inset-0 z-30 pointer-events-none transition-opacity duration-500 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};
