var groups = document.querySelectorAll('.digit')

function setNumber(group, number) {
	var clocks = group.children;
	var numbers = [
		'266352355555555551451664',
		'263013500550055024131664',
		'266316352645526451631664',
		'266316352645163526451664',
		'232355555145163500550014',
		'266352645163163526451664',
		'266352645163523551451664',
		'266316350055005500550014',
		'266352355145523551451664',
		'266352355145163500550014'
	]
	for(var i = 0; i < 24; i++) {
		clocks[i].classList.value = 'clock pos' + numbers[number][i]
	}
}

function setSeparator(group) {
	var pos = '002314231400';
	for(var i = 0; i<12; i++) {
		group.children[i].classList.value = 'clock pos' + pos[i];
	}
}

function pad(number, digits) {
  number = parseInt(number, 10)  
	return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number;
}

function writeTime() {
	var now = new Date();
	var hour = now.getHours().toString();
	var minute = now.getMinutes().toString();
	var number = pad(hour,2) + pad(minute, 2);
	setNumber(groups[0], number[0]);
	setNumber(groups[1], number[1]);
	setNumber(groups[3], number[2]);
	setNumber(groups[4], number[3]);
}

function runEveryMinute(f) {
	var now = new Date();
	var timeUntilNextMinute = 60000 - (now.getSeconds() * 1000 + now.getMilliseconds());

	setTimeout(function(){
		f();
		setInterval(f, 60000);
	}, timeUntilNextMinute);
}

setTimeout(function() {
	setSeparator(groups[2]);
	runEveryMinute(writeTime);
	writeTime();
}, 200);