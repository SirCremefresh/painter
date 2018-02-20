'use strict';
export const canvas = document.getElementById('mainCanvas');
export const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

export function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export function drawLine(line, base, width) {
	ctx.beginPath();
	ctx.moveTo(line.pointA.x + base.x, line.pointA.y + base.y);
	ctx.lineTo(line.pointB.x + base.x, line.pointB.y + base.y);
	ctx.strokeStyle = line.color;
	ctx.lineWidth = width;
	ctx.stroke();
}

