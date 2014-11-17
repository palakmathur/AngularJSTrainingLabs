'use strict';
/**
 *  Directive to be used across all page headers.
 **/
app.directive('lemonReportListing', function() {
	
	var URL = [
		'/images/thumbsUp.png',
		'/images/smiley_face.jpg',
		'/images/hands_clapping.png'
	];

	return {
		//Only want attribute directive
		restrict: 'EA',  
		//Isolate scope
    	scope: {
    		//2 way binding on a report object
    		report: '=',
    		//Referencing a method on the parent scope
    		action: '&',
    		//Bringing in the one-way binding
    		limit: '@'
    	},
    	//Include user-defined HTML
    	transclude: true,
    	//We want to deal with an external template
		templateUrl: '/templates/directive/report-listing.html',
		controller: ['$scope', '$element', '$attrs', '$transclude', 
			function($scope, $element, $attrs, $transclude) {
				$scope.report.grossProfit = $scope.report.netSale - $scope.report.costOfGoods;
				$scope.report.profitable = $scope.report.grossProfit > 200 ? true : false;
				$scope.showSelected = function() {
					$scope.action({selectedReport: $scope.report});
				};
		}],
		link: function(scope, instElement, instAttrs, controller, transcludeFunction) {
			
			var imageChoice;
			scope.$watch('limit', function() {
				imageChoice = Math.round(Math.random()*2);
				console.log('imageChoice' + imageChoice);
				scope.report.goodImage = URL[imageChoice];
			});
			

			instElement.bind('click', function() {
				instElement.parent().children().removeClass('selected');
				instElement.addClass('selected');
			});
		}
	};
});