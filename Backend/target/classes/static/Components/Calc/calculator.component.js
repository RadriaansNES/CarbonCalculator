// calculator.component.js
angular.module('myApp')
    .controller('CalculatorController', CalculatorController);

function CalculatorController($scope, $timeout, $cookies, $http, $state) {

    $scope.currentStep = 0;
    $scope.calculateButtonClicked = false;

    $scope.nextStep = function () {
        if ($scope.currentStep < 7) {
            $scope.currentStep++;
        } else {
            $scope.calculateButtonClicked = true;
            $scope.calculate();
        }
    };

    $scope.prevStep = function () {
        if ($scope.currentStep > 1) {
            $scope.currentStep--;
        }
    };

    $scope.isCurrentStep = function (step) {
        return $scope.currentStep === step;
    };



    // Init
    $scope.vehicleType = 'car';
    $scope.vehicleUsage = null;
    $scope.publicTransportation = null;
    $scope.dietType = 'regular';
    $scope.numPeople = null;
    $scope.waterScarcity = 'normal';
    $scope.showersPerDay = null;
    $scope.flushesPerDay = null;
    $scope.dishesPerDay = null;
    $scope.energySources = [{
        type: 'Hydropower',
        usage: null,
    }];
    $scope.monthlyGarbageBins = null;
    $scope.monthlyRecyclingBins = null;
    $scope.monthlyCompostBins = null;
    $scope.milesFlown = null;
    $scope.milesDriven = null;
    $scope.vehicleTypeVacay = 'car';

    let myChart = null;


    // Factors
    const emissionsFactors = {
        electric: 0,
        car: 0.38,
        van: 0.45,
        truck: 0.7,
    };

    const dietFactors = {
        vegetarian: 75,
        vegan: 45,
        regular: 120,
        meatBased: 150,
    };

    const waterScarcityFactors = {
        normal: 1,
        moderate: 1.5,
        high: 2,
    };

    const waterFactors = {
        showeringFactor: 0.72,
        flushingToiletsFactor: 0.0615,
        washingDishesFactor: 0.04
    };

    const carbonFootprintFactors = {
        'Solar energy': 0.01,
        'Geothermal energy': 0.02,
        'Wind energy': 0.03,
        'Biomass from plants': 0.05,
        'Hydropower': 0.04,
        'Petroleum': 0.2,
        'Hydrocarbons': 0.15,
        'Natural gas': 0.17,
        'Coal': 0.3,
        'Nuclear energy': 0.01,
    };

    const flightEmissionsFactor = 0.24;

    // Function to add an energy source row
    $scope.addEnergySource = function () {
        event.preventDefault();
        $scope.energySources.push({
            type: 'Solar energy',
            usage: 0,
        });
    };

    // Function to remove an energy source row
    $scope.removeEnergySource = function (index) {
        $scope.energySources.splice(index, 1);
    };

    // Function to calculate total carbon emissions
    $scope.calculate = function () {

        const totalVehicleEmissions = ($scope.vehicleUsage) / 12 * emissionsFactors[$scope.vehicleType] + $scope.publicTransportation * 0.054 / 12;
        const totalDietaryEmissions = dietFactors[$scope.dietType];
        const monthlyGarbageBins = $scope.monthlyGarbageBins;
        const monthlyRecyclingBins = $scope.monthlyRecyclingBins;
        const monthlyCompostBins = $scope.monthlyCompostBins;

        // Calculate water emissions (kgCO2e) per month
        const showersPerDay = $scope.showersPerDay * 30 * $scope.numPeople;
        const flushesPerDay = $scope.flushesPerDay * 30 * $scope.numPeople;
        const dishesPerDay = $scope.dishesPerDay * 30 * $scope.numPeople;

        const waterScarcityFactor = waterScarcityFactors[$scope.waterScarcity];

        const totalWaterEmission = (
            (showersPerDay * waterFactors.showeringFactor * waterScarcityFactor +
                flushesPerDay * waterFactors.flushingToiletsFactor * waterScarcityFactor +
                dishesPerDay * waterFactors.washingDishesFactor * waterScarcityFactor)
        );

        // Calculate energy emissions from energy sources and convert to common unit (kgCO2e) per month
        const totalEnergyEmissions = $scope.energySources.reduce(function (sum, source) {
            return sum + (source.usage * carbonFootprintFactors[source.type]);
        }, 0);

        const totalWasteEmissions = (monthlyGarbageBins * 3.5 +
            monthlyRecyclingBins * 2.5 +
            monthlyCompostBins * 0.6);

        const totalFlightEmissions = $scope.milesFlown * flightEmissionsFactor;
        const totalDrivingVacayEmissions = ($scope.milesDriven * emissionsFactors[$scope.vehicleTypeVacay]) / 12;
        const totalVacayEmissions = totalDrivingVacayEmissions + totalFlightEmissions;

        $scope.totalVehicleEmissions = !isNaN(totalVehicleEmissions) ? Math.ceil(totalVehicleEmissions * 100) / 100 : 'N/A';
        $scope.totalDietaryEmissions = !isNaN(totalDietaryEmissions) ? Math.ceil(totalDietaryEmissions * 100) / 100 : 'N/A';
        $scope.totalWaterEmission = !isNaN(totalWaterEmission) ? Math.ceil(totalWaterEmission * 100) / 100 : 'N/A';
        $scope.totalWasteEmissions = !isNaN(totalWasteEmissions) ? Math.ceil(totalWasteEmissions * 100) / 100 : 'N/A';
        $scope.totalEnergyEmissions = !isNaN(totalEnergyEmissions) ? Math.ceil(totalEnergyEmissions * 100) / 100 : 'N/A';
        $scope.totalVacayEmissions = !isNaN(totalVacayEmissions) ? Math.ceil(totalVacayEmissions * 100) / 100 : 'N/A';

        $scope.totalEmissions = totalVehicleEmissions + totalDietaryEmissions + totalWaterEmission + totalWasteEmissions + totalEnergyEmissions + totalVacayEmissions;

        $scope.recommendationsVehicle = [];
        $scope.recommendationsDiet = [];
        $scope.recommendationsWater = [];
        $scope.recommendationsWaste = [];
        $scope.recommendationsEnergy = [];
        $scope.recommendationsVacay = [];
        $scope.recommendationsTotal = [];

        const averageValues = {
            metric1: 383,
            metric2: 120,
            metric3: 83,
            metric4: 166,
            metric5: 26.4,
            metric6: 1215,
        };

        if (totalVehicleEmissions > averageValues.metric1 * 1.5) {
            $scope.recommendationsVehicle.push('You have a relatively high emission rate for your vehicle usage, consider carpooling, using public transportation, or switching to a more fuel-efficient or electric vehicle.');
        } else if (totalVehicleEmissions >= averageValues.metric1) {
            $scope.recommendationsVehicle.push('You have a relatively moderate emission rate for your vehicle usage. Consider optimizing your driving habits to reduce fuel consumption and emissions.');
        } else if (totalVehicleEmissions < averageValues.metric1) {
            $scope.recommendationsVehicle.push('Congratulations on having a low emission rate for your vehicle usage! Keep up the good work by maintaining your eco-friendly driving habits.');
        }

        if ($scope.dietType === 'meatBased') {
            $scope.recommendationsDiet.push('Your diet contributes to higher emission rates, consider reducing your meat consumption or incorporating more plant-based meals into your diet.');
        } else if ($scope.dietType === 'regular') {
            $scope.recommendationsDiet.push('You diet has a typical emission rate. You can further reduce emissions by reducing your meat intake or by choosing more sustainable options.');
        } else if ($scope.dietType === 'vegetarian') {
            $scope.recommendationsDiet.push('Your diet has a moderate emission rate. You can further reduce emissions by choosing more locally sourced and sustainable vegetarian options or by going vegan.');
        } else if ($scope.dietType === 'vegan') {
            $scope.recommendationsDiet.push('Having a low emission rate for your diet is great! Continue to embrace a vegan diet to minimize your carbon footprint.');
        }

        if (totalWaterEmission > averageValues.metric3 * 1.5) {
            $scope.recommendationsWater.push('Your water-related emissions are considered high. To reduce them, consider fixing any leaks, installing water-saving appliances, and being mindful of water usage in your daily routines.');
        } else if (totalWaterEmission >= averageValues.metric3) {
            $scope.recommendationsWater.push('Your water-related emissions are at a moderate level. Continue practicing water-saving habits, such as shorter showers and efficient water use.');
        } else if (totalWaterEmission < averageValues.metric3) {
            $scope.recommendationsWater.push('Congratulations on having relatively low water-related emissions! Keep practicing water-saving behaviors to maintain your eco-friendly water footprint.');
        }

        if (totalEnergyEmissions > averageValues.metric4 * 1.5) {
            $scope.recommendationsEnergy.push('Your energy-related emissions are high, consider improving your home\'s energy efficiency, using energy-saving appliances, and transitioning to renewable energy sources.');
        } else if (totalEnergyEmissions >= averageValues.metric4) {
            $scope.recommendationsEnergy.push('Your energy-related emissions are at a moderate level. To further reduce them, consider adding solar panels, insulating your home, and adopting energy-efficient technologies.');
        } else if (totalEnergyEmissions < averageValues.metric4) {
            $scope.recommendationsEnergy.push('Congratulations on having low energy-related emissions! Continue to use energy-efficient practices and maintain your use of clean energy sources.');
        }


        if (totalWasteEmissions > averageValues.metric5 * 1.5) {
            $scope.recommendationsWaste.push('Your waste-related emissions are considered high. To reduce them, focus on recycling more, minimizing single-use plastics, and composting organic waste.');
        } else if (totalWasteEmissions >= averageValues.metric5) {
            $scope.recommendationsWaste.push('Your waste-related emissions are at a moderate level. Keep recycling and composting, and consider reducing waste through sustainable shopping and packaging choices.');
        } else if (totalWasteEmissions < averageValues.metric5) {
            $scope.recommendationsWaste.push('Weoheooo! You have low waste-related emissions. Continue your eco-conscious waste management practices and explore ways to further reduce waste.');
        }

        if (totalVacayEmissions > averageValues.metric6 * 1.5) {
            $scope.recommendationsVacay.push('Your vacation-related emissions are considered high. To reduce them, choose destinations closer to home, consider eco-friendly transportation options, and support accommodations with sustainable practices.');
        } else if (totalVacayEmissions >= averageValues.metric6) {
            $scope.recommendationsVacay.push('Your vacation-related emissions are at a moderate level. Keep making sustainable travel choices, such as offsetting emissions and minimizing air travel.');
        } else if (totalVacayEmissions < averageValues.metric6) {
            $scope.recommendationsVacay.push('Most excellent! You have low vacation-related emissions. Continue to make eco-conscious travel decisions and explore local and sustainable travel options.');
        }

        const userMetrics = [
            totalVehicleEmissions,
            totalDietaryEmissions,
            totalWaterEmission,
            totalEnergyEmissions,
            totalWasteEmissions,
            totalVacayEmissions,
        ];

        const metricLabels = [
            'Vehicle Emissions',
            'Dietary Emissions',
            'Water Emission',
            'Energy Emissions',
            'Waste Emissions',
            'Vacation Emissions',
        ];

        function createOrUpdateRadarChart() {
            const factors = userMetrics.map((userValue, index) =>
                userValue / averageValues[`metric${index + 1}`]
            );

            const maxFactor = Math.max(...factors);
            const maxScaleValue = Math.max(maxFactor, 1);

            const ctx = document.getElementById('metricsChart').getContext('2d');

            if (myChart === null) {
                // Create the chart instance if it doesn't exist
                myChart = new Chart(ctx, {
                    type: 'radar',
                    data: {
                        labels: metricLabels,
                        datasets: [
                            {
                                label: 'Average Individual Carbon Emission',
                                data: Array(userMetrics.length).fill(1),
                                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                borderColor: 'rgba(0, 0, 0, 1)',
                                pointBackgroundColor: 'rgba(0, 0, 0, 1)',
                            },
                            {
                                label: 'Factor of User\'s Emissions Over Average',
                                data: factors,
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                            },
                        ],
                    },
                    options: {
                        scales: {
                            r: {
                                beginAtZero: true,
                                max: maxScaleValue,
                            },
                        },
                    },
                });
            } else {
                // Update the chart data if it already exists
                myChart.data.datasets[0].data = factors;
                myChart.update();
            }
        }

        $timeout(function () {
            createOrUpdateRadarChart();
        });
    }

    $scope.reloadPage = function () {
        window.location.reload();
    };

    $scope.postFootprint = function () {
        var username = $cookies.get('username');


        var totalVehicleEmissions = 0;
        var totalDietaryEmissions = 0;
        var totalWaterEmission = 0;
        var totalEnergyEmissions = 0;
        var totalWasteEmissions = 0;
        var totalVacayEmissions = 0;
        var totalEmissions = 0;

        totalVehicleEmissions = $scope.totalVehicleEmissions;
        totalDietaryEmissions = $scope.totalDietaryEmissions;
        totalWaterEmission = $scope.totalWaterEmission;
        totalEnergyEmissions = $scope.totalEnergyEmissions;
        totalWasteEmissions = $scope.totalWasteEmissions;
        totalVacayEmissions = $scope.totalVacayEmissions;
        totalEmissions = $scope.totalEmissions;

        if (
            totalVehicleEmissions !== 0 &&
            totalDietaryEmissions !== 0 &&
            totalWaterEmission !== 0 &&
            totalEnergyEmissions !== 0 &&
            totalWasteEmissions !== 0 &&
            totalVacayEmissions !== 0
        ) {
            if (username) {
                $http.get('/users/getUserIdByUsername', { params: { username: username } })
                    .then(function (response) {
                        var userId = response.data.userId;

                        var carbonFootprintDTO = {
                            userId: userId,
                            totalVehicleEmissions: totalVehicleEmissions,
                            totalDietaryEmissions: totalDietaryEmissions,
                            totalWaterEmission: totalWaterEmission,
                            totalEnergyEmissions: totalEnergyEmissions,
                            totalWasteEmissions: totalWasteEmissions,
                            totalVacayEmissions: totalVacayEmissions,
                            totalEmissions: totalEmissions,
                            calculationDate: new Date()
                        };

                        $http.post('/carbon-footprints/create', carbonFootprintDTO)
                            .then(function (response) {
                                console.log('Carbon footprint saved:', response.data);
                                $scope.sucPost = true;
                                $timeout(function () {
                                    $state.go('layout.dashboard');
                                }, 3000);
                            })
                            .catch(function (error) {
                                console.error('Error saving carbon footprint:', error);
                            });
                    })
                    .catch(function (error) {
                        console.error('Error getting userId:', error);
                    });
            } else {
                $state.go('layout.login');
            }
        } else {
            $scope.MetricsWarning = true;
        }

    }
}