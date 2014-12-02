// created at: Mon Oct 20 2014 22:01:48 GMT+0200 (CEST)
angular.module('myApp').controller('StoryListPage', function ($scope, StoryService) {
  'use strict';  

  /** init
  ----------------------------------------------------------------------------*/

  // $scope = {};

  $scope.storyFilter = {
    roles: [
      {name: 'Owner', selected: true},
      {name: 'Member', selected: true},
      {name: 'ServiceGuy', selected: true}
    ]
  }
  console.log("löaskdlöaskdlöas")
  StoryService.getStories().then(function(storiesData) {
    $scope.stories = storiesData;
  });

  /** public
  ----------------------------------------------------------------------------*/

  $scope.isStoryVisible = function (story) {
    if($scope.storyFilter.roles !== null) {
      return _.intersection(_.pluck(story.roles, 'name'), _.pluck(_.where($scope.storyFilter.roles, {'selected':true}), 'name')).length > 0;
    }
    else {
      return false;
    }
  }

  /** private
  ----------------------------------------------------------------------------*/


});
