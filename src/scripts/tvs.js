define('tvs', function () {
	var player = require('tvs-player');
	var videos = require('tvs-videos');
	function init () {
		player.setMonitor('#monitor');
		player.play(videos.boot);
	}

	return { init: init };
})