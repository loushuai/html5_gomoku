var pieceEmpty = 0;
var pieceHuman = 1;
var pieceComp  = 2;

var scoreWin = 99999;

var board = new Object;

function initBoard(bd) {
	var i, j;
	board.board = new Array();
	
	for (i = 0; i < boardSize; i++) {
		board.board[i] = new Array();
		for (j = 0; j < boardSize; j++) {
			board.board[i][j] = pieceEmpty;
		}
	}
	
	bd.lastI = 0;
	bd.lastJ = 0;

    bd.ly = -1; //画十字线用的
    bd.lx = -1;
}

function isFull(bd) {
	var i, j;
	
	for (i = 0; i < boardSize; i++) {
		for (j = 0; j < boardSize; j++) {
			if (bd.board[i][j] == pieceEmpty) {
				return 0;
			}
		}
	}
	
	return 1;
}

function isEmpty(i, j, bd) {
	if (bd.board[i][j] == pieceEmpty) {
		return 1;
	}
	
	return 0;
}

//1: 落子成功，0：失败
function place(i, j, val, bd) {
	if (i < 0 || i >= boardSize || j < 0 || j >= boardSize) {
		return 0;
	}
	
	if (isEmpty(i, j, bd) == 0) return 0;
	
	bd.board[i][j] = val;
	bd.lastI = i;
	bd.lastJ = j;
	
	return 1;
}

function unPlace(i, j, bd) {
	if (i < 0 || i >= boardSize || j < 0 || j >= boardSize) {
		return;
	}
	
	bd.board[i][j] = pieceEmpty;
}

function immediateHumanWin(bd) {
	if (calcScore(bd.lastI, bd.lastJ, pieceHuman, bd) == scoreWin)
		return 1;
		
	return 0;
}

function immediateCompWin(bd) {
	if (calcScore(bd.lastI, bd.lastJ, pieceComp, bd) == scoreWin)
		return 1;
		
	return 0;
}

function calcScore(y, x, val, bd) {
	var i, j;
	var n = 0;
	var spaceFlag = 0;
    var sideSpace1 = new Array();
    var sideSpace2 = new Array();
    var midSpace1 = new Array();
    var midSpace2 = new Array();
	var score = 0;
	var count = new Array();	
	
	for (i = 0; i < 4; i++) {
		count[i] = new Array();
		count[i][0] = 0;
		count[i][1] = 0;
		count[i][2] = 0;
	}
	
	//水平方向
	for (i = 0; i < boardSize; i++) {
		if ((x - i) < 0) break;
		
		if (bd.board[y][x - i] == val) {
			if (spaceFlag == 0) 
                count[n][0]++;

			if (spaceFlag == 1) {
                count[n][1]++;
                sideSpace1[n] = 0;
                midSpace1[n] = 1;
            }
			
			spaceFlag = 0;
		}
		else if (bd.board[y][x - i] == pieceEmpty) {
			if (spaceFlag == 0) {
				spaceFlag = 1;
				//count[n][1] += 0.5;
                sideSpace1[n] = 1;
			}
			else break;
		}
		else {
			break;
		}
	}
	spaceFlag = 0;
	
	for (i = 1; i < boardSize; i++) {
		if ((x + i) >= boardSize) break;
		
		if (bd.board[y][x + i] == val) {
			if (spaceFlag == 0) 
                count[n][0]++;

			if (spaceFlag == 1) {
                count[n][2]++;
                sideSpace2[n] = 0;
                midSpace2[n] = 1;
            }
			
			spaceFlag = 0;
		}
		else if (bd.board[y][x + i] == pieceEmpty) {
			if (spaceFlag == 0) {
				spaceFlag = 1;
				//count[n][2] += 0.5;
                sideSpace2[n] = 1;
			}
			else break;
		}
		else {
			break;
		}
	}
	spaceFlag = 0;
	n++;
	
	//垂直
	for (i = 0; i < boardSize; i++) {
		if ((y - i) < 0) break;
		
		if (bd.board[y - i][x] == val) {
			if (spaceFlag == 0) 
                count[n][0]++;

			if (spaceFlag == 1) {
                count[n][1]++;
                sideSpace1[n] = 0;
                midSpace1[n] = 1;
            }
			
			spaceFlag = 0;
		}
		else if (bd.board[y - i][x] == pieceEmpty) {
			if (spaceFlag == 0) {
				spaceFlag = 1;
				//count[n][1] += 0.5;
                sideSpace1[n] = 1;
			}
			else break;
		}
		else {
			break;
		}
	}
	spaceFlag = 0;
	
	for (i = 1; i < boardSize; i++) {
		if ((y + i) >= boardSize) break;
		
		if (bd.board[y + i][x] == val) {
			if (spaceFlag == 0) 
                count[n][0]++;

			if (spaceFlag == 1) {
                count[n][2]++;
                sideSpace2[n] = 0;
                midSpace2[n] = 1;
            }
			
			spaceFlag = 0;
		}
		else if (bd.board[y + i][x] == pieceEmpty) {
			if (spaceFlag == 0) {
				spaceFlag = 1;
				//count[n][2] += 0.5;
                sideSpace2[n] = 1;
			}
			else break;
		}
		else {
			break;
		}
	}
	spaceFlag = 0;
	n++;
	
	//左对角线
	for (i = 0; i < boardSize; i++) {
		if ((x - i) < 0 || (y - i) < 0) break;
		
		if (bd.board[y - i][x - i] == val) {
			if (spaceFlag == 0) 
                count[n][0]++;

			if (spaceFlag == 1) {
                count[n][1]++;
                sideSpace1[n] = 0;
                midSpace1[n] = 1;
            }
			
			spaceFlag = 0;
		}
		else if (bd.board[y - i][x - i] == pieceEmpty) {
			if (spaceFlag == 0) {
				spaceFlag = 1;
				//count[n][1] += 0.5;
                sideSpace1[n] = 1;
			}
			else break;
		}
		else {
			break;
		}
	}
	spaceFlag = 0;
	
	for (i = 1; i < boardSize; i++) {
		if ((x + i) >= boardSize || (y + i) >= boardSize) break;
		
		if (bd.board[y + i][x + i] == val) {
			if (spaceFlag == 0) 
                count[n][0]++;

			if (spaceFlag == 1) {
                count[n][2]++;
                sideSpace2[n] = 0;
                midSpace2[n] = 1;
            }
			
			spaceFlag = 0;
		}
		else if (bd.board[y + i][x + i] == pieceEmpty) {
			if (spaceFlag == 0) {
				spaceFlag = 1;
				//count[n][2] += 0.5;
                sideSpace2[n] = 1;
			}
			else break;
		}
		else {
			break;
		}
	}
	spaceFlag = 0;
	n++;
	
	//右对角线
	for (i = 0; i < boardSize; i++) {
		if ((x - i) < 0 || (y + i) >= boardSize) break;
		
		if (bd.board[y + i][x - i] == val) {
			if (spaceFlag == 0) 
                count[n][0]++;

			if (spaceFlag == 1) {
                count[n][1]++;
                sideSpace1[n] = 0;
                midSpace1[n] = 1;
            }
			
			spaceFlag = 0;
		}
		else if (bd.board[y + i][x - i] == pieceEmpty) {
			if (spaceFlag == 0) {
				spaceFlag = 1;
				//count[n][1] += 0.5;
                sideSpace1[n] = 1;
			}
			else break;
		}
		else {
			break;
		}
	}
	spaceFlag = 0;
	
	for (i = 1; i < boardSize; i++) {
		if ((x + i) >= boardSize || (y - i) < 0) break;
		
		if (bd.board[y - i][x + i] == val) {
			if (spaceFlag == 0) 
                count[n][0]++;

			if (spaceFlag == 1) {
                count[n][2]++;
                sideSpace2[n] = 0;
                midSpace2[n] = 1;
            }
			
			spaceFlag = 0;
		}
		else if (bd.board[y - i][x + i] == pieceEmpty) {
			if (spaceFlag == 0) {
				spaceFlag = 1;
				//count[n][2] += 0.5;
                sideSpace2[n] = 1;
			}
			else break;
		}
		else {
			break;
		}
	}

	score = getScore(count, midSpace1, midSpace2, sideSpace1, sideSpace2);
	
	return score;
}

