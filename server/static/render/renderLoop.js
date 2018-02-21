'use strict';
import {clearCanvas} from '../canvas/canvas.js';
import {basicRenderer} from './basicRenderer.js';

window.showFPS = false;
console.log('To enable Fps set showFPS to true');
let lastLoopTime = 0;
let fps = 60;

function drawLoop(currentLoopTime) {
	let curFps = Math.round((1000 - (currentLoopTime - lastLoopTime)) * (60 / 1000));
	lastLoopTime = currentLoopTime;
	fps = (fps + curFps) / 2;

	clearCanvas();
	for (const element of elements) {
		renderElement(element);
	}
	for (const privateElement of privateElements) {
		renderElement(privateElement);
	}
	requestAnimationFrame(drawLoop);
}

function renderElement(element) {
	switch (element.type) {
		case 'basic':
			basicRenderer(element);
			break;
	}
}

// Start things off
export function startLoop() {
	requestAnimationFrame(drawLoop);
}


setInterval(() => {
	if (window.showFPS) {
		console.log('FPS is: ' + fps);
	}
}, 1000);
