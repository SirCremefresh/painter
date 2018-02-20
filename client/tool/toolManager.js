'use strict';
import {Tool} from './tool.js';
import {PaintTool} from './paintTool.js';
import {canvas} from '../canvas/canvas.js'
// import {EditTool} from './editTool.js';


export let activeTool = new Tool();

export function selectTool(toolName) {
	console.log(toolName);
	switch (toolName) {
		case 'paintTool':
			activeTool.close();
			activeTool = new PaintTool();
			break;
		// case 'editTool':
		// 	activeTool.close();
		// 	activeTool = new EditTool();
		// 	break;
	}
}

canvas.onclick = (e) => {
	activeTool.handleClick(e);
};

canvas.onmousedown = (e) => {
	activeTool.handleMouseDown(e);
};

canvas.onmouseup = (e) => {
	activeTool.handleMouseUp(e);
};

canvas.onmousemove = (e) => {
	activeTool.handleMove(e);
};

canvas.onmouseout = () => {
	activeTool.handleMouseOut();
};
