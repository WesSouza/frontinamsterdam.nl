require('components').create('form-label-dynamic', {
	initialize: function ( ) {
		this.$label = this.$el.find( '.form-label' );
		this.$field = this.$el.find( '.form-input' );

		this.$field.on( 'keydown', this.pressed.bind( this ) );
		this.$field.on( 'keyup', this.pressed.bind( this ) );

		this.pressed();
	},

	pressed: function ( event ) {
		setTimeout( function ( ) {
			if ( !this.hasContent && this.$field.val().length ) {
				this.$el.addClass( '-has-content' );
				this.hasContent = true;
			}
			else if ( this.hasContent && !this.$field.val().length ) {
				this.$el.removeClass( '-has-content' );
				this.hasContent = false;
			}
		}.bind( this ), 4 );
	}
} );