// dashboardService.component.js

angular.module('myApp').service('CarbonFootprintService', function ($http) {

    this.getLowestEmissionByUsername = function (username) {
        var url = '/carbon-footprints/lowest-emission/' + username;
        return $http.get(url);
    };

    this.getLastThreeFootprintsByUsername = function (username) {
        var url = '/carbon-footprints/last-three-footprints/' + username;
        return $http.get(url);
    };

    this.getBestFootprintsThisMonth = function () {
        return $http.get('/carbon-footprints/best-footprints-this-month')
            .then(function (response) {
                return response.data;
            });
    };
});