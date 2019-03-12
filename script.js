var doc = document;

var size = doc.getElementById('sizeSelect');
var newColor = doc.getElementById('color');
var canvas = doc.getElementById('canv');
var ctx = canvas.getContext('2d');
var xCoord = doc.getElementById('xCoord');
var yCoord = doc.getElementById('yCoord');
var tools = ['brush', 'rectangle'];
var activeTool = '';


var system = {
	width: canvas.getAttribute('width'),
	height: canvas.getAttribute('height'),
	currentColor: newColor.value,
	currentTool: '',
	brushSize : size.value
};

//рендер Системы
var renderSystem = function (obj, elem, action) {
	obj[elem] = action;
};

//Получение коодинат
var getCoordinates = function (evt) {
	let mas = {};
	let x = evt.offsetX;
	let y = evt.offsetY;

	mas = {x : x, y : y};
	xCoord.innerText = x;
	yCoord.innerText = y;

	return mas;
};

//Изменение размера кисти
var switchSize = function (list) {
	return list.value;
};

//Изменение размера кисти
var switchColor = function (colorInput) {
	return colorInput.value;
};

//Изменение инструмента
var switchTool = function (button) {
	if (button.id == 'brush') {
		return 'brush'
	} else if (button.id == 'eraser') {
		return 'eraser'
	} else if (button.id == 'fill') {
		return 'fill'
	}
};

//Мышинные события (клики)
var mouseActionsClick = function (evt) {
	if (evt.target.classList.contains('toolButton') == true) {
		renderSystem (system, 'currentTool', switchTool (evt.target));
	} else if (evt.target.id == 'sizeSelect') {
		renderSystem (system, 'brushSize', switchSize (evt.target));
	} else if (evt.target.id == 'color') {
		renderSystem (system, 'currentColor', switchColor (evt.target));
	}

};


//НЕПОСРЕДСТВЕННО РИСОВАНИЕ



var drawLines = function (evt) {
	canvas.onmousemove = function (evt) {
		ctx.beginPath ();
		ctx.fillStyle = system.currentColor;
		ctx.fillRect (xCoord.innerText, yCoord.innerText, system.brushSize, system.brushSize);
	}
};

var drawrEraser = function (evt) {
	canvas.onmousemove = function (evt) {
		ctx.beginPath ();
		ctx.fillStyle = '#FFFFFF';
		ctx.fillRect (xCoord.innerText, yCoord.innerText, system.brushSize, system.brushSize);
	}
};

var drawrFill = function (evt) {
	canvas.onmousemove = function (evt) {
		ctx.beginPath ();
		ctx.fillStyle = system.currentColor;
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}
};

var startDraw = function (evt) {
	if (system.currentTool == 'brush') {
		drawLines (evt);
	} else if (system.currentTool == 'eraser') {
		drawrEraser (evt);
	} else if (system.currentTool == 'fill') {
		drawrFill (evt);
	}
};

var endDraw = function (evt) {
	canvas.onmousemove = null;
};

canvas.addEventListener ('mousemove', getCoordinates); //активация получения координат
doc.addEventListener ('click', mouseActionsClick); //активация кликов
canvas.addEventListener ('mousedown', startDraw);
canvas.addEventListener ('mouseup', endDraw);

/*var date = new Date();
console.log(date);*/

function clock() {
	var d = new Date();
	var month_num = d.getMonth()
	var day = d.getDate();
	var hours = d.getHours();
	var minutes = d.getMinutes();
	var seconds = d.getSeconds();

	month = new Array("января", "февраля", "марта", "апреля", "мая", "июня",
	"июля", "августа", "сентября", "октября", "ноября", "декабря");

	if (day <= 9) day = "0" + day;
	if (hours <= 9) hours = "0" + hours;
	if (minutes <= 9) minutes = "0" + minutes;
	if (seconds <= 9) seconds = "0" + seconds;

	date_time = "Сегодня - " + day + " " + month[month_num] + " " + d.getFullYear() +
	" г.&nbsp;&nbsp;&nbsp;Текущее время - "+ hours + ":" + minutes + ":" + seconds;
	if (document.layers) {
	 document.layers.doc_time.document.write(date_time);
	 document.layers.doc_time.document.close();
	}
	else document.getElementById("doc_time").innerHTML = date_time;
	 setTimeout("clock()", 1000);
}

clock();