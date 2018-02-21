'use strict';
export const canvas = document.getElementById('mainCanvas');
export const ctx = canvas.getContext('2d');

setCanvasSize();

export let canvasOffsetX = 0;
export let canvasOffsetY = 0;
export let canvasScale = 1;

function setCanvasSize() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}

export function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// export function drawLine(line, base, width) {
// 	ctx.beginPath();
// 	ctx.moveTo(line.pointA.x + base.x + canvasOffsetX, line.pointA.y + base.y + canvasOffsetY);
// 	ctx.lineTo(line.pointB.x + base.x + canvasOffsetX, line.pointB.y + base.y + canvasOffsetY);
// 	ctx.strokeStyle = line.color;
// 	ctx.lineWidth = width;
// 	ctx.stroke();
// }

export function beginPath() {
	ctx.beginPath();
}

export function moveTo(x, y) {
	// ctx.moveTo((x + canvasOffsetX) * canvasScale, (y + canvasOffsetY) * canvasScale);
	ctx.moveTo(x * canvasScale + canvasOffsetX, y * canvasScale + canvasOffsetY);
}

export function lineTo(x, y) {
	// ctx.lineTo((x + canvasOffsetX) * canvasScale, (y + canvasOffsetY) * canvasScale);
	ctx.lineTo(x * canvasScale + canvasOffsetX, y * canvasScale + canvasOffsetY);
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
	ctx.lineWidth = width * canvasScale;
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

export function moveCanvasWithDelta(delta) {
	canvasOffsetX += delta.x;
	canvasOffsetY += delta.y;
}

export function canvasScaleDelta(delta) {
	canvasScale += delta;
}

// WTF why /2 TODO find out why
export function addCanvasOffsetToPoint(point) {
	point.x -= canvasOffsetX;
	point.y -= canvasOffsetY;
	point.x /= canvasScale;
	point.y /= canvasScale;
}

window.onresize = function (event) {
	setCanvasSize();
};

canvasScale = 0.5;
canvasOffsetX = 200;
// setInterval(() => {canvasScale += 0.005}, 10);


//260
//1270
//1530
//1.2

