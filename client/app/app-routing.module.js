app.config([
    '$urlRouterProvider',
    '$stateProvider',
    '$locationProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider) {
        $urlRouterProvider.otherwise('calendar');

        $stateProvider
            .state('calendar', {
                url: '/calendar',
                templateUrl: '/app/calendar/calendar.component.html',
                controller: 'CalendarCtrl'
            })
            .state('items', {
                url: '/items',
                templateUrl: '/app/items/items.component.html',
                controller: 'ItemsCtrl'
            });
            
        $locationProvider.html5Mode(true);
    }
]);