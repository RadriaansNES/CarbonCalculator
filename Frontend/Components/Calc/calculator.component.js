// calculator.component.js
angular.module('myApp')
    .controller('CalculatorController', CalculatorController);

function CalculatorController($scope) {

    // Init
    $scope.vehicleType = 'car';
    $scope.vehicleUsage = 0;
    $scope.publicTransportation = 0;
    $scope.dietType = 'meatBased';
    $scope.numPeople = 0;
    $scope.waterScarcity = 'low';
    $scope.showersPerDay = 0;
    $scope.flushesPerDay = 0;
    $scope.dishesPerDay = 0;
    $scope.energySources = [{
        type: 'Solar energy',
        usage: 0,
    }];
    $scope.monthlyGarbageBins = 0;
    $scope.monthlyRecyclingBins = 0;
    $scope.monthlyCompostBins = 0;
    $scope.milesFlown = 0;
    $scope.milesDriven = 0;
    $scope.vehicleTypeVacay = 'car';

    // Factors
    const emissionsFactors = {
        car: 0.42,
        van: 0.6,
        truck: 1.0,
    };

    const dietFactors = {
        vegetarian: 2.89,
        vegan: 1.5,
        meatBased: 7.19,
    };

    const waterScarcityFactors = {
        low: 0.2,
        moderate: 0.5,
        high: 0.8,
    };

    const waterFactors = {
        showeringFactor: 0.02, // kgCO2e per liter
        flushingToiletsFactor: 0.01,
        washingDishesFactor: 0.015
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

    const binFactors = {
        garbage: 0.5,
        recycling: 0.2,
        compost: 0.1
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
        const totalVehicleEmissions = ($scope.vehicleUsage) / 12 * emissionsFactors[$scope.vehicleType];
        const totalDietaryEmissions = dietFactors[$scope.dietType] / 12;
        const monthlyGarbageBins = $scope.monthlyGarbageBins;
        const monthlyRecyclingBins = $scope.monthlyRecyclingBins;
        const monthlyCompostBins = $scope.monthlyCompostBins;

        // Calculate water emissions (kgCO2e) per month
        const showersPerYear = $scope.showersPerDay * 30 * $scope.numPeople;
        const flushesPerYear = $scope.flushesPerDay * 30 * $scope.numPeople;
        const dishesPerYear = $scope.dishesPerDay * 30 * $scope.numPeople;

        const waterScarcityFactor = waterScarcityFactors[$scope.waterScarcity];

        const totalWaterEmission = (
            (showersPerYear * waterScarcityFactor * waterFactors.showeringFactor +
                flushesPerYear * waterScarcityFactor * waterFactors.flushingToiletsFactor +
                dishesPerYear * waterScarcityFactor * waterFactors.washingDishesFactor) /
            1000 // Convert to kgCO2e
        );

        // Calculate energy emissions from energy sources and convert to common unit (kgCO2e) per month
        const totalEnergyEmissions = $scope.energySources.reduce(function (sum, source) {
            return sum + (source.usage * carbonFootprintFactors[source.type]);
        }, 0);

        const totalWasteEmissions = (monthlyGarbageBins * binFactors.garbage +
            monthlyRecyclingBins * binFactors.recycling +
            monthlyCompostBins * binFactors.compost);

        const totalFlightEmissions = $scope.milesFlown * flightEmissionsFactor;
        const totalDrivingVacayEmissions = ($scope.milesDriven * emissionsFactors[$scope.vehicleTypeVacay]) / 12;
        const totalVacayEmissions = totalDrivingVacayEmissions + totalFlightEmissions;

        const totalEmissions = totalVehicleEmissions + totalDietaryEmissions + totalWaterEmission + totalEnergyEmissions + totalWasteEmissions + totalFlightEmissions + totalDrivingVacayEmissions;

        $scope.totalVehicleEmissions = !isNaN(totalVehicleEmissions) ? Math.ceil(totalVehicleEmissions * 100) / 100 : 'N/A';
        $scope.totalDietaryEmissions = !isNaN(totalDietaryEmissions) ? Math.ceil(totalDietaryEmissions * 100) / 100 : 'N/A';
        $scope.totalWaterEmission = !isNaN(totalWaterEmission) ? Math.ceil(totalWaterEmission * 100) / 100 : 'N/A';
        $scope.totalWasteEmissions = !isNaN(totalWasteEmissions) ? Math.ceil(totalWasteEmissions * 100) / 100 : 'N/A';
        $scope.totalEnergyEmissions = !isNaN(totalEnergyEmissions) ? Math.ceil(totalEnergyEmissions * 100) / 100 : 'N/A';
        $scope.totalVacayEmissions = !isNaN(totalVacayEmissions) ? Math.ceil(totalVacayEmissions * 100) / 100 : 'N/A';


        // Provide recommendations based on emissions
        $scope.recommendationsVehicle = [];
        $scope.recommendationsDiet = [];
        $scope.recommendationsWater = [];
        $scope.recommendationsWaste = [];
        $scope.recommendationsEnergy = [];
        $scope.recommendationsVacay = [];
        $scope.recommendationsTotal = [];

        if (totalVehicleEmissions > 5) {
            $scope.recommendationsVehicle.push('You have a relatively high emission rate for your vehicle usage, consider carpooling, using public transportation, or switching to a more fuel-efficient or electric vehicle.');
        } else if (totalVehicleEmissions >= 2) {
            $scope.recommendationsVehicle.push('You have a relatively moderate emission rate for your vehicle usage. Consider optimizing your driving habits to reduce fuel consumption and emissions.');
        } else if (totalVehicleEmissions < 2) {
            $scope.recommendationsVehicle.push('Congratulations on having a low emission rate for your vehicle usage! Keep up the good work by maintaining your eco-friendly driving habits.');
        }

        if ($scope.dietType === 'meatBased') {
            $scope.recommendationsDiet.push('Your diet contributes to higher emission rates, consider reducing your meat consumption or incorporating more plant-based meals into your diet.');
        } else if ($scope.dietType === 'vegetarian') {
            $scope.recommendationsDiet.push('Your diet has a moderate emission rate. You can further reduce emissions by choosing more locally sourced and sustainable vegetarian options.');
        } else if ($scope.dietType === 'vegan') {
            $scope.recommendationsDiet.push('Having a low emission rate for your diet is great! Continue to embrace a vegan diet to minimize your carbon footprint.');
        }

        if (totalWaterEmission > 2) {
            $scope.recommendationsWater.push('Your water-related emissions are considered high. To reduce them, consider fixing any leaks, installing water-saving appliances, and being mindful of water usage in your daily routines.');
        } else if (totalWaterEmission >= 1) {
            $scope.recommendationsWater.push('Your water-related emissions are at a moderate level. Continue practicing water-saving habits, such as shorter showers and efficient water use.');
        } else if (totalWaterEmission < 1) {
            $scope.recommendationsWater.push('Congratulations on having relatively low water-related emissions! Keep practicing water-saving behaviors to maintain your eco-friendly water footprint.');
        }

        if (totalWasteEmissions > 1) {
            $scope.recommendationsWaste.push('Your waste-related emissions are considered high. To reduce them, focus on recycling more, minimizing single-use plastics, and composting organic waste.');
        } else if (totalWasteEmissions >= 0.5) {
            $scope.recommendationsWaste.push('Your waste-related emissions are at a moderate level. Keep recycling and composting, and consider reducing waste through sustainable shopping and packaging choices.');
        } else if (totalWasteEmissions < 0.5) {
            $scope.recommendationsWaste.push('You have relatively low waste-related emissions. Continue your eco-conscious waste management practices and explore ways to further reduce waste.');
        }

        if (totalEnergyEmissions > 8) {
            $scope.recommendationsEnergy.push('Your energy-related emissions are high, consider improving your home\'s energy efficiency, using energy-saving appliances, and transitioning to renewable energy sources.');
        } else if (totalEnergyEmissions >= 4) {
            $scope.recommendationsEnergy.push('Your energy-related emissions are at a moderate level. To further reduce them, consider adding solar panels, insulating your home, and adopting energy-efficient technologies.');
        } else if (totalEnergyEmissions < 4) {
            $scope.recommendationsEnergy.push('Congratulations on having low energy-related emissions! Continue to use energy-efficient practices and maintain your use of clean energy sources.');
        }

        if (totalVacayEmissions > 4) {
            $scope.recommendationsVacay.push('Your vacation-related emissions are considered high. To reduce them, choose destinations closer to home, consider eco-friendly transportation options, and support accommodations with sustainable practices.');
        } else if (totalVacayEmissions >= 2) {
            $scope.recommendationsVacay.push('Your vacation-related emissions are at a moderate level. Keep making sustainable travel choices, such as offsetting emissions and minimizing air travel.');
        } else if (totalVacayEmissions < 2) {
            $scope.recommendationsVacay.push('You have relatively low vacation-related emissions. Continue to make eco-conscious travel decisions and explore local and sustainable travel options.');
        }

        const userMetrics = [
            totalVehicleEmissions,
            totalDietaryEmissions,
            totalWaterEmission,
            totalWasteEmissions,
            totalEnergyEmissions,
            totalVacayEmissions,
        ];


        const averageValues = {
            metric1: 350,
            metric2: 0.8,
            metric3: 0.02,
            metric4: 0.03,
            metric5: 0.6,
            metric6: 0.05,
        };

        const metricLabels = [
            'Vehicle Emissions',
            'Dietary Emissions',
            'Water Emission',
            'Waste Emissions',
            'Energy Emissions',
            'Vacation Emissions',
        ];

        function createOrUpdateRadarChart() {

            const factors = userMetrics.map((userValue, index) =>
                userValue / averageValues[`metric${index + 1}`]
            );

            const maxFactor = Math.max(...factors);
            const maxScaleValue = Math.max(maxFactor, 1);

            // Get the canvas element
            const ctx = document.getElementById('metricsChart').getContext('2d');

            // Check if a chart instance already exists
            if (window.myChart) {
          
                window.myChart.destroy();
            }

            window.myChart = new Chart(ctx, {
                type: 'radar',
                data: {
                    labels: metricLabels,
                    datasets: [
                        {
                            label: 'User Metrics',
                            data: factors,
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
                        },
                        {
                            label: 'Average Metrics',
                            data: Array(userMetrics.length).fill(1),
                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                            borderColor: 'rgba(0, 0, 0, 1)',
                            pointBackgroundColor: 'rgba(0, 0, 0, 1)',
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
        }

        // Create the initial chart
        createOrUpdateRadarChart();
    }
}