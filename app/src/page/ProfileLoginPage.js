define(function(require, exports, module) {
	'use strict';
	var View = require('core/View'),
		KeyEvent = require('core/KeyEvent'),
		slice = Array.prototype.slice;

	return View.extend({
		init: function(container) {
			this._super(container, 'profile_login_page');
			this.$focusList = slice.call(this.$('.focusable').data({
				'focusHandler': this.onFocus.bind(this),
				'unFocusHandler': function() {}
			}).map(function() {
				return $(this);
			}));
			this.__defineGetter__('currentIndex', function() {
				return this._currentIndex;
			});
			this.__defineSetter__('currentIndex', function(val) {
				var prev = this._currentIndex;
				this._currentIndex = val;
				prev != null && this.$focusList[prev].removeClass('focused');
				val != null && this.$focusList[val].addClass('focused');
			});
		},
		makeElement: function() {
			return $('<div id="profile_login_page"><ul><li data-index="0" class="focusable"><span>Option 1</span></li><li data-index="1" class="focusable"><span>Option 2</span></li><li data-index="2" class="focusable"><span>Option 3</span></li><li data-index="3" class="focusable"><span>Option 4</span></li></ul></div>')
		},
		onFocus: function($el) {
			this.currentIndex = $el.data('index');
		},
		handleEvent: function(evt) {
			switch (evt) {
			case KeyEvent.OK_KEY:
				this.currentIndex != null && alert(this.$focusList[this.currentIndex].find('span').text())
				break;
			default:
				return 0;
			}
			return 1;
		}
	});
});