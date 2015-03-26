require( 'components' ).create( 'navigation-mobile', {
	initialize: function ( ) {
		this.$el.on( 'click', this.menuToggle.bind( this ) )
	},

	menuToggle: function ( event ) {
		event.preventDefault();
		event.stopPropagation();
		Rye( '.nav' ).toggleClass( '-opened' );
		this.$el.toggleClass( '-opened' );
	}
} );