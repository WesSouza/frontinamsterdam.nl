define('konami-code', function () {
	var sequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65],
		currentIndex = 0,
		callback;

	function monitor (cb) {
		callback = cb;
		Rye('html').on('keydown', keydown);
	}

	function keydown (event) {
		var key = event.keyCode;
		if (sequence[currentIndex] == key) {
			currentIndex ++;
		}
		else {
			currentIndex = 0;
		}
		if (currentIndex == sequence.length) {
			currentIndex = 0;
			callback.call();
		}
	}

	return {
		monitor: monitor
	}
});
