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

export const SwarmlineCanvas: React.FC<SwarmlineCanvasProps> = ({
  active,
  burstKey,
  accentColor,
  textColor,
  mutedColor,
  mode = 'overlay',
  intensity = 'balanced',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(active);
  const colorsRef = useRef({ accentColor, textColor, mutedColor });
  const agentsRef = useRef<SwarmAgent[]>([]);
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
      burstImpulseRef.current = 45;
      // Give agents a radial velocity impulse on burst click
      agentsRef.current = agentsRef.current.map((agent, idx) => {
        const angle = (idx / Math.max(agentsRef.current.length, 1)) * Math.PI * 2;
        return {
          ...agent,
          vx: Math.cos(angle) * 5.2,
          vy: Math.sin(angle) * 5.2,
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
      intensity === 'expressive' ? 28 : intensity === 'subtle' ? 12 : 20;

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

    const drawStaticFrame = () => {
      const width = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
      const height = canvas.height / Math.min(window.devicePixelRatio || 1, 2);
      ctx.clearRect(0, 0, width, height);
      if (mode === 'contained') {
        // Draw clean architectural static curves when motion is paused
        ctx.save();
        ctx.strokeStyle = colorsRef.current.accentColor;
        ctx.globalAlpha = 0.35;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(width * 0.1, height * 0.75);
        ctx.bezierCurveTo(
          width * 0.35,
          height * 0.15,
          width * 0.65,
          height * 0.85,
          width * 0.9,
          height * 0.25
        );
        ctx.stroke();
        ctx.restore();
      }
    };

    const renderLoop = () => {
      const width = canvas.width / Math.min(window.devicePixelRatio || 1, 2);
      const height = canvas.height / Math.min(window.devicePixelRatio || 1, 2);

      if (!activeRef.current) {
        drawStaticFrame();
        rafId = window.requestAnimationFrame(renderLoop);
        return;
      }

      tick += 1;
      if (burstImpulseRef.current > 0) {
        burstImpulseRef.current -= 1;
      }

      ctx.clearRect(0, 0, width, height);

      agentsRef.current = stepSwarmAgents(
        agentsRef.current,
        { width, height },
        pointerRef.current,
        tick
      );

      // Render smooth spline-like swarm trails and inter-agent filaments
      const agents = agentsRef.current;
      const { accentColor: acc, textColor: txt, mutedColor: mut } =
        colorsRef.current;

      // Subtle connecting filaments between nearby swarm heads
      ctx.save();
      for (let i = 0; i < agents.length; i++) {
        for (let j = i + 1; j < agents.length; j++) {
          const dx = agents[i].x - agents[j].x;
          const dy = agents[i].y - agents[j].y;
          const dist = Math.hypot(dx, dy);
          const threshold = mode === 'overlay' ? 140 : 105;
          if (dist < threshold) {
            const alpha = (1 - dist / threshold) * (mode === 'overlay' ? 0.16 : 0.24);
            ctx.strokeStyle = i % 2 === 0 ? acc : txt;
            ctx.globalAlpha = alpha;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(agents[i].x, agents[i].y);
            ctx.lineTo(agents[j].x, agents[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();

      // Render each agent's flowing ribbon trail
      for (const agent of agents) {
        if (agent.trail.length < 2) continue;
        ctx.save();
        ctx.strokeStyle =
          agent.hueType === 'accent'
            ? acc
            : agent.hueType === 'ivory'
            ? txt
            : mut;
        ctx.lineWidth =
          agent.hueType === 'accent'
            ? burstImpulseRef.current > 0
              ? 2.4
              : 1.75
            : 1.15;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.globalAlpha =
          mode === 'overlay'
            ? agent.hueType === 'accent'
              ? 0.55
              : 0.28
            : agent.hueType === 'accent'
            ? 0.82
            : 0.45;

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

        // Draw crisp vector head node
        ctx.fillStyle = agent.hueType === 'accent' ? acc : txt;
        ctx.globalAlpha = mode === 'overlay' ? 0.7 : 0.9;
        ctx.beginPath();
        ctx.arc(last.x, last.y, agent.hueType === 'accent' ? 2.2 : 1.5, 0, Math.PI * 2);
        ctx.fill();
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
