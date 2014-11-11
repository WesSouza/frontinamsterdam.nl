require('components').create('navigation', {
	initialize: function ( ) {
		window.addEventListener( 'scroll', this.scrolled.bind( this ) );
		window.addEventListener( 'resize', this.calculatePositions.bind( this ) );
		this.calculatePositions();
	},

	calculatePositions: function ( ) {
		this.navTop = this.el.getBoundingClientRect().top + document.body.scrollTop;
		this.navHeight = this.el.offsetHeight;
	},

	scrolled: function ( ) {
		if ( document.body.scrollTop > this.navTop && !this.navFixed ) {
			this.$el.addClass( '-fixed' );
			this.navFixed = true;
		}
		else if ( document.body.scrollTop <= this.navTop && this.navFixed ) {
			this.$el.removeClass( '-fixed' );
			this.navFixed = false;
		}
	}
} );