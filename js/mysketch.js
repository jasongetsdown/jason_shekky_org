var mySketch = function($) {
	var processing;
	
	var tweener = function (x, y, stepFactor){
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
	
	var p5sketch = function(processing) {
		var p = processing,
			tweeners = [];
		
		var makeTweeners = function() {
			var i, len = 39;
			for (i = 0; i < len; i++) {
				tweeners.push( tweener(i*10, 100, 0.5) );
			}
		};
		
		var setTweeners = function() {
			var i, len = tweeners.length - 1;
			for (i = 1; i < len; i++) {
				tweeners[i].setY( Math.random() * 50 + 75 );
			}
		};
		
		var updateTweeners = function() {
			var i, len = tweeners.length;
			for (i = 0; i < len; i++) {
				tweeners[i].update();
			}	
		};
		
		var drawLine = function() {
			var i, len = tweeners.length;
			p.beginShape();
			for (i = 0; i < len; i++) {
				p.vertex( tweeners[i].x(), tweeners[i].y() );
			}
			p.endShape();
		};
		
		p.setup = function() {
			p.size(380, 218);
			p.frameRate(30);
			p.background(255);
			p.stroke(150);
			p.strokeWeight(1);
			p.noFill();
			p.noSmooth();
			
			makeTweeners();
		};
		
		p.draw = function(){
			p.background(255);
			if (p.frameCount % 2 === 0) {
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
}(jQuery);