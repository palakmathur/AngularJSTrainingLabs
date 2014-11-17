'use strict';

//Main module
var app = angular.module('demo', ['subModule']);

app.config(function(startTime, subStartTime) {
  console.log('Main module config: ' + startTime);
  console.log('Main module config sub: ' + subStartTime); 
});
app.run(function(startTime, subStartTime) {
  console.log('Main module run: ' + startTime);
  console.log('Main module run sub: ' + subStartTime);
});
app.constant('startTime', new Date().toLocaleTimeString());

//Sub module
angular.module('subModule', [])
  .config(function(subStartTime) {
    console.log('Fiter module config: no time');
    console.log('Fiter module config sub:' + subStartTime);
  })
  .constant('subStartTime', new Date().toLocaleTimeString())
  .run(function(startTime, subStartTime) {
    console.log('Filter module run: ' + startTime);
    console.log('Filter module run sub: ' + subStartTime);
  });
