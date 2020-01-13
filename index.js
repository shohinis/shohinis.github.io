var placements = [0,0,0,0,0,0,0,0,0,0,0,0];
function updateDisplay() {
	var leftDiamonds = [];
	var rightDiamonds = [];
	var omitDiamonds = [];
	for (i = 0; i <12; i++) {
		switch (placements[i]) {
			case 0:
				omitDiamonds.push(i+1);
				break;
			case 1:
				leftDiamonds.push(i+1);
				break;
			case 2:
				rightDiamonds.push(i+1);
				break;
		}
	}
	var l = document.getElementById("leftlist");
	l.innerHTML = leftDiamonds.toString();
	var r = document.getElementById("rightlist");
	r.innerHTML = rightDiamonds.toString();
	var o = document.getElementById("omitlist");
	o.innerHTML = omitDiamonds.toString();
}
function omit(diamondnum) {
	var leftButton = document.getElementById(("left"+diamondnum));
	var rightButton = document.getElementById(("right"+diamondnum));
	var omitButton = document.getElementById(("omit"+diamondnum));
	leftButton.classList.remove("onbutton");
	leftButton.classList.add("offbutton");
	rightButton.classList.remove("onbutton");
	rightButton.classList.add("offbutton");
	omitButton.classList.remove("offbutton");
	omitButton.classList.add("onbutton");
	placements[diamondnum-1] = 0;
	updateDisplay();
}
function left(diamondnum) {
	var leftButton = document.getElementById(("left"+diamondnum));
	var rightButton = document.getElementById(("right"+diamondnum));
	var omitButton = document.getElementById(("omit"+diamondnum));
	leftButton.classList.remove("offbutton");
	leftButton.classList.add("onbutton");
	rightButton.classList.remove("onbutton");
	rightButton.classList.add("offbutton");
	omitButton.classList.remove("onbutton");
	omitButton.classList.add("offbutton");
	placements[diamondnum-1] = 1;
	updateDisplay();
}
function right(diamondnum) {
	var leftButton = document.getElementById(("left"+diamondnum));
	var rightButton = document.getElementById(("right"+diamondnum));
	var omitButton = document.getElementById(("omit"+diamondnum));
	leftButton.classList.remove("onbutton");
	leftButton.classList.add("offbutton");
	rightButton.classList.remove("offbutton");
	rightButton.classList.add("onbutton");
	omitButton.classList.remove("onbutton");
	omitButton.classList.add("offbutton");
	placements[diamondnum-1] = 2;
	updateDisplay();
}
function translatefake(enc) {
	var inp=atob(enc);
	var temp = inp.split(" ");
	var fake = Number(temp[0]);
	var isLighter = Boolean(Number(temp[1]));
	console.log(fake);
	console.log(isLighter);
	return [fake, isLighter];
}
function calculate(enc) {
	var temp = translatefake(enc);
	var fake = temp[0];
	var isLighter = temp[1];
	var leftCount = 0;
	var rightCount = 0;
	for (i=0; i<12; i++) {
		switch (placements[i]) {
			case 1:
				leftCount++;
				break;
			case 2:
				rightCount++;
				break;
		}
	}
	if (leftCount>rightCount) {
		return "left"; //left is heavier
	} else if (leftCount < rightCount) {
		return "right"; //right is heavier
	} else if (placements[fake-1] == 0) {
		return "balanced"; //equally heavy
	} else if ((placements[fake-1] == 1 && isLighter == true) || (placements[fake-1] == 2 && isLighter == false)) {
		return "right"; //right is heavier
	} else {
		return "left"; //left is heavier
	}

}
var dchosen = 100;

function dchoose(diamondnum, recurse=false) {
	var b = document.getElementById(("d"+diamondnum.toString()));
	b.classList.toggle("dbselected");
	if (dchosen != 100 && recurse == false) {
		dchoose(dchosen, recurse=true);
	} 
	dchosen = diamondnum;
	console.log(dchosen);
}

var wchosen="placeholder";

function wchoose(weight) {
	var w = document.getElementById(weight);
	if (wchosen != "placeholder") {
		var p = document.getElementById(wchosen);
		p.classList.remove("majoronbutton");
		p.classList.add("majoroffbutton");
	}
	w.classList.remove("majoroffbutton");
	w.classList.add("majoronbutton");
	wchosen = weight;
	console.log(wchosen);
}

function checkSubmission(fake, isLighter, dc, wc) {
	if (isLighter == true) {
		var weight = "lighter";
	} else {
		var weight = "heavier";
	}
	if (dc == fake && wc == weight) {
		return 'fullsuccess.html';
	} else if (dc == fake) {
		return 'partialsuccess.html';
	} else {
		return 'failure.html';
	}
}