let periodTimeout = 0;

let periodEndTimeMs = 0;
let timer;
let timerInterval = 0;

let isInWorkingPeriod;

var startBreakSound = new Audio('https://ergonomictrends.com/20-20-20-rest-eyes-health-tool/seagullsound.mp3');
var endBreakSound = new Audio('https://ergonomictrends.com/20-20-20-rest-eyes-health-tool/clockchimesound.mp3');

function startPeriod(nextPeriodFunc, durationSeconds) {
	let durationMs = durationSeconds * 1000;
	periodTimeout = setTimeout(nextPeriodFunc, durationMs);
	periodEndTimeMs = Date.now() + durationMs;
}

function startWorkingPeriod(playSound) {
	isInWorkingPeriod = true;

	if (playSound) {
		endBreakSound.play();
	}

	startPeriod(startBreak, document.getElementById('working-time').value * 60);
}

function startBreak() {
	isInWorkingPeriod = false;
	
	startBreakSound.play();

	startPeriod(function() { startWorkingPeriod(true); }, document.getElementById('break-time').value);
}

function padNumber(num) {
	return String(num).padStart(2, '0');
}

function setTimerText() {
	let totalSeconds = (periodEndTimeMs - Date.now()) / 1000 + 1;
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = Math.floor(totalSeconds % 60);
	let timerText = padNumber(minutes) + ":" + padNumber(seconds);
	timer.innerHTML = timerText;
	timer.style.color = isInWorkingPeriod ? "black" : "red";
}

function reset(clearPeriodTimeout) {
	if (clearPeriodTimeout) {
		clearTimeout(periodTimeout);
	}

	startWorkingPeriod(false);
}

window.addEventListener("load", (event) => {
	timer = document.getElementById('timer');

	reset(false);

	setTimerText();
	setInterval(function() {
		setTimerText();
	}, 50);
});