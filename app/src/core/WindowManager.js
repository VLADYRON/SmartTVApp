define(function(require, exports, module) {
	'use strict';
	var desktop = require('./Desktop'),
		panels = {
			'main_panel': new View(desktop, 'main_panel'),
			'control_panel': new View(desktop, 'control_panel')
		};

	return {
		pushPage: function(pageName, panelName, option) {
			panelName = panelName || 'main_panel';
			var panel = panels[panelName];
			if (panel) {
				panel.show();
				seajs.use('page/' + pageName, function(pageClass) {
					var page = new pageClass(panel, pageName.replace(/[A-Z]{1}/g, function(char, index) {
						return index ? ('_' + char.toLowerCase()) : char.toLowerCase();
					}));
					page.show(option);
				});
			} else {
				console.error('Panel: ' + panelName + ' dose not exist.');
			}
		},
		popTopPage: function() {
			$.each(desktop.children || [], function(index, panel) {
				if (panel.isActive && ((panel.id == 'control_panel' && panel.children.length > 1) || panel.children.length)) {
					panel.children.pop().destory();
				}
			});
		},
		showPanel: function(panelName) {
			var panel = panels[panelName];
			panel && panel.show();
		},
		hidePanel: function(panelName) {
			var panel = panels[panelName];
			panel && panel.hide();
		},
		start: function() {
			this.pushPage('ProfileLoginPage', )
		}
	}
});