require( 'components' ).create( 'navigation', {
	initialize: function ( ) {
		window.addEventListener( 'scroll', this.scrolled.bind( this ) );
		window.addEventListener( 'resize', this.calculatePositions.bind( this ) );

		this.$el.find( 'a' ).on( 'click', this.menuClose.bind( this ) )

		setTimeout( this.calculatePositions.bind( this ), 100 );
	},

	calculatePositions: function ( ) {
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

		if ( this.navFixed ) {
			this.$el.removeClass( '-fixed' );
			this.navFixed = false;
		}

		this.navTop = this.el.getBoundingClientRect().top + scrollTop;
		this.navHeight = this.el.offsetHeight;

		this.scrolled();
	},

	scrolled: function ( ) {
		var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
		if ( scrollTop > this.navTop && !this.navFixed ) {
			this.$el.addClass( '-fixed' );
			this.navFixed = true;
		}
		else if ( scrollTop <= this.navTop && this.navFixed ) {
			this.$el.removeClass( '-fixed' );
			this.navFixed = false;
		}
	},

	menuClose: function ( event ) {
		this.$el.removeClass( '-opened' );
		Rye( '.nav-open' ).removeClass( '-opened' );
	}
} );