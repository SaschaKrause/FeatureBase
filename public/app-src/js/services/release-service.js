// TODO: add the "service.rest"-module dependency to your mainApp (public/app-src/js/app.js)
angular.module('service.release', []).factory('ReleaseService',['$http', 'AbstractRestService', function($http, AbstractRestService) {
	"use strict";
	var service = {
		PATH_PROJECT_BY_ID: '/project/pixformance',
		PATH_FEATURE_BY_ID: '/project/pixformance/feature'
	};
	


	service.getAllReleases = function(onSuccess, onError) {
		AbstractRestService.get(service.PATH_PROJECT_BY_ID, onSuccess, onError);
	};

	service.getReleaseFromId = function(releaseId, onSuccess, onError) {
		AbstractRestService.get(service.PATH_FEATURE_BY_ID+'/'+releaseId+'', onSuccess, onError);
	};
	
	return service;
}]);
