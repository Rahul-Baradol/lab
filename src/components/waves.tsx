"use client";

import { useRef, useEffect } from "react";

class Particle {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    alpha: number;
    red: number;
    green: number;
    blue: number;

    phase: number;
    amplitude: number;
    frequency: number;

    constructor(canvas: HTMLCanvasElement, CENTER_Y: number) {
        const margin = 800;
        this.x = 0;
        this.y = canvas.height - Math.random() * margin;
        this.size = Math.random() * 2 + 1;

        const targetX = canvas.width * 0.75;
        const targetY = CENTER_Y + (Math.random() - 0.5) * 100;

        const dx = targetX - this.x + (Math.random() - 0.5) * 50;
        const dy = targetY - this.y + (Math.random() - 0.5) * 50;

        const mag = Math.sqrt(dx * dx + dy * dy);
        const speed = Math.random() * 0.5 + 0.1;

        this.vx = (dx / mag) * speed;
        this.vy = (dy / mag) * speed;
        this.alpha = 1;

        this.red = Math.floor(Math.random() * 256);
        this.green = Math.floor(Math.random() * 256);
        this.blue = Math.floor(Math.random() * 256);

        // Sinusoidal properties
        this.phase = Math.random() * Math.PI * 2;
        this.amplitude = 0.875
        this.frequency = 0.02 + Math.random() * 0.02;
    }

    update() {
        this.vx += (Math.random() - 0.5) * 0.02;
        this.x += this.vx;

        this.y += this.vy + Math.sin(this.x * this.frequency + this.phase) * this.amplitude;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    isDead(canvas: HTMLCanvasElement) {
        return this.x > canvas.width || this.y > canvas.height;
    }
}

const Waves = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particles = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            const CENTER_Y = canvas.height / 2;

            function spawnParticle() {
                if (particles.current.length < 7) {
                    particles.current.push(new Particle(canvas!, CENTER_Y));
                }
            }

            function animate() {
                spawnParticle();

                for (let i = particles.current.length - 1; i >= 0; i--) {
                    const p = particles.current[i];
                    p.update();
                    p.draw(ctx!);
                    if (
                        p instanceof Particle && p.isDead(canvas!)
                    ) {
                        particles.current.splice(i, 1);
                    }
                }

                requestAnimationFrame(animate);
            }

            animate();
            function setCanvasSize() {
                particles.current = [];
                canvas!.width = canvas!.offsetWidth;
                canvas!.height = canvas!.offsetHeight;
            }

            window.addEventListener("resize", setCanvasSize);
            animate();
        }

        return () => { };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                display: "block",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 1,
                backgroundColor: "black"
            }}
        />
    );
};

export default Waves;