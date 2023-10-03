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
        'Hydrocarbon gas liquids': 0.15,
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
        const totalVehicleEmissions = ($scope.vehicleUsage) * emissionsFactors[$scope.vehicleType] / 12;  //per month
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

        const totalEmissions = totalVehicleEmissions + totalDietaryEmissions + totalWaterEmission + totalEnergyEmissions + totalWasteEmissions +totalFlightEmissions +totalDrivingVacayEmissions;

        $scope.totalVehicleEmissions = !isNaN(totalVehicleEmissions) ? totalVehicleEmissions.toFixed(2) : 'N/A';
        $scope.totalDietaryEmissions = !isNaN(totalDietaryEmissions) ? totalDietaryEmissions.toFixed(2) : 'N/A';
        $scope.totalWaterEmission = !isNaN(totalWaterEmission) ? totalWaterEmission.toFixed(2) : 'N/A';
        $scope.totalWasteEmissions = !isNaN(totalWasteEmissions) ? totalWasteEmissions.toFixed(2) : 'N/A';
        $scope.totalEnergyEmissions = !isNaN(totalEnergyEmissions) ? totalEnergyEmissions.toFixed(2) : 'N/A';
        $scope.totalVacayEmissions = !isNaN(totalVacayEmissions) ? totalVacayEmissions.toFixed(2) : 'N/A';

        // Provide recommendations based on emissions
        $scope.recommendations = [];
        if (totalEmissions > 100) {
            $scope.recommendations.push('Consider carpooling or using public transportation.');
        }
        // More recommendations 
    };
}
