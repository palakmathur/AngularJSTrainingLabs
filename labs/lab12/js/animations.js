'use strict';

/**
 *  Animations
 **/
app.animation('.structure-animation', function() {
	/**
	 * Content ready to be displayed.
	 * @param element - DOM element we will be animating
	 * @param done - jQuery promise function to specify the animation is done
	 *	'done' is optional in a jQuery app, but necessary in our angular app
	 **/

	var enter = function(element, done) {
		//Start our element as hidden
		$(element).css({
			opacity: 0
		})
		//Expose our element over a second
		.animate({
			opacity: 1
		}, done);
	};

	//Content is ready to be hidden
	var leave = function(element, done) {
		done();
	};

	return {
		enter: enter,
		leave: leave
	};
})
.animation('.show-animation', function() {
	
	/**
	 * After ngClass evaluates to true and just before the class is added
	 *	ng-show / ng-hide utilize the 'ng-hide' class
	 *	That is what we are looking for
	 * @param element - DOM element we will be animating
	 * @param className - $angular service specified className that is kicking off transition
	 * @param done - jQuery promise function to specify the animation is done
	**/
	var addClass = function(element, className, done) {
		done();
	};

	//Before class is removed
	var removeClass = function(element, className, done) {
		if (className === 'ng-hide') {
			//Start our element as hidden
			$(element).css({
				opacity: 0
			});
			//Expose our element over a second
			$(element).animate({
				opacity: 1
			}, 1000, done);
		} else {
			done();
		}
	};

	return {
		removeClass: removeClass,
		addClass: addClass
	};
})
//We also have a removeClass functionality
.animation('.class-animation', function() {
	//After ngClass evaluates to true and just before the class is added
	var addClass = function(element, className, done) {
		if (className === 'class-animation') {
			//You can only animate color via jQuery with a color plugin
			//	https://github.com/jquery/jquery-color
			//Show as yellow
			$(element).animate({
				'background-color': 'rgb(255,255,0)'
			}, 300)
			//Show as white
			.animate({
				'background-color': 'rgb(255,255,255)'
			}, 300, done);
		} else {
			done();
		}
	};

	//Before class is removed
	var removeClass = function(element, className, done) {
		done();
	};

	return {
		addClass: addClass,
		removeClass: removeClass
	};
});
