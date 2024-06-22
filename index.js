"use strict";
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    array() {
        return [this.x, this.y];
    }
    div(that) {
        return new Vector2(this.x / that.x, this.y / that.y);
    }
    mul(that) {
        return new Vector2(this.x * that.x, this.y * that.y);
    }
}
const GRID_ROWS = 10;
const GRID_COLS = 10;
const GRID_SIZE = new Vector2(GRID_COLS, GRID_ROWS);
window.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("canvas");
    if (canvas === null) {
        throw new Error("No canvas found");
    }
    canvas.width = 800;
    canvas.height = 800;
    const context = canvas.getContext("2d");
    if (context === null) {
        throw new Error("No context found");
    }
    let point2 = undefined;
    canvas.addEventListener("mousemove", (event) => {
        point2 = new Vector2(event.offsetX, event.offsetY)
            .div(canvasSize(context))
            .mul(new Vector2(GRID_COLS, GRID_ROWS));
        grid(context, point2);
        console.log(point2);
    });
    grid(context, point2);
});
function fillCircle(ctx, center, radius) {
    ctx.beginPath();
    ctx.arc(...center.array(), radius, 0, 2 * Math.PI);
    ctx.fill();
}
function strokeLine(ctx, p1, p2) {
    ctx.beginPath();
    ctx.moveTo(...p1.array());
    ctx.lineTo(...p2.array());
    ctx.stroke();
}
function grid(context, point2) {
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
    }
}
// Find the first intersection
function rayStep(p1, p2) {
    return p2;
}
function canvasSize(ctx) {
    return new Vector2(ctx.canvas.width, ctx.canvas.height);
}
