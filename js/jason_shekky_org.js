(function($) {
	
	var isOpen = false,
		cursorFInTime = 800,
		cursorFOutTime = 4500;
	
	var initP5 = function(canvas) {
		var p5sketch = function(processing) {
			var p = processing;
			p.line(0,0,100,100);
		};
		
		var p = new Processing(canvas, p5sketch);
	};
	
	var unloadContent = function() {
		$('#content').unbind('click', closeCard);
		
		$('#p5canvas')
			.fadeOut('fast');
	};
	
	var loadContent = function() {
		$('#content').click(closeCard);
		initP5( document.getElementById('p5canvas') );
		$('#p5canvas').fadeIn(1000);
	};
	
	var closeCard = function() {
		if (!isOpen) {
			return;
		}
		unloadContent();
		
		$('#content')
			.stretch( {'up': -200}, 200, 'linear' )
			.stretch( {'toRight': -370}, 200, 'linear' )
			.move( {'toLeft': 155}, 200, 'swing' );
		
		$('#blurBG')
			.delay(400)
			.fadeOut('slow');
		
		$cursor = $('#cursor')
			.delay(600)
			.pulse(cursorFInTime, cursorFOutTime);
		
		bindCursorEvents($cursor);
		isOpen = false;
	};
	
	var openCard = function() {
		if (isOpen) {
			return;
		}
		
		$('#cursor')
			.stop()
			.fadeOut(35)
			.pulse(35, 35, 'linear', 4);
		
		$('#blurBG')
			.delay(600)
			.fadeIn('slow');
			
		$('#content')
			.delay(600)
			.move( {'toRight': 155}, 200, 'swing' )
			.stretch({
				'toRight': 370,
				'up': 200
			}, 200, 'linear', loadContent );
		
		isOpen = true;
	};
	
	// self executing
	var preloadImages = function() {
		var imageObj = new Image();
		imageObj.src = 'images/fallen-lines.jpg';
		imageObj.src = 'images/fallen-lines-blur.jpg';
		imageObj.src = 'images/jr_title.jpg';
	}(),
	
	bindCursorEvents = function($cursor) {
		$cursor
			.bind('mouseenter.cursorEvents', function() {
				$cursor
					.stop(true)
					.fadeTo('fast', 1);
			})
			.bind('mouseleave.cursorEvents', function() {
				$cursor
					.fadeOut(cursorFOutTime, 'swing')
					.pulse(cursorFInTime, cursorFOutTime);
			})
			.bind('click.cursorEvents', function() {
				$cursor.unbind('.cursorEvents');
				openCard();
			});
	};

	$(document).ready(function() {
		var $cursor,
		$newDiv = $('<div>');
		
		$newDiv
			.clone()
				.attr('id', 'blurBG')
				.prependTo('#container');
			
		$cursor = $newDiv
			.clone()
				.attr('id', 'cursor')
				.appendTo('#content')
				.pulse(cursorFInTime, cursorFOutTime);
		
		bindCursorEvents($cursor);
//		initP5();
	});
})(jQuery);



