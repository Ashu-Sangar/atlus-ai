"use client";

import { useEffect, useRef } from "react";

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let time = 0;
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      baseX: number;
      baseY: number;
      waveOffset: number;
      color: string;

      constructor() {
        this.baseX = Math.random() * canvas!.width;
        this.baseY = Math.random() * canvas!.height;
        this.x = this.baseX;
        this.y = this.baseY;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.4 + 0.2;
        this.waveOffset = Math.random() * Math.PI * 2;

        const colors = [
          `rgba(249, 115, 22, ${this.opacity})`,   // Orange (Fire)
          `rgba(6, 182, 212, ${this.opacity})`,    // Cyan (Ice)
          `rgba(168, 85, 247, ${this.opacity})`,   // Purple (Neon)
          `rgba(236, 72, 153, ${this.opacity})`,   // Pink (Neon)
          `rgba(255, 255, 255, ${this.opacity})`,  // White (Stars)
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Smooth flowing motion with wave effect
        this.baseX += this.speedX;
        this.baseY += this.speedY;

        // Mouse interaction - particles move away from cursor
        const dx = mouseX - this.baseX;
        const dy = mouseY - this.baseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250;

        if (distance < maxDistance && distance > 0) {
          const force = (maxDistance - distance) / maxDistance;
          const angle = Math.atan2(dy, dx);
          // More visible push away from mouse
          this.baseX -= Math.cos(angle) * force * 2;
          this.baseY -= Math.sin(angle) * force * 2;
        }

        // Wave motion for organic flow
        this.x = this.baseX + Math.sin(time * 0.001 + this.waveOffset) * 20;
        this.y = this.baseY + Math.cos(time * 0.001 + this.waveOffset) * 20;

        // Wrap around edges
        if (this.baseX < 0) this.baseX = canvas!.width;
        if (this.baseX > canvas!.width) this.baseX = 0;
        if (this.baseY < 0) this.baseY = canvas!.height;
        if (this.baseY > canvas!.height) this.baseY = 0;
      }

      draw() {
        if (!ctx) return;
        // Check distance to mouse for visual feedback
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 250;

        // Particles glow brighter when near mouse
        let glowMultiplier = 1;
        if (distance < maxDistance) {
          glowMultiplier = 1 + (1 - distance / maxDistance) * 0.5;
        }

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * glowMultiplier, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      time++;
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Draw connections
      particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1).forEach((particleB) => {
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.strokeStyle = `rgba(196, 181, 253, ${(1 - distance / 120) * 0.2
              })`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
}
