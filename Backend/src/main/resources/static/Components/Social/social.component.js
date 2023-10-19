// social.component.js

angular.module('myApp')
  .controller('SocialController', SocialController);

function SocialController($scope, CarbonFootprintService, $timeout, $cookies) {
  $scope.bestFootprints = [];
  $scope.newCommentText = '';

  CarbonFootprintService.getBestFootprintsThisMonth().then(function (bestFootprints) {
    $scope.bestFootprints = bestFootprints;

    angular.forEach($scope.bestFootprints, function (footprint, index) {
      CarbonFootprintService.getCommentsForFootprint(footprint.id).then(function (comments) {
        footprint.comments = comments.sort(function (a, b) {
          return new Date(a.commentDate) - new Date(b.commentDate);
        });
      });
    });

    $timeout(function () {
      createOrUpdateGraphsForBestFootprints();
    });
  });

  $scope.postComment = function (footprintId, newCommentText) {

    if (!footprintId || !newCommentText) {
      console.log('Invalid footprintId or newCommentText');
      return;
    }

    var username = $cookies.get('username');

    CarbonFootprintService.getUserIdByUsername(username).then(function (userId) {

      CarbonFootprintService.postComment(footprintId, newCommentText, userId).then(function (comment) {

        angular.forEach($scope.bestFootprints, function (footprint) {
          if (footprint.id === footprintId) {
            if (!footprint.comments) {
              footprint.comments = [];
            }
            footprint.comments.push(comment);
          }
        });

        $scope.newCommentText = '';
      });
    });
  };



  function createOrUpdateGraphsForBestFootprints() {

    angular.forEach($scope.bestFootprints, function (footprint, index) {
      const userMetrics = [
        footprint.totalVehicleEmissions,
        footprint.totalDietaryEmissions,
        footprint.totalWaterEmission,
        footprint.totalEnergyEmissions,
        footprint.totalWasteEmissions,
        footprint.totalVacayEmissions
      ];

      const averageValues = {
        metric1: 383,
        metric2: 120,
        metric3: 83,
        metric4: 166,
        metric5: 26.4,
        metric6: 1215,
      };

      const averageMetrics = userMetrics.map((userValue, index) =>
        userValue / averageValues[`metric${index + 1}`]
      );

      const metricLabels = [
        'Vehicle Emissions',
        'Dietary Emissions',
        'Water Emission',
        'Energy Emissions',
        'Waste Emissions',
        'Vacation Emissions'
      ];

      const backgroundColors = [
        'rgba(255, 99, 132, 0.7)',
        'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)',
        'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)',
        'rgba(255, 159, 64, 0.7)'
      ];

      const labels = metricLabels;
      const data = averageMetrics;

      const ctx = document.getElementById(`bestFootprintsChart${index}`).getContext('2d');

      let myChart;

      if (!myChart) {
        myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              backgroundColor: backgroundColors,
              borderWidth: 1,
              label: '',
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            },
            plugins: {
              legend: {
                display: false, // Hide the legend
              },
            },
          }
        });
      } else {
        myChart.data.labels = labels;
        myChart.data.datasets[0].data = data;
        myChart.update();
      }
    });
  }
}