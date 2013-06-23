seajs.config({
	alias: {
		'juicer': 'app/lib/juicer-min'
	},
	path: {
		'page': 'app/src/page',
		'core': 'app/src/core'
	}
	base: './',
	charset: 'utf-8'
});

$(document).ready(function() {
	var WindowManager = require('core/WindowManager'),
		EventManager = require('core/EventManager');

	WindowManager.start();
	EventManager.start();
});