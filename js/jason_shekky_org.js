
(function($) {
	
	var isOpen = false,
	cursorFInTime = 800,
	cursorFOutTime = 4500,
	factCount = -1,
	lastFactNum = -1,
	factTimeoutID,
	
	getPathForFact = function(i) {
		if (i < 10) {
			return ('images/facts/fact_0' + i + '.jpg');
		} else {
			return ('images/facts/fact_' + i + '.jpg');
		}
	},
	
	getRandomFactPath = function() {
		var factNum = Math.floor( Math.random() * (factCount) + 1);
		if (factNum !== lastFactNum) {
			lastFactNum = factNum;
			return getPathForFact(factNum);
		} else {
			lastFactNum = -1;	//prevents infinite loop in the case where there is only one image
			return getRandomFactPath();
		}
	},
	
	newFact = function() {
		if (factCount > 0) {
			$('#fact')
				.fadeOut('slow', function() {
					$(this).attr('src', getRandomFactPath());
				})
				.delay(500)
				.fadeIn(1000);
				
			if (factCount > 1) {
				factTimeoutID = window.setTimeout(newFact, 8000);
			}
		} else if (factCount < 0) {
			factTimeoutID = window.setTimeout(newFact, 250);
		}
	},
	
	unloadContent = function() {
		$('#content').unbind('click', closeCard);
		
		window.clearTimeout(factTimeoutID);
		$('#title, #fact')
			.stop(true, true)
			.fadeOut('fast');
	},
	
	loadContent = function() {
		$('#content').click(closeCard);
		
		$('#title').fadeIn(1000);
		factTimeoutID = window.setTimeout(newFact, 1900);
	},
	
	closeCard = function() {
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
	},
	
	openCard = function() {
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
	},
	
	// self executing
	preloadImages = function() {
		var imageObj = new Image();
		var jqxhr = $.ajax({ url: 'factcount.php' })
			.success(function() { 
				var i;
				factCount = parseInt(jqxhr.responseText)
				for (i=1; i<=factCount; i++) {
					imageObj.src = getPathForFact(i);
				}
			});
	
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
	});
})(jQuery);



