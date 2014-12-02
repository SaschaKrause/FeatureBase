'use strict';  
// created at: Sun Jul 27 2014 15:48:21 GMT+0200 (CEST)
angular.module('myApp').directive('sidebarComponent', function (APIProjectService) {
  

  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'app-build/components/sidebar/sidebar-tpl.html',
    link: function($scope, element, attrs) {
    }
  };
});