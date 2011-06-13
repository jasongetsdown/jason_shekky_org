var myCard = myCard ? myCard : {};

myCard.p5 = myCard.p5 ? myCard.p5 : {};


/**
 * Creates a line of points whose components are Tweeners
 * @constructor
 * @param params.length Number of points
 * @param [params.startX = 0] X value of point n = 0
 * @param [params.startY = 0] Y value of point n = 0
 * @param [params.xInterval = 0] Point n has x = n * xInterval + startX
 * @param [params.yInterval = 0] Point n has y = n * yInterval + startY
 * */
myCard.p5.OrderedTweenerList = function(params) {
	if (!(this instanceof OrderedTweenerList)) {
		return new OrderedTweenerList(params);
	}
	
	var index = -1,
		points = [],
		o = {},
		self = this;
	
	o.length = params.length;
	o.startX = params.startX ? params.startX : 0;
	o.startY = params.startY ? params.startY : 0;
	o.xInterval = params.xInterval ? params.xInterval : 0;
	o.yInterval = params.yInterval ? params.yInterval : 0;
	
	var dimensionPoints = function() {
		var i, len;
		for (i = 0, len = o.length; i < len; i++) {
			points[i] = [];
			points[i][0] = new Tweener(i * o.xInterval + o.startX);
			points[i][1] = new Tweener(i * o.yInterval + o.starty);
		}
	};
	
	dimensionPoints();
	
	/** @function */
	this.getXAtIndex = function(i) {
		return points[i][0].getX();
	};
	
	/** @function */
	this.setXTargetAtIndex = function(i, tX) {
		points[i][0].setTarget(tX);
	};
	
	/** @function */
	this.setYTargetAtIndex = function(i, tY) {
		points[i][1].setTarget(tY);
	};
	
	/**
	 * Updates the position of each point and resets the iterator index
	 * */
	var update = function() {
		var i, len;
		for (i = 0, len = o.length; i < len; i++) {
			points[i] = [];
			points[i][0].update();
			points[i][1].update();
		}
		index = -1;
	};
	
	/** @function */
	this.next = function() {
		if (++index < o.length) {
			return [
				self.getXAtIndex(index),
				self.getYAtIndex(index)
			];
		} else {
			index = -1;
			throw {
				name: 'IterationException',
				message: 'Iterator out of elements.'
			};
		}
	};
	
	/** @function */
	var hasNext = function() {
		return (index + 1 < o.length);
	};
};



myCard.p5.sketch = function() {
	var processing,
		Tweener = myCard.util.Tweener;
	
	var p5sketch = function(processing) {
		var p = processing,
			tweeners = [];
		
		var makeTweeners = function() {
			var i, len = 7,
				interval = p.width / (len - 1);
			for (i = 0; i < len; i++) {
				tweeners[i] = [];
				tweeners[i].push( Tweener.create(i * interval, 0.05) );
				tweeners[i].push( Tweener.create(100, 0.05) );
			}
		};
		
		var setTweeners = function() {
			var i, len = tweeners.length;
			for (i = 0; i < len; i++) {
				tweeners[i][1].setTarget( Math.random() * 50 + 75 );
			}
		};
		
		var updateTweeners = function() {
			var i, len = tweeners.length;
			for (i = 0; i < len; i++) {
				tweeners[i][1].update();
			}
		};
		
		var drawLine = function() {
			var i, len = tweeners.length;
			p.beginShape();
			p.vertex(380, 0);
			p.vertex(0, 0);
			for (i = 0; i < len; i++) {
				p.vertex( tweeners[i][0].value(), tweeners[i][1].value() );
			}
			p.endShape('CLOSE');
		};
		
		p.setup = function() {
			p.size(380, 218);
			p.frameRate(30);
			p.background(255);
			p.stroke(204, 255, 0, 50);
			p.strokeWeight(1);
			p.fill(204, 255, 0, 50);
			p.noSmooth();
			
			makeTweeners();
		};
		
		p.draw = function(){
			p.background(255);
			if (p.frameCount % 40 === 0) {
				setTweeners();
			}
			updateTweeners();
			drawLine();
		};
	};
	
	var init = function(canvas) {
		processing = new Processing(canvas, p5sketch);
	};
	
	var exit = function() {
		processing.exit();
	};
	
	return {
		init: init,
		exit: exit
	};
}();