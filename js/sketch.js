myCard.p5.sketch = function($) {
	var processing,
		makeTweener = myCard.util.makeTweener;
	
	var p5sketch = function(processing) {
		var p = processing,
			tweeners = [];
		
		var makeTweeners = function() {
			var i, len = 77;
			for (i = 0; i < len; i++) {
				tweeners[i] = [];
				tweeners[i].push( makeTweener(i*5, 0.05) );
				tweeners[i].push( makeTweener(100, 0.05) );
			}
		};
		
		var setTweeners = function() {
			var i, len = tweeners.length - 1;
			for (i = 1; i < len; i++) {
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
			p.stroke(150);
			p.strokeWeight(1);
			p.fill(150);
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
}(jQuery);