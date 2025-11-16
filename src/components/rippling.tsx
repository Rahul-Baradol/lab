import { useRef, useEffect, useState } from "react";

class Drop {
    x: number;
    y: number;
    collisionY: number;
    water: Water;

    constructor(context: CanvasRenderingContext2D, water: Water, x: number, y: number, collisionY: number) {
        this.x = x;
        this.y = y;
        this.collisionY = collisionY;
        this.water = water;
        this.fall(context);
    }

    fall(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.fillStyle = "#000000";
        context.arc(this.x, this.y, 5, 0, Math.PI * 2);
        context.fill();

        this.y += 1;

        if (this.y < this.collisionY) {
            context.beginPath();
            context.fillStyle = "rgba(0, 0, 140, 1)";
            context.arc(this.x, this.y, 5, 0, Math.PI * 2);
            context.fill();
            requestAnimationFrame(() => this.fall(context));
        } else {
            this.water.ripple(context, this.x, this.y);
        }
    }
}

class RippleDrop {
    context: CanvasRenderingContext2D;
    x: number;
    y: number;
    centerX: number;
    centerY: number;

    t: number = 0;
    radius: number;

    goingUp: boolean;
    flip: boolean;

    constructor(context: CanvasRenderingContext2D, x: number, y: number, flip: boolean) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.radius = 15;

        this.centerY = y;
        this.goingUp = true;
        this.flip = flip;

        if (flip === true) {
            this.centerX = this.x + this.radius;
        } else {
            this.centerX = this.x - this.radius;
        }

        this.ripple();
    }

    getX(y: number, radius: number, h: number, k: number) {
        const rsquare = radius * radius;
        const term = (y - k) * (y - k);

        if (rsquare < term && this.goingUp === true) {
            this.goingUp = false;
            return this.x;
        }

        if (this.goingUp === true) {
            if (this.flip === true) {
                return h - Math.sqrt(rsquare - term);
            } else {
                return h + Math.sqrt(rsquare - term);
            }
        }

        if (this.flip === true) {
            return h + Math.sqrt(rsquare - term);
        }
        else {
            return h - Math.sqrt(rsquare - term);
        }
    }

    ripple() {
        this.context.beginPath();
        this.context.fillStyle = `black`;
        this.context.arc(this.x, this.y, 2, 0, Math.PI * 2);
        this.context.fill();

        if (this.goingUp) {
            this.y -= 0.25;
        } else {
            this.y += 0.25;
            if (this.y > this.centerY) {
                return;
            }
        }

        this.x = this.getX(this.y, this.radius, this.centerX, this.centerY);

        this.context.beginPath();
        this.context.fillStyle = `rgba(0, 0, 140, 1)`;
        this.context.arc(this.x, this.y, 2, 0, Math.PI * 2);
        this.context.fill();

        requestAnimationFrame(() => this.ripple());
    }
}

class Water {
    x: number;
    y: number;
    width: number;
    height: number;
    canvasObjects: (Drop | RippleDrop | Water)[] = [];

    constructor(context: CanvasRenderingContext2D, canvasObjects: (Drop | RippleDrop | Water)[], x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.canvasObjects = canvasObjects;
        context.fillStyle = `rgba(0, 0, 140, 1)`;
        context.beginPath();
        context.rect(0, height / 2 + 100, width, height);
        context.fill();
    }

    ripple(context: CanvasRenderingContext2D, x: number, y: number) {
        const rippleRight = new RippleDrop(context, x, y, true);
        const rippleLeft = new RippleDrop(context, x, y, false);
        this.canvasObjects.push(rippleRight, rippleLeft);
    }
}

const Rippling = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasObjects = useRef<(Drop | RippleDrop)[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        if (ctx && canvas) {
            canvas!.width = canvas!.offsetWidth;
            canvas!.height = canvas!.offsetHeight;

            const water = new Water(ctx, canvasObjects.current, 0, canvas.height / 2 + 100, canvas.width, canvas.height);
            canvas.addEventListener("click", (event) => {
                const rect = canvas.getBoundingClientRect();
                const x = event.clientX - rect.left;
                const y = event.clientY - rect.top;
                new Drop(ctx, water, x, y, canvas.height / 2 + 100);
            });
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
                zIndex: 1,
                backgroundColor: "black"
            }}
        />
    );
};

export default Rippling;