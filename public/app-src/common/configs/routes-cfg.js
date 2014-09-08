
angular.module('myApp').constant('routesCfg', [

		// layouts
		
		{
			state: 'list',
			abstarct: true,
			templateUrl: 'layouts/layout_list.html'
		},

		// releases
		{state: 'list.project-overview',										url: '/project/overview',																	views: {'content': {templateUrl: 'app-build/pages/project-overview/page_project-overview.html',													controller: 'ProjectOverviewPage' } } },
		{state: 'list.watchlist', 													url: '/my/watchlist', 																		views: {'content': {templateUrl: 'app-build/pages/watchlist/page_watchlist.html', 																			controller: 'WatchlistPage'} } },

	]);
