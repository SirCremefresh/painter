'use strict';
export const canvas = document.getElementById('mainCanvas');
export const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export let canvasOffsetX = 0;
export let canvasOffsetY = 0;

export function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawLine(line, base, width) {
	ctx.beginPath();
	ctx.moveTo(line.pointA.x + base.x + canvasOffsetX, line.pointA.y + base.y + canvasOffsetY);
	ctx.lineTo(line.pointB.x + base.x + canvasOffsetX, line.pointB.y + base.y + canvasOffsetY);
	ctx.strokeStyle = line.color;
	ctx.lineWidth = width;
	ctx.stroke();
}

export function beginPath() {
	ctx.beginPath();
}

export function moveTo(x, y) {
	ctx.moveTo(x + canvasOffsetX, y + canvasOffsetY);
}

export function lineTo(x, y) {
	ctx.lineTo(x + canvasOffsetX, y + canvasOffsetY);
}

export function fill() {
	ctx.fill();
}

export function setLineJoin(join) {
	ctx.lineJoin = join;
}

export function setLineCap(cap) {
	ctx.lineCap = cap;
}

export function setStrokeStyle(color) {
	ctx.strokeStyle = color;
}

export function setLineWidth(width) {
	ctx.lineWidth = width;
}

export function setFillStyle(color) {
	ctx.fillStyle = color;
}

export function setGlobalAlpha(alpha) {
	ctx.globalAlpha = alpha;
}

export function stroke() {
	ctx.stroke();
}


// WTF why /2 TODO find out why
export function addCanvasOffsetToPoint(point) {
	point.x = point.x - canvasOffsetX / 2;
	point.y = point.y - canvasOffsetY / 2;
}

setInterval(() => {
	canvasOffsetX += 100;
}, 10000);