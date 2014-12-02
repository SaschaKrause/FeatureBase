'use strict';  
// created at: Sun Jul 27 2014 15:48:21 GMT+0200 (CEST)
angular.module('myApp').controller('SidebarCtrl', function ($scope, $rootScope, APIProjectService) {
  

  /** definition
  ----------------------------------------------------------------------------*/

  $scope.x = {
    a: "asdsad"
  } 

  $scope.requests = "APIProjectService.requests;";


  $scope.$watch('x', function change(asdf) {
    console.log(asdf)
  }, true)
  /** public
  ----------------------------------------------------------------------------*/

  $scope.fn = function () {
    
  } 

  /** private
  ----------------------------------------------------------------------------*/
  function asd (){

  }

});
