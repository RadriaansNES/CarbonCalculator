// social.component.js

angular.module('myApp')
  .controller('SocialController', SocialController);

function SocialController($scope, CarbonFootprintService, $timeout, $cookies, $state) {
  $scope.bestFootprints = [];
  $scope.recentFootprints = [];
  $scope.newCommentText = '';

  CarbonFootprintService.getBestFootprintsThisMonth().then(function (bestFootprints) {
    $scope.bestFootprints = bestFootprints;

    angular.forEach($scope.bestFootprints, function (bestFootprint, index) {
      CarbonFootprintService.getCommentsForFootprint(bestFootprint.id).then(function (comments) {
        bestFootprint.comments = comments.sort(function (a, b) {
          return new Date(a.commentDate) - new Date(b.commentDate);
        });
      });
    });

    CarbonFootprintService.getRecentFootprints().then(function (recentFootprints) {
      $scope.recentFootprints = recentFootprints;

      angular.forEach($scope.recentFootprints, function (recentFootprint, index) {
        CarbonFootprintService.getCommentsForFootprint(recentFootprint.id).then(function (comments) {
          recentFootprint.comments = comments.sort(function (a, b) {
            return new Date(a.commentDate) - new Date(b.commentDate);
          });
        });
      });

      $timeout(function () {
        createOrUpdateGraphsForBestFootprints();
        createOrUpdateGraphsForRecentFootprints();
      });
    });
  });
  $scope.postComment = function (footprintId, newCommentText) {
    if (!footprintId || !newCommentText) {
      console.log('Invalid footprintId or newCommentText');
      return;
    }

    var username = $cookies.get('username');

    if (username) {
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
    } else {
      $state.go('layout.login');
    }
  };

  function createOrUpdateGraphsForRecentFootprints() {
    angular.forEach($scope.recentFootprints, function (footprint, index) {
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

      const ctx2 = document.getElementById(`recentFootprintsChart${index}`);

      if (!ctx2) {
        // Handle the case where the canvas element doesn't exist
        console.error(`Canvas element not found: recentFootprintsChart${index}`);
        return;
      }

      const myChart2 = new Chart(ctx2, {
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
    });
  }

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

      const ctx = document.getElementById(`bestFootprintsChart${index}`);

      if (!ctx) {
        // Handle the case where the canvas element doesn't exist
        console.error(`Canvas element not found: bestFootprintsChart${index}`);
        return;
      }

      const myChart = new Chart(ctx, {
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
    });
  }
}