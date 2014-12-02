// created at: Mon Oct 20 2014 22:01:48 GMT+0200 (CEST)
angular.module('myApp').controller('StoryAreasPage', function ($scope, StoryService, AreaService, CategoryService) {
  'use strict';  

  $scope.stories = [];
  $scope.areas = [];
  $scope.categories = [];
  $scope._ = _;
  /** init
  ----------------------------------------------------------------------------*/

  StoryService.getStories().then(function(storiesData) {
    $scope.stories = storiesData;
    console.log($scope.stories);
    console.log(_.groupBy($scope.stories, 'categoryId') );
  });

  AreaService.getAreas().then(function(areasData) {
    $scope.areas = areasData;
    console.log($scope.areas);
  });

  CategoryService.getCategories().then(function(categoriesData) {
    $scope.categories = categoriesData;
    console.log($scope.categories);
  });

  /** public
  ----------------------------------------------------------------------------*/

  $scope.getImpactFromStoryForArea = function (areaId, storyId) {

    var story = _.find($scope.stories, {id: storyId});

    var impact = _.find(story.impactAreas, function(impactArea) {
      return impactArea.areaId === parseInt(areaId)
    });
    if(impact && impact.impactLevel) {
      return parseInt(impact.impactLevel);
    }
    else {
      return 0;  
    }
    
  }


  $scope.getStoriesFromCategory = function(categoryId) {
    var category = parseInt(categoryId);

    return _.filter($scope.stories, {categoryId: category})
    
  }

  
  /** private
  ----------------------------------------------------------------------------*/


});
