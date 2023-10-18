// dashboard.component.js

angular.module('myApp')
  .controller('DashboardController', DashboardController);

function DashboardController($scope, $cookies, CarbonFootprintService, $timeout) {
  $scope.username = $cookies.get('username');

  // Fetch the last three footprints
  CarbonFootprintService.getLastThreeFootprintsByUsername($scope.username).then(function (response) {
    $scope.lastThreeFootprints = response.data;

    // Create bar charts for the last three footprints
    $timeout(function () {
      createOrUpdateBarCharts();
    });

  });

  // Fetch and display data for the lowest carbon footprint
  CarbonFootprintService.getLowestEmissionByUsername($scope.username).then(function (response) {
    $scope.lowestCarbonFootprint = response.data;

    if ($scope.lowestCarbonFootprint.totalEmissions > 1993 * 1.25) {
      $scope.emissionMessageProfile = 'Your carbon footprint is relatively high, indicating potential for improvement. Consider adopting practices to reduce your carbon emissions.';
    } else if ($scope.lowestCarbonFootprint.totalEmissions >= 1993 * 0.75) {
      $scope.emissionMessageProfile = 'Your carbon footprint is close to the average, which is commendable. Continue your efforts to minimize carbon emissions for a sustainable future.';
    } else {
      $scope.emissionMessageProfile = 'Your carbon footprint is remarkably low! Congratulations on your outstanding efforts to reduce carbon emissions. Keep up the excellent work!';
    }

    $timeout(function () {
      createOrUpdateLowestCarbonFootprintBarChart();
    });

  });

  function createOrUpdateBarCharts() {
    // Iterate over the last three footprints and create/update bar charts for each
    $scope.lastThreeFootprints.forEach(function (footprint, index) {
      const userMetrics = [
        footprint.totalVehicleEmissions,
        footprint.totalDietaryEmissions,
        footprint.totalWaterEmission,
        footprint.totalEnergyEmissions,
        footprint.totalWasteEmissions,
        footprint.totalVacayEmissions
      ];

      const metricLabels = [
        'Vehicle Emissions',
        'Dietary Emissions',
        'Water Emission',
        'Energy Emissions',
        'Waste Emissions',
        'Vacation Emissions'
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

      const ctx = document.getElementById(`footprintChart${index}`).getContext('2d');

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

  function createOrUpdateLowestCarbonFootprintBarChart() {
    let myChart;

    const userMetrics = [
      $scope.lowestCarbonFootprint.totalVehicleEmissions,
      $scope.lowestCarbonFootprint.totalDietaryEmissions,
      $scope.lowestCarbonFootprint.totalWaterEmission,
      $scope.lowestCarbonFootprint.totalEnergyEmissions,
      $scope.lowestCarbonFootprint.totalWasteEmissions,
      $scope.lowestCarbonFootprint.totalVacayEmissions
    ];

    const metricLabels = [
      'Vehicle Emissions',
      'Dietary Emissions',
      'Water Emission',
      'Energy Emissions',
      'Waste Emissions',
      'Vacation Emissions'
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


    const ctx = document.getElementById('lowestEmissionChart').getContext('2d');

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
              display: false, //Hide the legend
            },
          },
        }
      });
    } else {
      myChart.data.labels = labels;
      myChart.data.datasets[0].data = data;
      myChart.update();
    }
  }
}

