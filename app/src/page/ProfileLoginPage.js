define(function(require, exports, module) {
	'use strict';
	var View = require('core/View');

	return View.extend({
		init: function(container) {
			this._super(container, 'login_profile_page');
		},
		makeElement: function() {
			return $('<div id="login_profile_page"><h1>Login Profile Page</h1></div>')
		}
	});
});