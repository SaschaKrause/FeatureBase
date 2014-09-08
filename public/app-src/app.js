(function () {
  'use strict';

  var mainApp = angular.module('myApp', [
      // lib
      'ui.router',


  ]);


   mainApp.config(function ($stateProvider, $urlRouterProvider, routesCfg, $locationProvider) {

    // iterate over the routes (configured as constants in config/routes-cfg.js)
    _.forEach(routesCfg, function (route) {
      $stateProvider.
          state(route.state, {
            url: route.url,
            templateUrl: 'app-build/pages/'+route.templateUrl,
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
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // $httpProvider.defaults.useXDomain = true;
    // $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
  });
     



})();

