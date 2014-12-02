(function () {
  'use strict';

  var mainApp = angular.module('myApp', [
      // lib
      // 'ngPrettyJson',
      'ui.router'


  ]);


  // mainApp.directive('snippet', ['$timeout', '$interpolate', function ($timeout, $interpolate) {
  //       "use strict";
  //       return {
  //           restrict: 'E',
  //           template: '<pre><code ng-transclude></code></pre>',
  //           replace: true,
  //           transclude: true,
  //           link: function (scope, elm) {
  //               var tmp = $interpolate(elm.find('code').text())(scope);
  //               elm.find('code').html(hljs.highlightAuto(tmp).value);
  //           }
  //       };
  //   }]);


   mainApp.config(function ($stateProvider, $urlRouterProvider, routesCfg, $locationProvider) {

    // iterate over the routes (configured as constants in config/routes-cfg.js)
    _.forEach(routesCfg, function (route) {
      $stateProvider.
          state(route.state, {
            url: route.url,
            templateUrl: route.templateUrl,
            controller: route.controller, 
            views : route.views, 
            onEnter: function() {
              console.log('onEnter_'+route.state, true);
            }, 
            onExit: function() {
              console.log('onExit_'+route.state, true);
            }
          });
    });
    // $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/init'); 
  });


  mainApp.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    delete $httpProvider.defaults.headers.common['X-CSRFToken'];
  });
     



})();

