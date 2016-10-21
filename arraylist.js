function ArrayListInit(list, num) {
	var i = 0;
	
	for (i = 0; i < num; i++) {
		list[i] = 0;
	}
}

function ArrayListInsert(list, val, index, num) {
	var i = 0;
	var temp = 0;
	var v = val;
	
	for (i = index; i < num; i++) {
		temp = list[i];
		list[i] = v;
		v = temp;
	}
}