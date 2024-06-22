const GRID_ROWS = 10;
const GRID_COLS = 10;

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
}

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
    const point2 = new Vector2(GRID_COLS * 0.33, GRID_ROWS * 0.43);
    context.fillStyle = "magenta";
    fillCircle(context, point1, 0.1);
    fillCircle(context, point2, 0.1);

    context.strokeStyle = "magenta";
    strokeLine(context, point1, point2);
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
