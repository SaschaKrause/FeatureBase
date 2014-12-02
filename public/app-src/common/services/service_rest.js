// TODO: add the "service.rest"-module dependency to your mainApp (public/app-src/js/app.js)
angular.module('myApp').factory('AbstractRestService', function($http) {
	'use strict';

	var service = {
		URL: BACKEND_URL // set in index.jade (index_debug.jade)
	};



	/**
	* Generic GET request method that provides the Authentication Token as header by default.
	*/
	service.get = function(path, onSuccess, onError, options, requestStatus) {
		var resolvedPath = buildPath(this.URL + path, options);
		
		$http.get(resolvedPath, getConfig()).success(function(data, status, headers, config){			
			onSuccess && onSuccess(data, status, headers, config);
		}).error(function(data, status){
			onError && onError(data, status);
		});
	};


	/**
	* Provding the headers. Especially the authentication headers are important
	*/
	function getConfig() {
		return {
			headers: {
				// 'Auth-Token': 'test'
			}
		};
	}



	/**
	* Replace the placeholders with the real value
	*/
	function buildPath(pathString, options) {
		var result = pathString;


		// return the path with the replaced placeholders ('{}')
		function stringFormat(path, options) {
			var replacedPath = path.replace(/\{[A-Za-z0-9_.]+\}/g, function (toReplace, index) {
					var optionParamenter = toReplace.substring(1, toReplace.length-1);

					return (options && options[optionParamenter]) || '';
				}
			);

			return replacedPath;
		}

		// replace the placeholders with the actual values
		result = stringFormat(result, options);

		return result;
	}

  return service;
});