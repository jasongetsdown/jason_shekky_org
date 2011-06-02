var myCard = {};
	myCard.util = {};
	myCard.p5 = {};
	
myCard.util.makeTweener = function makeTweener(x, y, stepFactor){
	var tx = typeof x === 'number' ? x : 0,
		ty = typeof y === 'number' ? y : 0,
		factor = typeof stepFactor === 'number' ? stepFactor : 0,
		cx = tx,
		cy = ty;
	
	var getX = function() {
		return cx;
	};
	
	var getY = function() {
		return cy;
	};
	
	var setX = function(newX) {
		tx = newX;
		return this;
	};
	
	var setY = function(newY) {
		ty = newY;
		return this;
	};
	
	var setTarget = function(newX, newY) {
		return this.setX(newX).setY(newY);
	};
	
	var update = function() {
		var dx = tx - cx;
		var dy = ty - cy;
		
		if (dx > factor || dx < -factor) {
			cx += dx * factor;
		} else {
			cx = tx;
		}
		if ( dy > factor || dy < -factor) {
			cy += dy * factor;
		} else {
			cy = ty;
		}
	};
	
	var exports = {
		x: getX,
		y: getY,
		setX: setX,
		setY: setY,
		setTarget: setTarget,
		update: update
	};
	return exports;
};