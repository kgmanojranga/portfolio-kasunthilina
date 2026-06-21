import { useRef, useEffect } from 'react';

interface Point {
  x: number;
  y: number;
  z: number;
}

const NUM_DOTS = 280;
const CONNECTION_THRESHOLD = 0.42;

// Two alternating radii — inner and outer shell
const RADIUS_A = 1.0;
const RADIUS_B = 0.78;

function fibonacciSphere(count: number): Point[] {
  const points: Point[] = [];
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const r = i % 2 === 0 ? RADIUS_A : RADIUS_B;
    const y = 1 - (i / (count - 1)) * 2;
    const flatR = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = goldenAngle * i;
    points.push({
      x: Math.cos(theta) * flatR * r,
      y: y * r,
      z: Math.sin(theta) * flatR * r,
    });
  }
  return points;
}

const NetworkSphereBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseDots = fibonacciSphere(NUM_DOTS);

    // Rotation state
    let rotY = 0;
    let rotX = 0.3;

    // Velocity for smooth inertia
    let velY = 0.0004;
    let velX = 0.0001;

    // Mouse influence
    let mouseX = 0;
    let mouseY = 0;

    let animId: number;
    let mounted = true;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      // Normalise to [-1, 1]
      mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);
    resize();

    const rotateY = (p: Point, a: number): Point => ({
      x: p.x * Math.cos(a) + p.z * Math.sin(a),
      y: p.y,
      z: -p.x * Math.sin(a) + p.z * Math.cos(a),
    });

    const rotateX = (p: Point, a: number): Point => ({
      x: p.x,
      y: p.y * Math.cos(a) - p.z * Math.sin(a),
      z: p.y * Math.sin(a) + p.z * Math.cos(a),
    });

    const project = (p: Point, cx: number, cy: number, radius: number) => {
      const fov = 2.5;
      const scale = (fov * radius) / (fov + p.z);
      return {
        sx: cx + p.x * scale,
        sy: cy + p.y * scale,
        scale,
      };
    };

    const draw = () => {
      if (!mounted) return;

      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      ctx.fillStyle = '#f8f9fa';
      ctx.fillRect(0, 0, W, H);

      const isMobile = W <= 768;
      const cx = isMobile ? W : W * 0.88;
      const cy = H / 2;
      const radius = isMobile ? W * 0.55 : Math.min(W, H) * 0.42;

      // Mouse subtly tweaks velocity
      velY = 0.0004 + mouseX * 0.0005;
      velX = 0.0001 + mouseY * 0.0002;

      rotY += velY;
      rotX += velX;

      // Transform all points
      const transformed = baseDots.map(p => {
        const ry = rotateY(p, rotY);
        return rotateX(ry, rotX);
      });

      // Project
      const projected = transformed.map(p => project(p, cx, cy, radius));

      // Draw connections first (behind dots)
      ctx.strokeStyle = 'rgba(30,30,30,0.15)';
      ctx.lineWidth = 0.7;

      for (let i = 0; i < transformed.length; i++) {
        const pi = transformed[i];
        // Only draw connections for dots on the front hemisphere (z > -0.2)
        if (pi.z < -0.16) continue;

        for (let j = i + 1; j < transformed.length; j++) {
          const pj = transformed[j];
          if (pj.z < -0.16) continue;

          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dz = pi.z - pj.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < CONNECTION_THRESHOLD) {
            const { sx: x1, sy: y1 } = projected[i];
            const { sx: x2, sy: y2 } = projected[j];

            // Fade line by depth and distance
            const depthFade = Math.max(0, (pi.z + pj.z) / 2 + 0.5);
            const distFade = 1 - dist / CONNECTION_THRESHOLD;
            ctx.globalAlpha = depthFade * distFade * 0.55;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;

      // Draw dots
      for (let i = 0; i < transformed.length; i++) {
        const p = transformed[i];
        const { sx, sy } = projected[i];

        // Depth-based opacity and size (normalise across both shells)
        const depthFactor = (p.z + RADIUS_A) / (2 * RADIUS_A); // 0 (back) → 1 (front)
        const alpha = 0.18 + depthFactor * 0.6;
        const sizeBase = i % 2 === 0 ? 1.0 : 0.3;
        const dotRadius = sizeBase + depthFactor * (i % 2 === 0 ? 0.6 : 0.3);

        ctx.beginPath();
        ctx.arc(sx, sy, dotRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(30,30,30,${alpha.toFixed(2)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      mounted = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
};

export default NetworkSphereBackground;
