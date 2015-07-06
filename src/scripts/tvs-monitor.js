define('tvs-monitor', function () {
	'use strict';

	var buffer = [],
		needle = null,
		waitUntil = 0,
		monitorLines = 24,
		loopCounter = 0;

	function lineToHTML (line) {
		var hasColor = false;
		return line && line.toString && line.toString().replace(/\{([0-9]|1?[0-5])(,([0-9]|1?[0-5]))?\}/g, function (match, fg, nil, bg) {
			var html = hasColor ? '</span>' : '';
			hasColor = true;
			html += '<span class="tvs-fg-' + fg + (bg ? ' tvs-bg-' + bg : '') +'">'
			return html;
		}) + (hasColor ? '</span>' : '');
	}

	function play (timestamp) {
	}

	return {
		lines: [],

		turnOn: function (monitor) {
			var i, line;
			monitor.empty();
			for (i = 0; i < monitorLines; i ++) {
				line = '<div class="tvs-line tvs-line-'+ i +'"></div>';
				monitor.append(line);
				this.lines[i] = monitor.find('.tvs-line-'+ i);
			}
			requestAnimationFrame(play);
		},

		play: function (video, callback) {
			buffer = video;
			needle = 0;
			this.vertical();
		},

		vertical: function (time) {
			var current, i, offset, len;
			if (needle !== null && (!time || time >= waitUntil)) {
				current = buffer[needle];
				offset = current.line || 0;
				if (current.clear) {
					for (i = 0, len = offset; i < len; i++) {
						this.lines[i].html('');
					}
				}
				for (i = 0, len = current.frame.length; i < len; i++) {
					this.lines[i + offset].html(lineToHTML(current.frame[i]))
				}
				if (current.clear) {
					for (i = offset + current.frame.length, len = monitorLines; i < len; i++) {
						this.lines[i].html('');
					}
				}
				if (current.wait) {
					waitUntil = (time || 0) + (current.wait * 1000);
				}
				if (current.loop) {
					if (loopCounter == current.loop[1]) {
						loopCounter = 0;
						needle++;
					}
					else {
						if (current.loop[0] < 0) {
							needle += current.loop[0];
						}
						else {
							needle = current.loop[0];
						}
						loopCounter ++;
					}
				}
				else {
					needle++;
				}
			}
			if (needle == buffer.length) {
				buffer = [];
				needle = null;
			}
			else {
				requestAnimationFrame(this.vertical.bind(this));
			}
		},

		test: function () {
			var video = require('tvs-videos').boot;
			this.turnOn(Rye('body'));
			this.play(video);
		}
	};
})