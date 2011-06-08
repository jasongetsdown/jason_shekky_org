var myCard = myCard ? myCard : {};

myCard.util = {};

myCard.util.Tweener = function Tweener( initial, stepFactor ){
	if (this instanceof Tweener) {
		return Tweener.create( initial, stepFactor );
	}
};

myCard.util.Tweener.create = function create( initial, stepFactor ) {
	var target = typeof initial === 'number' ? initial : 0,
		factor = typeof stepFactor === 'number' ? stepFactor : 0,
		current = target;
	
	var getValue = function() {
		return current;
	};
	
	var setTarget = function(newTarget) {
		target = newTarget;
		return this;
	};
	
	var update = function() {
		var delta = target - current;
		if (factor === 0) {
			return;
		}
		
		if (delta > factor || delta < -factor) {
			current += delta * factor;
		} else {
			current = target;
		}
	};
	
	var exports = {
		value: getValue,
		setTarget: setTarget,
		update: update
	};
	return exports;
};