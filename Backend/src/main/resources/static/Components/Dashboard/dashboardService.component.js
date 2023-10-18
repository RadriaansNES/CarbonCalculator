// dashboardService.component.js

angular.module('myApp').service('CarbonFootprintService', function($http) {
    
    this.getLowestEmissionByUsername = function(username) {
        var url = '/carbon-footprints/lowest-emission/' + username;
        return $http.get(url);
    };
});