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

    this.getCommentsForFootprint = function (footprintId) {
        var url = '/comments/footprint/' + footprintId;
        return $http.get(url)
            .then(function (response) {
                return response.data;
            });
    };

    this.postComment = function (footprintId, commentText, userId) {
        var url = '/comments/create';
        var data = {
            carbonFootprintId: footprintId,
            userId: userId,
            commentText: commentText
        };
        return $http.post(url, data)
            .then(function (response) {
                return response.data;
            });
    };


    this.getUserIdByUsername = function (username) {
        var url = '/users/getUserIdByUsername?username=' + username;
        return $http.get(url)
            .then(function (response) {
                return response.data.userId;
            });
    };
});