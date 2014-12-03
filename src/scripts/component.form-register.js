require('components').create('form-register', {
	initialize: function ( ) {
		this.$el.on( 'submit', this.submit.bind( this ) );
	},

	submit: function ( event ) {
		event.preventDefault();

		/*var name = this.$el.find( '[name="name"]' ).val().split( /\s+/ ),
			email = = this.$el.find( '[name="email"]' ).val().split( /\s+/ ),
			firstName = name[0] || '',
			lastName = name[1] || '';

		var request = {
			method: 'POST',
			url: 'http://example.org/some-api',
			responseType: 'json',
			data: JSON.stringify( {
				email: email,
				firstName: firstName,
				lastName: lastName
			} ),
			callback: this.sent.bind( this )
		};

		Rye.request( request );*/
	},

	sent: function ( ) {
		// console.log( arguments );
	}
} );