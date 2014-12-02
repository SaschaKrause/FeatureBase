// created at: Mon Oct 13 2014 22:48:12 GMT+0200 (CEST)
angular.module('myApp').controller('StoryItemPage', function ($scope, $stateParams, StoryService) {
  'use strict';  

  /** init
  ----------------------------------------------------------------------------*/


  StoryService.getStoryById($stateParams.id).then(function(storyData) {
    $scope.story = storyData;
  });

  
  /** public
  ----------------------------------------------------------------------------*/

  $scope.fn = function () {

  }

  /** private
  ----------------------------------------------------------------------------*/


});
