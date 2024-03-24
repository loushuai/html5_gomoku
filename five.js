var ctx;
var boardSizeInPix = 560;
var boardOrg = 40
var blockSize = 40;
var boardSize = 15;
var canvasX;
var canvasY;
var firstGo = pieceComp;//pieceHuman; //人黑棋
var turn;

//Wait for DOM to load and init game
$(document).ready(function(){ 
	init(); 
});

function init() {
	initSettings();
	//initGame();
	initBoard(board);
	drawBoard();
	eventHandle();	
	
	turn = pieceComp;
}

function initSettings() {			
	//Get a handle to the 2d context of the canvas
	ctx = document.getElementById('canvas').getContext('2d'); 
	
	canvasX = $("canvas").offset().left;
	canvasY = $("canvas").offset().top;
}

function initGame() {	
	initBoard(board);
	
	if (firstGo == pieceComp) {
		place(7, 7, pieceComp, board);
        board.lx = 7;
        board.ly = 7;
	}
	
	turn = pieceHuman;
	
	drawBoard();
}

function newGame() {
	var colorRadio = document.getElementsByName("color");
	if (colorRadio[0].checked == true) 
		firstGo = pieceHuman;
	else if (colorRadio[1].checked == true)
		firstGo = pieceComp;
	else {
		alert("Please Choose Your Color");
		return;
	}
	
	initGame();
}

function eventHandle() {
	var mouseX;
	var mouseY;
	var pieceOk = 0;
	
	$(canvas).mousemove(function(e){ 
		mouseX = e.pageX - canvasX;
		mouseY = e.pageY - canvasY;
	});	
  
	$(canvas).mousedown(function() {
		var i, j;
		
		if (turn != pieceHuman) {
			return;
		}
		
		j = Math.round((mouseX - boardOrg)/blockSize);
		i = Math.round((mouseY - boardOrg)/blockSize);
		
		pieceOk = place(i, j, pieceHuman, board);
		if (pieceOk == 0) return;

        board.ly = i;
        board.lx = j;
		
		drawBoard();
	});
	
	$(canvas).mouseup(function() {		
		if (turn != pieceHuman) {
			return;
		}		
		
		if (pieceOk == 0) return;
		pieceOk = 0;
		
		turn = pieceComp;
		play(board);
	});
}

function drawBoard() {
	var i, j;
	
	ctx.fillStyle = "#F1E71F";
	ctx.fillRect(boardOrg, boardOrg, boardSizeInPix, boardSizeInPix);
	
	ctx.strokeStyle = "#000000";
	ctx.beginPath();	
	for (i = 0; i < boardSize; i++) {
		ctx.moveTo(boardOrg, boardOrg + i*blockSize);
		ctx.lineTo(boardOrg + boardSizeInPix, boardOrg + i*blockSize);
		
		ctx.moveTo(boardOrg + i*blockSize, boardOrg);
		ctx.lineTo(boardOrg + i*blockSize, boardOrg + boardSizeInPix);

	}
	ctx.closePath();
	ctx.stroke();
	
	
	//画棋子
	for (i = 0; i < boardSize; i++) {
		for (j = 0; j < boardSize; j++) {
			if (board.board[i][j] == pieceHuman) {
				if (firstGo == pieceHuman) 
					drawPiece(i, j, 0);//黑
				else
					drawPiece(i, j, 1);
			}
			else if (board.board[i][j] == pieceComp) {
				if (firstGo == pieceHuman) 
					drawPiece(i, j, 1);//白
				else
					drawPiece(i, j, 0);
			}
		}
	}

	ctx.strokeStyle = "#FF0000";
	ctx.beginPath();	
    
    if (board.lx > -1 && board.ly > -1) {
        ctx.moveTo(boardOrg + board.lx*blockSize - 5, boardOrg + board.ly*blockSize);
        ctx.lineTo(boardOrg + board.lx*blockSize + 5, boardOrg + board.ly*blockSize);
        ctx.moveTo(boardOrg + board.lx*blockSize, boardOrg + board.ly*blockSize - 5);
        ctx.lineTo(boardOrg + board.lx*blockSize, boardOrg + board.ly*blockSize + 5);
    }

	ctx.closePath();
	ctx.stroke();
}

function drawPiece(i, j, val) {
	var x = boardOrg + j*blockSize;
	var y = boardOrg + i*blockSize;
	
	if (val == 0) {
		ctx.fillStyle = "#000000";
	}
	else {
		ctx.fillStyle = "#FFFFFF";
	}	
	
	ctx.beginPath();
	ctx.arc(x, y, 15, 0, Math.PI*2, true);
	ctx.closePath();
	ctx.fill();
}

function play(bd) {
	if (immediateHumanWin(bd) == 1) {
		alert("You Win!");
		return;
	}
	getCompInput(bd);
	drawBoard();
	
	turn = pieceHuman;
	
	if (immediateCompWin(bd) == 1) {
		alert("You Lose!");
		return;
	}
}
