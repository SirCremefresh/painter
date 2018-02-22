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

export function beginPath() {
	ctx.beginPath();
}

export function moveTo(x, y) {
	ctx.moveTo(x * canvasScale + canvasOffsetX, y * canvasScale + canvasOffsetY);
}

export function lineTo(x, y) {
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

export function scaleTo(pPoint, deltaScale) {
	const offsetPointBefore = addCanvasOffsetToPoint({x: pPoint.x, y: pPoint.y});
	canvasScale += deltaScale;
	const offsetPointAfter = addCanvasOffsetToPoint({x: pPoint.x, y: pPoint.y});

	canvasOffsetX += offsetPointAfter.x - offsetPointBefore.x;
	canvasOffsetY += offsetPointAfter.y - offsetPointBefore.y;


}

export function addCanvasOffsetToPoint(point) {
	point.x -= canvasOffsetX;
	point.y -= canvasOffsetY;
	point.x /= canvasScale;
	point.y /= canvasScale;
	return point;
}

window.onresize = (e) => {
	setCanvasSize();
};

