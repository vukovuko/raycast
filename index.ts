class Vector2 {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    array(): [number, number] {
        return [this.x, this.y];
    }

    div(that: Vector2): Vector2 {
        return new Vector2(this.x / that.x, this.y / that.y);
    }

    mul(that: Vector2): Vector2 {
        return new Vector2(this.x * that.x, this.y * that.y);
    }

    sub(that: Vector2): Vector2 {
        return new Vector2(this.x - that.x, this.y - that.y);
    }

    add(that: Vector2): Vector2 {
        return new Vector2(this.x + that.x, this.y + that.y);
    }

    norm(): Vector2 {
        const length = this.length();
        if (length == 0) {
            return new Vector2(0, 0);
        }
        return new Vector2(this.x / length, this.y / length);
    }

    length(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    scale(value: number): Vector2 {
        return new Vector2(this.x * value, this.y * value);
    }
}

const GRID_ROWS = 10;
const GRID_COLS = 10;
const GRID_SIZE = new Vector2(GRID_COLS, GRID_ROWS);

window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement | null;
    if (canvas === null) {
        throw new Error("No canvas found");
    }
    canvas.width = 800;
    canvas.height = 800;

    const context = canvas.getContext("2d");
    if (context === null) {
        throw new Error("No context found");
    }

    let point2: Vector2 | undefined = undefined;
    canvas.addEventListener("mousemove", (event: MouseEvent) => {
        point2 = new Vector2(event.offsetX, event.offsetY)
            .div(canvasSize(context))
            .mul(new Vector2(GRID_COLS, GRID_ROWS));
        grid(context, point2);
        console.log(point2);
    });

    grid(context, point2);
});

function fillCircle(ctx: CanvasRenderingContext2D, center: Vector2, radius: number) {
    ctx.beginPath();
    ctx.arc(...center.array(), radius, 0, 2 * Math.PI);
    ctx.fill();
}

function strokeLine(ctx: CanvasRenderingContext2D, p1: Vector2, p2: Vector2) {
    ctx.beginPath();
    ctx.moveTo(...p1.array());
    ctx.lineTo(...p2.array());
    ctx.stroke();
}

function grid(context: CanvasRenderingContext2D, point2: Vector2 | undefined) {
    context.reset();
    context.fillStyle = "#181818";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);

    context.scale(context.canvas.width / GRID_COLS, context.canvas.height / GRID_ROWS);
    context.lineWidth = 0.01;

    context.strokeStyle = "#303030";
    for (let x = 0; x <= GRID_COLS; x++) {
        strokeLine(context, new Vector2(x, 0), new Vector2(x, GRID_ROWS));
    }
    for (let y = 0; y <= GRID_ROWS; y++) {
        strokeLine(context, new Vector2(0, y), new Vector2(GRID_COLS, y));
    }

    const point1 = new Vector2(GRID_COLS * 0.43, GRID_ROWS * 0.33);
    context.fillStyle = "magenta";
    fillCircle(context, point1, 0.1);
    if (point2 !== undefined) {
        fillCircle(context, point2, 0.1);
        context.strokeStyle = "magenta";
        strokeLine(context, point1, point2);
        const point3 = rayStep(point1, point2);
        fillCircle(context, point3, 0.1);
        strokeLine(context, point2, point3);
    }
}

// Find the first intersection
function rayStep(p1: Vector2, p2: Vector2): Vector2 {
    return p2.sub(p1).norm().add(p2);
}

function canvasSize(ctx: CanvasRenderingContext2D): Vector2 {
    return new Vector2(ctx.canvas.width, ctx.canvas.height);
}
