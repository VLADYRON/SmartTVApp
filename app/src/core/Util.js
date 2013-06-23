define(function(require, exports, module) {
	'use strict';
	var toString = Object.prototype.toString;

	return {
		isString: function(val) {
			return typeof val === 'string';
		},
		isObject: function(val) {
			return Object(val) === val;
		},
		isFunction: function(val) {
			return toString.call(val) === "[object Function]";
		},
		isArray: Array.isArray ||
		function(val) {
			return toString.call(val) === "[object Array]";
		},
		mix: function(r, s, wl) {
			// Copy "all" properties including inherited ones.
			for (var p in s) {
				if (s.hasOwnProperty(p)) {
					if (wl && indexOf(wl, p) === -1) continue;

					// 在 iPhone 1 代等设备的 Safari 中，prototype 也会被枚举出来，需排除
					if (p !== 'prototype') {
						r[p] = s[p];
					}
				}
			}
		}
	}
})