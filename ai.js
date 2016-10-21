var maxStep = 0;

function getHumanInput(bd) {

}

function getCompInput(bd) {
	var moveA = new Object;
	var moveD = new Object;
	var ajust = 0;
	
	initMove(moveA);
	initMove(moveD);
	
	maxStep = 0;
	findCompMove(bd, moveA, 0, scoreWin);
	
	maxStep = 1;
	findCompMove(bd, moveD, 0, scoreWin);
	
	if (moveA.value > (ajust - moveD.value)) {
		place(moveA.bestMoveY, moveA.bestMoveX, pieceComp, bd);
        bd.ly = moveA.bestMoveY;
        bd.lx = moveA.bestMoveX;
    }
	else {
		place(moveD.bestMoveY, moveD.bestMoveX, pieceComp, bd);
        bd.ly = moveD.bestMoveY;
        bd.lx = moveD.bestMoveX;
    }
		
	//alert("A:"+moveA.value+"D:"+moveD.value);
}

function findCompMove(bd, move, step, ab) {
	var i, j;
	var score = 0;
	var response = new Object;
	initMove(response);
	
	if (immediateHumanWin(bd) == 1) {
		move.value = 0 - scoreWin;
		return;
	}
	
	move.value = -scoreWin * 8;
	for (i = 0; i < boardSize; i++) {
		for (j = 0; j < boardSize; j++) {			
			clearValues(response);
			
			if (isEmpty(i, j, bd) == 1) {
				if (step < maxStep) {
					if (move.value >= scoreWin) break;
					if (move.value > ab) break;
					
					place(i, j, pieceComp, bd);
					findHumanMove(bd, response, step+1, move.value);
					unPlace(i, j, bd);
					
					if (response.value > move.value) {
						move.value = response.value;
						move.bestMoveX = j;
						move.bestMoveY = i;
					}
				}
				else {
					score = compScore(i, j, bd);
					//addValue(move, score);
					if (score > move.value) {
						move.value = score;
						move.bestMoveX = j;
						move.bestMoveY = i;
					}
				}
			}
		}
	}
	
	/*
	if (step >= maxStep) {
		move.value = 0;
		sumValues(move);
	}*/
}

function findHumanMove(bd, move, step, ab) {
	var i, j;
	var score = 0;
	var response = new Object;
	initMove(response);
	
	if (immediateCompWin(bd) == 1) {
		move.value = scoreWin;
		return;
	}
	
	move.value = scoreWin * 8;	
	for (i = 0; i < boardSize; i++) {
		for (j = 0; j < boardSize; j++) {			
			clearValues(response);
			
			if (isEmpty(i, j, bd) == 1) {
				if (step < maxStep) {
					if (move.value <= -scoreWin) break;
					if (move.value < ab) break;
					
					place(i, j, pieceHuman, bd);
					findCompMove(bd, response, step+1, move.value);
					unPlace(i, j, bd);
					
					if (response.value < move.value) {
						move.value = response.value;
						move.bestMoveX = j;
						move.bestMoveY = i;
					}
				}
				else {
					score = humanScore(i, j, bd);
					addValue(move, score);
				}
			}
		}
	}
	
	if (step >= maxStep) {
		move.value = 0;
		sumValues(move);
		move.value = -move.value;
	}
}

function humanScore(i, j, bd) {
	var score = 0;
	place(i, j, pieceHuman, bd);
	score = calcScore(i, j, pieceHuman, bd);
	unPlace(i, j, bd);
	
	return score;
}

function compScore(i, j, bd) {
	var score = 0;
	place(i, j, pieceComp, bd);
	score = calcScore(i, j, pieceComp, bd);
	unPlace(i, j, bd);
	
	return score;
}
