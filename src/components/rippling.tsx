import { useEffect, useRef } from "react";

export default function RippleCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ripplesRef = useRef<any[]>([]);
    const sizeRef = useRef({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d")!;

        function resize() {
            sizeRef.current = {
                width: window.innerWidth,
                height: window.innerHeight,
            };

            const { width, height } = sizeRef.current;

            canvas.width = width;
            canvas.height = height;
        }

        resize();
        window.addEventListener("resize", resize);

        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        const ripples = ripplesRef.current;

        function addRipple(x: number, y: number) {
            ripples.push({
                x,
                y,
                radius: 0,
                alpha: 1,
            });
        }

        // Random ripple spawn
        const spawn = setInterval(() => {
            addRipple(
                Math.random() * canvas.width,
                Math.random() * canvas.height
            );
        }, 750);

        // Mouse-triggered ripples
        let rippleId = 0;

        function handleMouse(e: MouseEvent) {
            rippleId = (rippleId + 1) % 100;
            if (rippleId % 20 == 0) {
                const rect = canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                addRipple(x, y);
            }
        }

        canvas.addEventListener("mousemove", handleMouse);

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = ripples.length - 1; i >= 0; i--) {
                const r = ripples[i];
                r.radius += 1.6;
                r.alpha -= 0.009;

                if (r.alpha <= 0) {
                    ripples.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(0, 200, 255, ${r.alpha})`;
                ctx.lineWidth = 2;
                ctx.stroke();
            }

            requestAnimationFrame(animate);
        }

        animate();

        return () => {
            clearInterval(spawn);
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouse);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed w-screen h-screen top-0 left-0" />;
}
