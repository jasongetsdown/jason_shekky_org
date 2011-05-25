(function($) {
// .pulse() plugin
	var isNumber = function(value) {
		return typeof value === 'number' && isFinite(value);
	};
	
	$.fn.pulse = function(fadeInTime, fadeOutTime, easing, n) {
		var inTime = isNumber(fadeInTime) && fadeInTime >= 0 ? fadeInTime : 1000;
		var outTime = isNumber(fadeOutTime) && fadeOutTime >= 0 ? fadeOutTime : 1000;
		var myEasing = typeof easing ==='string' ? easing : 'swing';
		
		if (isNumber(n) && n <= 0) {
			return;
		}
		return this.fadeIn(inTime, myEasing, function() {
			$(this).fadeOut(outTime, myEasing, function() {
				$(this).pulse(inTime, outTime, myEasing, n-1);
			});
		});
	};
})(jQuery);


/*
For concurrent animations of multiple properties call like:
$('#foo').stretch({
	up: 200,
	toRight: 400
}, 1000, 'swing', complete);
*/

(function($) {
// .move() and .stretch() plugins
	var that,
	defaults = {
		up: 0,
		down: 0,
		toLeft: 0,
		toRight: 0
	},
	
	aggregator = {
		top: 0,
		left: 0,
		height: 0,
		width: 0,
		
		up: function(val, stretch) {
			this.top -= val;
			this.height += (stretch ? val : 0);
		},
		down: function(val, stretch) {
			this.top += (stretch ? 0 : val);
			this.height += (stretch ? val : 0);
		},
		toLeft: function(val, stretch) {
			this.left -= val;
			this.width += (stretch ? val : 0);
		},
		toRight: function(val, stretch) {
			this.left += (stretch ? 0 : val);
			this.width += (stretch ? val : 0);
		},
		
		reset: function() {
			this.top = this.left = this.height = this.width = 0;
		},
		
		getAnimationProps: function() {
			return {
				top: '+=' + this.top,
				left: '+=' + this.left,
				height: '+=' + this.height,
				width: '+=' + this.width
			};
		}
	},
	
	transform = function( properties, duration, easing, complete, stretch ) {
		var p, props = $.extend( {}, defaults, properties );
		aggregator.reset();
		
		for (p in props) {
			if (props.hasOwnProperty(p)) {
				aggregator[p]( props[p], stretch );
			}
		}
		
		return that.animate( aggregator.getAnimationProps(), duration, easing, complete );
	};
	
	
	$.fn.move = function( properties, duration, easing, complete ) {
		that = this;
		return transform( properties, duration, easing, complete, false );
	};
		
	$.fn.stretch = function( properties, duration, easing, complete ) {
		that = this;
		return transform( properties, duration, easing, complete, true );
	};
})(jQuery);