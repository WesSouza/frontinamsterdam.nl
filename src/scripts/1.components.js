;(function(global){

	var library   = {}
	var instances = {}

	function define (name, factory) {
		if (library[name]) {
			throw new Error('Module '+ name +' already registered.')
		}
		library[name] = factory
	}

	function require ( name ) {
		if ( !library[ name ] ) {
			throw new Error('Module '+ name +' not registered.')
		}
		return instances[name] || (instances[name] = library[name].call(global))
	}

	global.define = define
	global.require = require

})(this);

define('components', function () {

	var _each  = Array.prototype.forEach
	var _slice = Array.prototype.slice
	var _extend = Rye.require('Util').extend;

	function init (context) {
		var elements = (context || document).querySelectorAll('[data-component]')
		_each.call(elements, loadComponent)
	}

	function create (name, def) {
		var Constructor = function (element) {
			this.el  = element
			this.$el = Rye(element)
			this.initialize.apply(this, _slice.call(arguments, 1))
		}
		Constructor.name = name
		_extend(Constructor.prototype, def)
		define('components/' + name, function () {
			return Constructor
		})
	}

	function loadComponent (element) {
		var name      = element.getAttribute('data-component')
		var Component = require('components/' + name)
		var instance  = new Component(element)
		Rye(element).data('component-' + name, instance)
	}

	function getComponent (element, name) {
		return Rye(element).data('component-' + name)
	}

	return {
		init   : init,
	    get    : getComponent,
	    create : create
	}

})
