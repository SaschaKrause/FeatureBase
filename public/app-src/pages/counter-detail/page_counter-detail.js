// created at: Tue Sep 09 2014 00:30:18 GMT+0200 (CEST)
angular.module('myApp').controller('CounterDetailPage', function ($scope, $stateParams, ReleaseService, $interval) {
  'use strict';  

  /** init
  ----------------------------------------------------------------------------*/

  $scope.detailedCounter = null;
  $scope.intervalRef = null;

  /** public
  ----------------------------------------------------------------------------*/

   $scope.stopCounting = function() {
    if (angular.isDefined($scope.intervalRef)) {
      $interval.cancel($scope.intervalRef);
      $scope.intervalRef = undefined;
    }
  };

  $scope.$on('$destroy', function() {
    // Make sure that the interval is destroyed too
    $scope.stopCounting();
  });


  /** private
  ----------------------------------------------------------------------------*/

  init();

  function init() {
    console.log($stateParams)

    ReleaseService.getCounterDetailById($stateParams.id).then(function(data) {
      $scope.detailedCounter = data;

      startCounting();
    });
  }


  function startCounting() {

    var targetDate = moment($scope.detailedCounter.date);
    var secondsDifference = null
    var daysFromSecondsDivider = (60*60*24);
    var hoursFromSecondsDivider = (60*60);
    var minutesFromSecondsDivider = (60);

    $scope.intervalRef  = $interval(function() {

      secondsDifference = Math.abs(moment().diff(targetDate, 'seconds'));

      var dayLeftoverInSeconds = secondsDifference % daysFromSecondsDivider;
      var hourLeftoverInSeconds = dayLeftoverInSeconds % hoursFromSecondsDivider;
      var minuteLeftoverInSeconds = hourLeftoverInSeconds % minutesFromSecondsDivider;

      $scope.detailedCounter.differences = {};
      $scope.detailedCounter.differences.days = (secondsDifference - dayLeftoverInSeconds) / daysFromSecondsDivider;
      $scope.detailedCounter.differences.hours = (dayLeftoverInSeconds - hourLeftoverInSeconds) / hoursFromSecondsDivider;
      $scope.detailedCounter.differences.minutes = (hourLeftoverInSeconds - minuteLeftoverInSeconds) / minutesFromSecondsDivider;
      $scope.detailedCounter.differences.seconds = minuteLeftoverInSeconds

    },500);


  }
});
