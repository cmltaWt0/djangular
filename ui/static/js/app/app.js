(function () {
    var app = angular.module('djangular', [
        'ngRoute',
        'ngAnimate'
    ]);

    app.config(function ($routeProvider, $interpolateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
    });

    app.run(function($rootScope, $location){
        var domain;
        var match = $location.absUrl().match(/(?:https?:\/\/)?(?:www\.)?(.*?)\//);
        if (match !== null)
            domain = match[1];
        $rootScope.appCfg = {
            apiUrl: 'http://' + domain + '/api/'
        };
    });

    app.controller('MainCtrl', ['$scope', 'dataService', function ($scope, dataService) {
        $scope.messages = [];

        dataService.loadMessages().then(function () {
            $scope.messages = dataService.getData();
        });
    }]);

    app.service('dataService', ['$rootScope', '$http', function ($rootScope, $http) {
        var messages = [];

        this.getData = function () {
            return messages;
        };

        this.setData = function (data) {
            messages = data;
        };

        this.getMessage = function (id) {
            return $.grep(messages, function (e) {
                return e.id = id;
            });
        };

        this.loadMessages = function () {
            return $http({
                url: $rootScope.appCfg.apiUrl + 'messages',
                method: 'GET'
            }).then(function (result) {
                messages = result.data;
            });
        };
    }]);
 
})();
