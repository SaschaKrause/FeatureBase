
angular.module('myApp').constant('routesCfg', [

		// layouts
		
		{
			state: 'list',
			abstarct: true,
			templateUrl: 'app-build/pages/layouts/layout_list.html'
		},
		{
			state: 'none',
			abstarct: true,
			templateUrl: 'app-build/pages/layouts/layout_none.html'
		},
		{
			state: 'app',
			abstarct: true,
			templateUrl: 'app-build/pages/layouts/layout_app.html'
		},

		// releases
		{state: 'list.project-overview',										url: '/project/overview',																	views: {'content': {templateUrl: 'app-build/pages/project-overview/page_project-overview.html',													controller: 'ProjectOverviewPage' } } },
		{state: 'list.watchlist', 													url: '/my/watchlist', 																		views: {'content': {templateUrl: 'app-build/pages/watchlist/page_watchlist.html', 																			controller: 'WatchlistPage'} } },
		{state: 'list.counter-detail', 											url: '/detail/{id}', 																			views: {'content': {templateUrl: 'app-build/pages/counter-detail/page_counter-detail.html', 														controller: 'CounterDetailPage'} } },

		// project mngmt
		{state: 'none.story-item',													url: '/story/{id}', 																			views: {'content': {templateUrl: 'app-build/pages/story-item/page_story-item.html', 																		controller: 'StoryItemPage'} } },
		{state: 'none.story-list', 													url: '/stories', 																					views: {'content': {templateUrl: 'app-build/pages/story-list/page_story-list.html', 																		controller: 'StoryListPage'} } },
		{state: 'none.story-areas', 												url: '/stories/areas', 																		views: {'content': {templateUrl: 'app-build/pages/story-areas/page_story-areas.html', 																		controller: 'StoryAreasPage'} } },

		// rest api tool
		{state: 'app.api-main', 														url: '/api', 																							views: {'content': {templateUrl: 'app-build/pages/api-project/main/page_main.html', 																		controller: 'APIMainPage'} } },


	]);
