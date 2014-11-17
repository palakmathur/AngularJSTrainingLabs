angular.module('lemonadeApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/home.html',
    "<section id=\"home\">\n" +
    "\t<figure>\n" +
    "\t\t<figcaption>This one's on me!</figcaption>\n" +
    "\t\t<img src=\"images/glass-lemonade-3.jpg\" alt=\"Lemonade in a glass\" width=\"300\">\n" +
    "\t</figure>\n" +
    "</section>\n"
  );


  $templateCache.put('templates/sell.html',
    "<section id=\"sell\">\n" +
    "\t<h2>Sell\n" +
    "\t</h2>\n" +
    "\t<ul id=\"buttons\" ng-controller=\"ProductController\">\n" +
    "\t \t<li data-identifier=\"largeLemonadeItem\" data-ng-click=\"incrementLargeLemonade()\">\n" +
    "\t \t\tLarge glass of lemonade<mark>{{transaction.largeLemonadeQuantity}}</mark>\n" +
    "\t \t</li>\n" +
    "\t \t<li data-identifier=\"mediumLemonadeItem\" data-ng-click=\"incrementMediumLemonade()\">\n" +
    "\t \t\tMedium glass of lemonade<mark>{{transaction.mediumLemonadeQuantity}}</mark>\n" +
    " \t\t</li>\n" +
    "\t \t<li data-identifier=\"healthySnackItem\" data-ng-click=\"incrementHealthySnack()\">\n" +
    "\t \t\tHealthy snack<mark>{{transaction.healthySnackQuantity}}</mark>\n" +
    " \t\t</li>\n" +
    "\t \t<li data-identifier=\"treatItem\" data-ng-click=\"incrementTreat()\">\n" +
    "\t \t\tTreat<mark>{{transaction.treatQuantity}}</mark>\n" +
    " \t\t</li>\n" +
    "\t</ul>\t\n" +
    "\t<section>\n" +
    "\t\t<p id=\"transactionQuantity\">\n" +
    "\t\t\tTransaction Quantity: <mark>{{transaction.transactionQuantity}}</mark> products\n" +
    "\t\t<p>\n" +
    "\t\t<p id=\"transactionCost\">\n" +
    "\t\t\tTransaction Cost: <mark>{{transaction.transactionCost}}</mark> products\n" +
    "\t\t<p>\n" +
    "\t\t<p>\n" +
    "\t\t\t<button id=\"clearTransaction\" data-ng-click=\"clearTransaction()\">Clear Transaction</button>\n" +
    "\t\t</p>\n" +
    "\t</section>\n" +
    "</section>"
  );

}]);
