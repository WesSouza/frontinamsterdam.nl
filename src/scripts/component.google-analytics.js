require('components').create('google-analytics', {
	initialize: function () {
		this.scrollElements = [];

		window.addEventListener('scroll', this.scrolled.bind(this));
		window.addEventListener('resize', this.calculatePositions.bind(this));

		this.$el.find('[data-track]').forEach(this.track.bind(this));

		this.calculatePositions();
	},

	calculatePositions: function () {
		this.viewportHeight = document.documentElement.clientHeight;
	},

	scrolled: function () {
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
			viewportStart = scrollTop + (this.viewportHeight * 0.2),
			viewportEnd = scrollTop + (this.viewportHeight * 0.8);
		this.scrollElements.forEach(function (monitored) {
			if (!monitored.called && monitored.start <= viewportEnd && monitored.end >= viewportStart) {
				monitored.callback.call(this);
				monitored.called = true;
				delete monitored.element;
			}
		}.bind(this));
	},

	scrolledThrottled: function () {
		clearTimeout(this.scrollTimer);
		this.scrollTimer = setTimeout(this.scrolled.bind(this), 100);
	},

	track: function (element) {
		if (element.dataset.track.indexOf('click') != -1) {
			element.addEventListener('click', this.ga.bind(this, element.dataset.trackCategory, 'Click', element.dataset.trackLabel));
		}
		else if (element.dataset.track.indexOf('view') != -1) {
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop,
				start = element.getBoundingClientRect().top + scrollTop,
				end = start + element.offsetHeight;
			this.scrollElements.push({
				start: start,
				end: end,
				element: element,
				callback: this.ga.bind(this, element.dataset.trackCategory, 'View', element.dataset.trackLabel)
			});
		}
	},

	ga: function (category, action, label) {
		ga('send', 'event', category, action, label);
	}
});
