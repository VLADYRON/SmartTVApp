define(function(require, exports, module) {
	'use strict';
	var Class = require('./Class'),
		Util = require('./Util');

	return Class.extend({
		init: function(container, $el) {
			this.container = container;
			if (Util.isString($el)) {
				this.id = $el;
				$el = $('#' + $el);
				$el = $el.length ? $el : this.makeElement();
			}
			this.$el = this.$el;
			this.attach();
			this.children = [];
		},
		makeElement: function() {
			return $('<div>', {
				id: this.id
			});
		},
		attach: function() {
			if (!this.$.contains(this.container.$el[0], this.$el[0])) {
				this.container.$el[0].append(this.$el[0]);
			}
		},
		show: function() {
			this.$el.show();
		},
		hide: function() {
			this.$el.hide();
			this.deactive();
		},
		active: function() {
			this.isActive = true;
		},
		deactive: function() {
			this.isActive = false;
		},
		dispathEvent: function(event) {
			if (!this.isActive) {
				return 0;
			}
			var ret = 0;
			$.each(this.children, function(index, child) {
				ret = child.dispathEvent(event);
				return ret === 0;
			});

			return ret || this.handleEvent(event);
		},
		handleEvent: function() {
			return 0;
		}
	});
});