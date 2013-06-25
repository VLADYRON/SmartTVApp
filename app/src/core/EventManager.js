define(function(require, exports, module) {
	'use strict';
	var WindowManager = require('./WindowManager'),
		KeyEvent = require('./KeyEvent'),
		STATE_INIT = 0,
		STATE_STARTED = 1,
		state = STATE_INIT;

	/**
	 * 遥控器按键映射
	 */
	var REMOTE_EVENT_MAP = {
		'256': KeyEvent.POWER_KEY,
		'261': KeyEvent.MUTE_KEY,
		// 此为主菜单
		'272': KeyEvent.MENU_KEY,
		'1109': KeyEvent.VOD_KEY,
		//一键进直播
		//'1108': KeyEvent.TV_KEY,
		// TV GUIDE
		'1108': KeyEvent.GUIDE_KEY,
		// TODO: Hack Here
		//'110': KeyEvent.INFO_KEY,
		'268': KeyEvent.INFO_KEY,
		'38': KeyEvent.UP_KEY,
		'37': KeyEvent.LEFT_KEY,
		'39': KeyEvent.RIGHT_KEY,
		'40': KeyEvent.DOWN_KEY,
		'13': KeyEvent.OK_KEY,
		'285': KeyEvent.SET_KEY,
		'1111': KeyEvent.PVR_KEY,
		'33879': KeyEvent.LONG_PVR_KEY,
		//'8': KeyEvent.BACK_KEY,
		'24': KeyEvent.BACK_KEY,

		'34': KeyEvent.PAGEDOWN_KEY,
		'33': KeyEvent.PAGEUP_KEY,
		'265': KeyEvent.FBWD_KEY,
		'264': KeyEvent.FFWD_KEY,
		'263': KeyEvent.PAUSEPLAY_KEY,

		'275': KeyEvent.RED_KEY,
		'276': KeyEvent.GREEN_KEY,
		'277': KeyEvent.YELLOW_KEY,
		'278': KeyEvent.BLUE_KEY,

		'48': KeyEvent.ZERO_KEY,
		'49': KeyEvent.ONE_KEY,
		'50': KeyEvent.TWO_KEY,
		'51': KeyEvent.THREE_KEY,
		'52': KeyEvent.FOUR_KEY,
		'53': KeyEvent.FIVE_KEY,
		'54': KeyEvent.SIX_KEY,
		'55': KeyEvent.SEVEN_KEY,
		'56': KeyEvent.EIGHT_KEY,
		'57': KeyEvent.NINE_KEY,
		'106': KeyEvent.STAR_KEY,
		'105': KeyEvent.POUND_KEY
	};
	/**
	 * 键盘事件映射
	 */
	var KEYBOARD_EVENT_MAP = {
		'38': KeyEvent.UP_KEY,
		'37': KeyEvent.LEFT_KEY,
		'39': KeyEvent.RIGHT_KEY,
		'40': KeyEvent.DOWN_KEY,
		'13': KeyEvent.OK_KEY,

		'84': KeyEvent.GUIDE_KEY,
		'98': KeyEvent.RADIO_KEY,
		//'97': KeyEvent.MUTE_KEY,
		'24': KeyEvent.TT_KEY,
		'25': KeyEvent.RESTART_KEY,
		'88': KeyEvent.H_KEY,
		//'82': KeyEvent.MENU_KEY,
		'91': KeyEvent.RECORD_KEY,
		'89': KeyEvent.TV_KEY,
		//Y
		'76': KeyEvent.POWER_KEY,
		// L
		'85': KeyEvent.LIVE_KEY,
		// U
		'69': KeyEvent.VOD_KEY,
		// E
		'87': KeyEvent.VAS_KEY,
		// W
		'72': KeyEvent.MENU_KEY,
		// H
		'73': KeyEvent.INFO_KEY,
		// I
		'81': KeyEvent.BTV_KEY,
		// Q
		'27': KeyEvent.EXIT_KEY,
		// ESC
		'79': KeyEvent.AUDIO_KEY,
		// -
		'80': KeyEvent.SUBTITLE_KEY,
		// =
		'75': KeyEvent.MUTE_KEY,
		'66': KeyEvent.BACK_KEY,
		// B
		'188': KeyEvent.PAGEUP_KEY,
		// <
		'190': KeyEvent.PAGEDOWN_KEY,
		// >
		// '16': KeyEvent.FBWD_KEY,
		// // Shift
		// '17': KeyEvent.FFWD_KEY,
		// Ctrl
		'192': KeyEvent.PAUSEPLAY_KEY,
		// `
		'65': KeyEvent.RED_KEY,
		// A
		'83': KeyEvent.GREEN_KEY,
		// S
		'68': KeyEvent.YELLOW_KEY,
		// D
		'70': KeyEvent.BLUE_KEY,
		// F
		'219': KeyEvent.STAR_KEY,
		'221': KeyEvent.POUND_KEY,
		// T
		'78': KeyEvent.FBWD_KEY,
		// N
		'77': KeyEvent.FFWD_KEY,
		// M
		'67': KeyEvent.LOCAL_MEDIA_KEY,
		// C
		'112': KeyEvent.PVR_KEY,
		// F1
		'113': KeyEvent.LONG_PVR_KEY // F2
	};

	function parseEvent(evt) {
		var keyCode = evt.which || evt.keyCode,
			event = REMOTE_EVENT_MAP[keyCode];
		if (typeof event == 'undefined') {
			event = KEYBOARD_EVENT_MAP[keyCode];
		}
		if (typeof event == 'undefined') {
			return KeyEvent.NULL_KEY;
		}
		return event;
	}

	function handleKeyEvent(evt) {
		var event = parseEvent(evt),
			ret = WindowManager.dispathEvent(event);
	}

	function detectDomMutation() {
		// Firefox和Chrome早期版本中带有前缀
		var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
		var target = document.querySelector('#desktop');
		var preFocusElement;

		function clickHandler() {
			var $el = $(this),
				$pre = $(preFocusElement),
				focusHandler = $el.data('focusHandler') || (function() {
					$el.addClass('focused');
				}),
				unFocusHandler = $pre && ($pre.data('unFocusHandler') || (function() {
					$pre.removeClass('focused');
				}));
			unFocusHandler && unFocusHandler($pre);
			focusHandler();
		}

		$('.focusable').on('click', clickHandler);

		// 创建观察者对象
		var observer = new MutationObserver(function(mutations) {
			mutations.forEach(function(mutation) {
				var $el;
				if (mutation.type == 'childList' && mutation.addedNodes && mutation.addedNodes.length) {
					for (var i = 0, len = mutation.addedNodes.length; i < len; i++) {
						$el = $(mutation.addedNodes[i]);
						$el.find('.focusable').on('click', clickHandler);
						$el.hasClass('focusable') && $el.on('click', clickHandler);
					}
				} else if (mutation.type == 'attributes' && mutation.attributeName == 'class' && ~mutation.oldValue.indexOf('focusable') && mutation.target.classList.contains("focused")) {
					preFocusElement = mutation.target;
				}
			});
		});

		// 配置观察选项:
		var config = {
			childList: true,
			attributes: true,
			attributeOldValue: true,
			subtree: true
		}

		// 传入目标节点和观察选项
		observer.observe(target, config);
	}

	return {
		start: function() {
			if (state > STATE_INIT) {
				return;
			}

			window.addEventListener('keydown', handleKeyEvent, false);
			detectDomMutation();
		}
	}
});