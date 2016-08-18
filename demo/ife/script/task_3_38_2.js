var app = angular.module('myApp', []);
app.controller('sortTable', function($scope) {
    $scope.names = [{
        name: '小明',
        chinese: 89,
        math: 90,
        english: 93
    }, {
        name: '小红',
        chinese: 67,
        math: 87,
        english: 85
    }, {
        name: '小亮',
        chinese: 78,
        math: 79,
        english: 96
    }];
    $scope.reverse = false;
    //求总分
    (function getCount() {
        for (let i = 0; i < $scope.names.length; i++) {
            $scope.names[i].count = $scope.names[i].chinese + $scope.names[i].math + $scope.names[i].english;
        }
    })()
    $scope.orderByMe = function(x) {
        $scope.reverse = !$scope.reverse;
        $scope.myOrderBy = x;
    }
})