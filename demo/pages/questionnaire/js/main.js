var app = angular.module('myApp', ['ngRoute']);
app.controller('mainController', function ($scope, $rootScope) {
    $rootScope.dataOld = {
        paper1: {
            title: "第一份问卷",
            time: "2016-08-18T20:07:49Z",
            status: "1"
        },
        paper2: {
            title: "第二份问卷",
            time: "2016-08-18T21:37:56Z",
            status: "2"
        },
        paper3: {
            title: "第三份问卷",
            time: "2016-08-18T22:34:17Z",
            status: "3"
        }
    };
    $rootScope.data = $rootScope.dataOld;
});
app.controller('welcomeController', function ($scope) {
});
app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider
            .when('/', {
            templateUrl: 'view/home.html',
            controller: 'HomeController'
        })
            .when('/', {
            templateUrl: 'view/home.html',
            controller: 'HomeController'
        })
            .otherwise({
            redirectTo: '/'
        });
    }]);
