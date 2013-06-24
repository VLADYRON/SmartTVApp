define(function(require, exports, module) {
	'use strict';
	var View = require('core/View');

	return View.extend({
		init: function(container) {
			this._super(container, 'profile_login_page');
		},
		makeElement: function() {
			return $('<div id="profile_login_page"><ul><li class="focusable"><span>Option 1</span></li><li class="focusable"><span>Option 2</span></li><li class="focusable"><span>Option 3</span></li><li class="focusable"><span>Option 4</span></li></ul></div>')
		}
	});
});