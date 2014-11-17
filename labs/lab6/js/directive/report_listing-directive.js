'use strict';
/**
 * Controller handling the lemon report listing directives
 **/
app.controller('lemonReportListingController', function($scope) {
	
	//Set the grossProfit on the parent controller
	$scope.reportItem.grossProfit = $scope.reportItem.netSale - $scope.reportItem.costOfGoods;

	//Communicte to the child directive the limit and grossProfit
	this.limit = $scope.limit;
	this.grossProfit = $scope.reportItem.grossProfit;

});

/**
 * Directive for each report item
 *	parent directive holding report listing footers
 **/
app.directive('lemonReportListingContainer', function() {

	return {
		//Only want attribute directive
		restrict: 'EA',  
		//Isolate scope
    	scope: {
    		//2 way binding on a report object
    		reportItem: '=',
    		//Referencing a method on the parent scope
    		action: '&',
    		//Local scope binding
    		limit: '='
    	},
    	//Include user-defined HTML
    	transclude: true,
    	//We want to deal with an external template
		templateUrl: '/templates/directive/report-listing.html',
		//Utilizing the lemonReportListingController
		controller: 'lemonReportListingController',
		//Link function handles selected click
		link: function(scope, instanceElement) {

			//Setting flag on parent controller
			scope.reportItem.profitable = scope.reportItem.grossProfit > 200 ? true : false;

			//Setting the selected item
			scope.showSelected = function() {
				scope.action({selectedReport: scope.reportItem});
			};

			//Setting up binding on a report item to make it selected
			instanceElement.bind('click', function() {
				//Utilizing jqLite DOM crawling
				//	Removing all 'selected' classes
				instanceElement.parent().children().removeClass('selected');
				//Adding a 'selected' class to the clicked report item
				instanceElement.addClass('selected');
			});
		}
	};
});

app.directive('lemonReportListingFooter', function() {
	
	//Static URL images to display for footer
	var URL = [
		'/images/thumbsUp.png',
		'/images/smiley_face.jpg',
		'/images/hands_clapping.png'
	];

	return {
		//Only want attribute directive
		restrict: 'EA',  
		//No special scope needed
    	scope: {
    		reportProperties: '='
    	},
    	//Requires Lemon Report Listing Outer
    	require: '^lemonReportListingContainer',
 
    	//We want to deal with an external template
    	template: '<footer><img ng-if="grossProfit >= 200" ng-src="{{goodImage}}" alt="Good jiorb" /> Gross Profit: {{grossProfit}}</footer>',
		/**
		 * Compiling the non-DOM essential information.
		 **/
		compile: function() {

			/**
			 * Choose a new number based on a random seed.
			 * @return a URL string that will be interpolated into an ng-src image
			 **/
			var chooseImage = function() {
				var imageChoice = Math.round(Math.random()*2);
				return URL[imageChoice];
			};

			return {
				//Compile: pre-link
				pre: function(scope, instanceElement, instanceAttrs, lemonReportListingController) {
					//Setting the footer to be shown
					scope.reportProperties.footerShown = true;
					//Set image url on the controller
					scope.reportProperties.footerImgUrl = URL[0];
					//Grab needed controller variables 
					scope.grossProfit = lemonReportListingController.grossProfit;
					//Setup a default image
					scope.goodImage = chooseImage();
				},
				//Compile: post-link
				post: function(scope) {
					//Whenever the limit count gets bigger on the controller get a new image
					scope.$watch('reportProperties.limit', function(newVal, oldVal, scope) {
						if (oldVal < newVal) {
							scope.goodImage = chooseImage();
						}
					});
				}
			};
		}

		//If I don't use the compile: pre/post stuff
		/**
		 * @param scope
		 * @param instanceElement: <div lemon-report-listing-inner></div>
		 * @param instanceAttrs: attributes on the <div lemon-report-listing-inner></div>
		 *		- In this case none
		 * @param lemonReportListingController: instance of Lemon Report Listing Controller
		 **/
		/*link: function(scope, instanceElement, instanceAttrs, lemonReportListingController) {
			
			//Setting the footer to be shown
			scope.reportProperties.footerShown = true;
			//Set image url on the controller
			scope.reportProperties.footerImgUrl = URL[0];
			//Grab needed controller variables 
			scope.grossProfit = lemonReportListingController.grossProfit;

			//Whenever the limit count changes on the controller get a new URL
			scope.$watch('lemonReportListingController.limit', function() {
				var imageChoice = Math.round(Math.random()*2);
				scope.goodImage = URL[imageChoice];
			});

		}*/
	};
});