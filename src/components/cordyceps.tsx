import { useRef, useEffect } from "react";

class RightParticle {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    alpha: number;
    red: number;
    green: number;
    blue: number;
    
    constructor(canvas: HTMLCanvasElement, CENTER_X: number, CENTER_Y: number) {
        const margin = 80;
        this.x = canvas.width - Math.random() * margin;
        this.y = canvas.height - Math.random() * margin;
        this.size = Math.random() * 2 + 1;

        const dx = CENTER_X - this.x + (Math.random() - 0.5) * 100;
        const dy = CENTER_Y - this.y + (Math.random() - 0.5) * 100;
        const mag = Math.sqrt(dx * dx + dy * dy);
        const speed = Math.random() * 0.8 + 0.1;

        this.vx = (dx / mag) * speed;
        this.vy = (dy / mag) * speed;
        this.alpha = 1;

        this.red = Math.floor(Math.random() * 256);
        this.green = Math.floor(Math.random() * 256);
        this.blue = Math.floor(Math.random() * 256);
    }

    update() {
        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }

    isDead(canvas: HTMLCanvasElement) {
        return this.x < 0 || this.y > canvas.height;
    }
}

class LeftParticle {
    x: number;
    y: number;
    size: number;
    vx: number;
    vy: number;
    alpha: number;
    red: number;
    green: number;
    blue: number;

    constructor(canvas: HTMLCanvasElement, CENTER_X: number, CENTER_Y: number) {
        const margin = 80;
        this.x = Math.random() * margin;
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
    }

    update() {
        this.vx += (Math.random() - 0.5) * 0.02;
        this.vy += (Math.random() - 0.5) * 0.02;

        this.x += this.vx;
        this.y += this.vy;
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

const FireParticles = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const particles = useRef<(RightParticle | LeftParticle)[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        if (canvas && ctx) {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;

            const CENTER_X = canvas.width / 2;
            const CENTER_Y = canvas.height / 2;

            function spawnParticle() {
                if (particles.current.length < 10) {
                    particles.current.push(new RightParticle(canvas!, CENTER_X, CENTER_Y));
                    particles.current.push(new LeftParticle(canvas!, CENTER_X, CENTER_Y));
                }
            }

            function animate() {
                spawnParticle();

                for (let i = particles.current.length - 1; i >= 0; i--) {
                    const p = particles.current[i];
                    p.update();
                    p.draw(ctx!);
                    if (
                        (p instanceof RightParticle && p.isDead(canvas!)) ||
                        (p instanceof LeftParticle && p.isDead(canvas!))
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
                background: "transparent",
                width: "100vw",
                height: "100vh",
                position: "fixed",
                top: 0,
                left: 0,
                pointerEvents: "none",
                zIndex: 1,
            }}
        />
    );
};

export default FireParticles;