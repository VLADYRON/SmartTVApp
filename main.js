seajs.config({
	alias: {
		'juicer': 'app/lib/juicer-min'
	},
	paths: {
		'page': 'app/src/page',
		'core': 'app/src/core'
	},
	base: './',
	charset: 'utf-8'
});

$(document).ready(function() {
	seajs.use(['core/WindowManager', 'core/EventManager'], function(WindowManager, EventManager) {
		WindowManager.start();
		EventManager.start();
	});
});