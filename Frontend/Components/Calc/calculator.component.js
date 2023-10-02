// calculator.component.js
angular.module('myApp')
    .controller('CalculatorController', CalculatorController);

function CalculatorController($scope) {
    
    // Init
    $scope.vehicleType = 'car'; 
    $scope.vehicleUsage = 0;
    $scope.publicTransportation = 0;
    $scope.dietType = 'vegetarian';
    $scope.numPeople = 1;
    $scope.waterScarcity = 'low'; 
    $scope.showersPerDay = 1;
    $scope.flushesPerDay = 4;
    $scope.dishesPerDay = 1;
    $scope.energySources = '';
    $scope.livingSpaceSize = 0;
    $scope.applianceEfficiency = '';

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
    const showeringFactor = 20; 
    const flushingToiletsFactor = 1.6;
    const washingDishesFactor = 5;
    const energyConsumptionFactor = 12; 

    // Function to calculate total carbon emissions
    $scope.calculate = function () {
        const vehicleEmissions = ($scope.vehicleUsage) * emissionsFactors[$scope.vehicleType];
        const dietaryEmissions = dietFactors[$scope.dietType];

        // Calculate total emissions
        const totalEmissions = vehicleEmissions + dietaryEmissions;

        // Calculate total water usage
        const totalWaterUsage = (
            ($scope.showersPerDay * showeringFactor +
                $scope.flushesPerDay * flushingToiletsFactor +
                $scope.dishesPerDay * washingDishesFactor) *
            365 * $scope.numPeople
        );

        // Calculate total energy consumption
        const totalEnergyConsumption = ($scope.livingSpaceSize) * energyConsumptionFactor;

        $scope.totalEmissions = totalEmissions.toFixed(2); 
        $scope.totalWaterUsage = totalWaterUsage.toFixed(2); 
        $scope.totalEnergyConsumption = totalEnergyConsumption.toFixed(2); 

        // Provide recommendations based on emissions
        $scope.recommendations = [];
        if (totalEmissions > 100) {
             
        }
    };
}