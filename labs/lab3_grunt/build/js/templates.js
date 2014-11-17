angular.module('lemonadeApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/home.html',
    "<section id=\"sell\">\n" +
    "\t<figure>\n" +
    "\t\t<figcaption>{{page.title}}</figcaption>\n" +
    "\t\t<img src=\"images/glass-lemonade-3.jpg\" alt=\"Lemonade in a glass\" width=\"300\">\n" +
    "\t</figure>\n" +
    "</section>\n"
  );


  $templateCache.put('templates/sell-healthy.html',
    "<p>\n" +
    "\t<em>My tooth is killing me</em><br>\n" +
    "\t<b>{{info.description}}</b>\n" +
    "</p>\n"
  );


  $templateCache.put('templates/sell-lemonade.html',
    "<p>\n" +
    "\t<em>Have you ever had this?</em><br>\n" +
    "\t<b>{{info.description}}</b><br>\n" +
    "</p>\n" +
    "<p>\n" +
    "\t<em>But is it good for you?</em><br>\n" +
    "\t<b>{{info.health}}</b>\n" +
    "</p>\n"
  );


  $templateCache.put('templates/sell-treat.html',
    "<p>\n" +
    "\t<em>I heard that stuff will kill you?</em><br>\n" +
    "\t<b>Yeah. It drops your life expectancy by like {{info.lifeSpan}} years</b>\n" +
    "</p>\n"
  );


  $templateCache.put('templates/sell.html',
    "<section id=\"sell\">\n" +
    "\t<h2>\n" +
    "\t\t<a ui-sref=\".\">{{page.title}}</a>\n" +
    "\t</h2>\n" +
    "\t<p>\n" +
    "\t\t<a ui-sref=\"sell.lemonade\">Lemonade info</a> | \n" +
    "\t\t<a ui-sref=\".healthy\">Healthy Snack info</a> |\n" +
    "\t\t<a ui-sref=\".treat\">Treat info</a>\n" +
    "\t\t<div ui-view></div>\n" +
    "\t</p>\n" +
    "\t<ul id=\"buttons\" ng-controller=\"ProductController\">\n" +
    "\t \t<li data-identifier=\"largeLemonadeItem\" ng-click=\"incrementLargeLemonade()\">\n" +
    "\t \t\tLarge glass of lemonade<mark>{{transaction.largeLemonadeQuantity}}</mark>\n" +
    "\t \t</li>\n" +
    "\t \t<li data-identifier=\"mediumLemonadeItem\" ng-click=\"incrementMediumLemonade()\">\n" +
    "\t \t\tMedium glass of lemonade<mark>{{transaction.mediumLemonadeQuantity}}</mark>\n" +
    " \t\t</li>\n" +
    "\t \t<li data-identifier=\"healthySnackItem\" ng-click=\"incrementHealthySnack()\">\n" +
    "\t \t\tHealthy snack<mark>{{transaction.healthySnackQuantity}}</mark>\n" +
    " \t\t</li>\n" +
    "\t \t<li data-identifier=\"treatItem\" ng-click=\"incrementTreat()\">\n" +
    "\t \t\tTreat<mark>{{transaction.treatQuantity}}</mark>\n" +
    " \t\t</li>\n" +
    "\t</ul>\t\n" +
    "\t<section>\n" +
    "\t</section>\n" +
    "\t<section>\n" +
    "\t\t<p id=\"transactionQuantity\">\n" +
    "\t\t\tTransaction Quantity: <mark>{{transaction.transactionQuantity}}</mark> products\n" +
    "\t\t<p>\n" +
    "\t\t<p id=\"transactionCost\">\n" +
    "\t\t\tTransaction Cost: <mark>{{transaction.transactionCost}}</mark> products\n" +
    "\t\t<p>\n" +
    "\t\t<p>\n" +
    "\t\t\t<button id=\"clearTransaction\" ng-click=\"clearTransaction()\">Clear Transaction</button>\n" +
    "\t\t</p>\n" +
    "\n" +
    "\t</section>\n" +
    "</section>"
  );

}]);
