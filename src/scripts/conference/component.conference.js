require('components').create('conference', {
	//forceTime: location.hash ? location.hash.replace('#','') : undefined,

	initialize: function () {
		Rye('.nav-item-now').on('click', this.tabToggle.bind(this, 'now'));
		Rye('.nav-item-schedule').on('click', this.tabToggle.bind(this, 'schedule'));

		this.scheduleFetch();
		setInterval(this.versionFetch.bind(this), 120000);
	},

	showTime: function () {
		Rye('.js-nav-menu, #now').removeClass('-hidden');
		this.nowUpdateInterval = setInterval(this.nowUpdate.bind(this), 60000);
		this.nowUpdate();
	},

	tabToggle: function (tab) {
		Rye('.nav-item.-active').removeClass('-active');
		Rye('.nav-item-'+ tab).addClass('-active');
		
		Rye('#now,#schedule').addClass('-hidden');
		Rye('#'+ tab).removeClass('-hidden');
	},

	schedule: [],

	schedulePrevious: null,
	scheduleNow: null,
	scheduleNext: null,

	scheduleFetch: function () {
		Rye.request({
			url: 'schedule.json',
			callback: this.scheduleInit.bind(this),
			responseType: 'json'
		})
	},

	scheduleInit: function (err, data, xhr) {
		if (err) {
			this.abort('#error');
		} else {
			var scheduleHTML = '';
			data.schedule.map(function (item) {
				item.dt = this.getDateFromString(item.time);
				scheduleHTML += this.scheduleItemTemplate(item);
				return item;
			}.bind(this));

			this.startTime = this.getDateFromString(data.start).getTime();
			this.endTime = this.getDateFromString(data.end).getTime();
			this.schedule = data.schedule;
			Rye('#schedule').html(scheduleHTML);
			this.scheduleAddEventListeners('#schedule');

			this.showTime();
		}
	},

	scheduleAddEventListeners: function (selector) {
		Rye(selector).find('.js-schedule-item').on('click', this.scheduleItemToggle);
	},

	scheduleItemToggle: function (event) {
		Rye(event.currentTarget).toggleClass('-opened');
	},

	scheduleItemTemplate: function (item, options) {
		options = options || {};
		return '<article class="list-item schedule-item '+ (item.description ? 'js-schedule-item' : '' ) +'">' +
				'<div class="schedule-header">' +
					(!options.noPhoto ? '<span class="schedule-image speaker-'+ item.speakerSprite +'"></span>' : '' )+
					'<div class="schedule-details">' +
						'<div class="schedule-time">'+ item.time + (item.location ? ' at '+ item.location.toUpperCase() : '') +'</div>' +
						'<div class="schedule-title">'+ item.title +'</div>' +
						(item.subtitle ? '<div class="schedule-subtitle">'+ item.subtitle +'</div>' : '') +
					'</div>' +
					(item.description ? '<div class="schedule-action schedule-action-open js-schedule-action-open">+</div>' : '')+
				'</div>' +
				(item.description ? '<div class="schedule-description js-schedule-description">'+ item.description.replace(/\n/g, '<br>') +'</div>' : '' ) +
			'</article>';
	},


	nowUpdate: function () {
		var nextIndex = -1,
			now = Date.now(),
			schedulePrevious,
			scheduleNow,
			scheduleNext;

		if (this.forceTime) {
			now = this.getDateFromString(this.forceTime).getTime();
		}

		if (now < this.startTime) {
			this.abort('#soon');
			return;
		}

		if (now >= this.endTime) {
			this.abort('#too-late');
			return;
		}

		this.schedule.every(function (item, i) {
			if (item.dt.getTime() > now) {
				nextIndex = i;
				return false;
			}
			return true;
		});

		if (nextIndex > 0) {
			scheduleNow = this.schedule[nextIndex - 1];
		}
		if (nextIndex > 1) {
			schedulePrevious = this.schedule[nextIndex - 2];
		}
		if (nextIndex != -1) {
			scheduleNext = this.schedule[nextIndex];
		}
		else {
			schedulePrevious = this.schedule[this.schedule.length - 2];
			scheduleNow = this.schedule[this.schedule.length - 1];
		}

		if (scheduleNow != this.scheduleNow) {
			this.schedulePrevious = schedulePrevious;
			this.scheduleNow = scheduleNow;
			this.scheduleNext = scheduleNext;
			this.nowRender();
		}
	},

	nowRender: function () {
		if (this.schedulePrevious && this.schedulePrevious.talk) {
			Rye('.js-previous').html(this.scheduleItemTemplate(this.schedulePrevious, {noPhoto: true}));
			this.scheduleAddEventListeners('.js-previous');
			Rye('.js-previous-title, .js-previous').removeClass('-hidden');
			
			Rye('.js-previous-feedback').toggleClass('-hidden', !this.schedulePrevious.feedback);
			if (this.schedulePrevious.feedback) {
				Rye('.js-now-action-feedback').attr('href', this.schedulePrevious.feedback);
			}
		}
		else {
			Rye('.js-previous-title, .js-previous, .js-previous-feedback').addClass('-hidden');
		}

		if (this.scheduleNow) {
			Rye('.js-now').html(this.scheduleItemTemplate(this.scheduleNow));
			this.scheduleAddEventListeners('.js-now');

			Rye('.js-now-action-tweet').toggleClass('-hidden', !this.scheduleNow.tweet);
			Rye('.js-now-action-questions').toggleClass('-hidden', !this.scheduleNow.questions);
			Rye('.js-now-actions').toggleClass('-hidden', !this.scheduleNow.tweet && !this.scheduleNow.questions);
			Rye('.js-now').removeClass('-hidden');
		}
		else {
			Rye('.js-now, .js-now-actions').addClass('-hidden');
		}

		if (this.scheduleNext) {
			Rye('.js-up-next').html(this.scheduleItemTemplate(this.scheduleNext));
			this.scheduleAddEventListeners('.js-up-next');
			Rye('.js-up-next-title, .js-up-next').removeClass('-hidden');
		}
		else {
			Rye('.js-up-next-title, .js-up-next').addClass('-hidden');
		}
	},


	abort: function (selector) {
		if (selector) {
			Rye('.nav-menu, .card').addClass('-hidden');
			Rye(selector).removeClass('-hidden');
		}
		else {
			location.href = 'https://twitter.com/FrontinAMS';
		}
		clearTimeout(this.nowUpdateInterval);
	},


	versionFetch: function () {
		Rye.request('version.txt?r='+ Math.random(), function (err, version) {
			if (!err) {
				if (!this.versionCurrent) {
					this.versionCurrent = version;
				}
				if (this.versionCurrent != version) {
					setTimeout(location.reload.bind(location), Math.random()*5000);
				}
			}
		}.bind(this));
	},


	getDateFromString: function (str) {
		var dt = new Date(),
			hours = +str.split(':')[0],
			minutes = +str.split(':')[1];
		// Sweet hardcoding
		dt.setUTCFullYear(2015);
		dt.setUTCMonth(7);
		dt.setUTCDate(28);
		dt.setUTCHours(hours-2);
		dt.setUTCMinutes(minutes);
		dt.setUTCSeconds(0);
		return dt;
	}
});
