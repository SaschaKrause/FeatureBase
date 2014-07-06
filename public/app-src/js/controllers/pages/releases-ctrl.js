angular.module('controller.page.releases', []).controller('ReleasesCtrl', ["$scope", 'ReleaseService', '$state', '$stateParams', 'CountreeService', '$q', 
	function ($scope, ReleaseService, $state, $stateParams, CountreeService, $q) {
  "use strict";

	$scope.page = {
		overview: {
			releases: null
		},
		detailed: {
			release: null,
			countree: null,
			countResult: null,
		}
	};

	initOverview();

	$scope.$watch('stateParams', function() {
		if($stateParams.releaseId) {

			loadDetailedReleaseFromId($stateParams.releaseId)
					.then(function(data) {
						console.log(data);
					});
		}
	});

	// $rootScope.$on('$stateChangeStart', 
	// 	function(event, toState, toParams, fromState, fromParams){ 
	// 		console.
	// 	}
	// );



	function initOverview() {
		ReleaseService.getAllReleases(function onSuccess(releasesHash) {
	  	$scope.page.overview.releases = releasesHash;
	  });
	}


  $scope.showDetailedRelease = function(releaseId) {
  	$state.go('counter-detail.release', {releaseId: releaseId});
  }


 

  function loadDetailedReleaseFromId(releaseId) {
  	var deferred = $q.defer();

  	ReleaseService.getReleaseFromId(releaseId, function onSuccess(releaseData) {
	  	$scope.page.detailed.release = releaseData;
	  	deferred.resolve($scope.page.detailed.release);
	  });
  	
  	return deferred.promise;
  }
}]);
