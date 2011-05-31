var mySketch = function($) {
	var processing;
	
	var tweener = function (x, y, step){
		var tx = typeof x === 'number' ? x : 0;
		var ty = typeof y === 'number' ? y : 0;
		var damp = typeof damping === 'number' ? damping : 0;
		
		var getX = function() {
			return cx;
		};
		
		var getY = function() {
			return cy;
		};
		
		var setX = function(newX) {
			this.tx = newX;
			return this;
		};
		
		var setY = function(newY) {
			this.ty = newY;
			return this;
		};
		
		var setTarget = function(newX, newY) {
			return this.setX(newX).setY(newY);
		};
		
		var update = function() {
			var dx = tx - cx;
			var dy = ty - cy;
			
			if (dx > damp) {
				cx += (tx - cx) * damp;
			} else {
				cx = tx;
			}
			if ( dy > damp) {
				cy += (ty - cy) * damp;
			} else {
				cy = ty;
			}
		};
		
		return {
			x: getX,
			y: getY,
			setX: setX,
			setY: setY,
			setTarget: setTarget,
			update: update
		};
	};
	
	var p5sketch = function(processing) {
		var p = processing,
			tweeners = [];
		
		var setTweeners = function() {
			//TODO	
		};
		
		var updateTweeners = function() {
			//TODO	
		};
		
		var drawLine = function() {
			var i, len;
			p.beginShape();
			for (i = 0, len = tweeners.length; i < len; i++) {
				p.vertex( tweeners[i].x(), tweeners[i].y() );
			}
			p.endShape();
		};
		
		p.setup = function() {
			p.size(380, 218);
			p.frameRate(3);
			p.background(255);
			p.stroke(150);
			p.strokeWeight(1);
			p.noFill();
			p.noSmooth();
		};
		
		p.draw = function(){
			p.background(255);
			if (p.frameCount % 30 === 0) {
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