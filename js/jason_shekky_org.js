(function($) {
	
	var isOpen = false,
		cursorFInTime = 800,
		cursorFOutTime = 4500;
	
	var unloadContent = function() {
		$('#content').unbind('click', closeCard);
		$('#p5canvas')
			.fadeOut('fast');
		mySketch.exit();
	};
	
	var loadContent = function() {
		$('#content').click(closeCard);
		mySketch.init( document.getElementById('p5canvas') );
		$('#p5canvas').fadeIn('fast');
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
			.pulse(cursorFInTime, cursorFOutTime)
			.bindCursorEvents();
			
		isOpen = false;
	};
	
	var openCard = function() {
		if (isOpen) {
			return;
		}
		
		$('#cursor')
			.stop()
			.fadeOut(35)
			.pulse(35, 35, 'linear', 4)
			.unbindCursorEvents();
		
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
	}();
	
	$.fn.bindCursorEvents = function() {
		var self = this;
		self
			.bind('mouseenter.cursorEvents', function() {
				self
					.stop(true)
					.fadeTo('fast', 1);
			})
			.bind('mouseleave.cursorEvents', function() {
				self
					.fadeOut(cursorFOutTime, 'swing')
					.pulse(cursorFInTime, cursorFOutTime);
			})
			.bind('click.cursorEvents', function() {
				openCard();
			});
	};
	
	$.fn.unbindCursorEvents = function() {
		this.unbind('.cursorEvents');
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
				.pulse(cursorFInTime, cursorFOutTime)
				.bindCursorEvents();
	});
})(jQuery);



