(function () {
  "use strict";

  var mainApp = angular.module('myApp', [
      // lib
      'ui.router',

      // config
      'config.routes',

      // controller
      'controller.page.releases',

      'controller.include.navigation',
      'controller.misc.bodystyle',
      
      'controller.main',
      'controller.profile',

      // service
      'service.abstract-rest',
      'service.countree',
      'service.release'
  ]);


   mainApp.config(['$stateProvider', '$urlRouterProvider', 'routesCfg', function ($stateProvider, $urlRouterProvider, routesCfg) {

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
    
    $urlRouterProvider.otherwise("/init"); 

  }]);


  mainApp.config(['$httpProvider', function($httpProvider) {
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // $httpProvider.defaults.useXDomain = true;
    // $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
  }]);
     

})();