function getScore(count, midSpace1, midSpace2, sideSpace1, sideSpace2) {
	var score = 0;
	var i, j;
    var dan4 = 0;
    var dan3 = 0;
    var huo3 = 0;
    var dan3 = 0;
    var huo2 = 0;
    var dan2 = 0;
	
	for (i = 0; i < 4; i++) {
		if (count[i][0] >= 5)
			return scoreWin;
            
        //活四
        if (count[i][0] == 4) {
           if (sideSpace1[i]==1 && sideSpace2[i]==1) {
                return 50000;
           } 
        }

        if (count[i][0] == 4 && (sideSpace1[i]==1 || sideSpace2[i]==1))
            dan4++;

        if (midSpace1[i]==1) {
            if ((count[i][0] + count[i][1]) >= 4)
                dan4++;
        }
        if (midSpace2[i]==1) {
            if ((count[i][0] + count[i][2]) >= 4)
                dan4++;
        }

        if (count[i][0] == 3 && (sideSpace1[i]==1 && sideSpace2[i]==1))
            huo3++;

        if (dan4 >= 2)
            return 50000; //双四

        if (dan4 >= 1 && huo3 >= 1)
            return 40000; //四三
	}
    
    for (i = 0; i < 4; i++) {
        score += (count[i][0] + count[i][1] + count[i][2]) * 1000;
        if (midSpace1[i] == 1 || midSpace2[i] == 1)
            score += 500;
        if (sideSpace1[i] == 1 || sideSpace2[i] == 1)
            score += 800;
    }
	
	return score;
}

//move
function initMove(mv) {
	mv.bestMoveX = 0;
	mv.bestMoveY = 0;
	mv.value = 0;
	mv.alpha = 0;
	mv.beta = 0;
	mv.maxValueNum = 10;
	mv.values = new Array();
	ArrayListInit(mv.values, mv.maxValueNum);
}

function sumValues(mv) {
	var i = 0;
	
	for (i = 0; i < mv.maxValueNum; i++) {
		mv.value = mv.value + mv.values[i];
	}
}

function addValue(mv, val) {
	var i = 0;
	
	for (i = 0; i < mv.maxValueNum; i++) {
		if (val >= mv.values[i]) break;		
	}
	
	if (i < mv.maxValueNum)
		ArrayListInsert(mv.values, val, i, mv.maxValueNum);
}

function clearValues(mv) {
	mv.value = 0;
	ArrayListInit(mv.values, mv.maxValueNum);
}
