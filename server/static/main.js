'use strict';
import {startLoop} from './render/renderLoop.js'
import {selectTool} from './tool/toolManager.js'

const ws = new WebSocket('ws:\\localhost:8080', 'fancy-painter-protocol');
window.elements = [];
window.privateElements = [];
window.uuid = null;

window.addElement = (element) => {
	console.dir(window.elements);
	window.elements.push(element);
	sendMsg({
		type: 'ADD',
		element: element
	});
};

window.editElement = (element) => {
	for (let i = 0; i < window.elements.length; i++) {
		if (window.elements[i].uuid === element.uuid) {
			window.elements[i] = element;
			sendMsg({
				type: 'CHANGE',
				element: element
			});
			return;
		}
	}
};

function sendMsg(data) {
	ws.send(JSON.stringify(data))
}

ws.onopen = function (event) {
	ws.onmessage = function (event) {
		console.log(event);
		const data = JSON.parse(event.data);
		if (data.type === 'INITIAL') {
			window.elements = data.elements;
			window.uuid = data.uuid;
			startLoop();
			selectTool('paintTool');
		} else if (data.type === 'ADD') {
			window.elements.push(data.element);
		} else if (data.type === 'CHANGE') {
			for (let i = 0; i < window.elements.length; i++) {
				if (window.elements[i].uuid === data.element.uuid) {
					window.elements[i] = data.element;
					return;
				}
			}
		}
	}
};
