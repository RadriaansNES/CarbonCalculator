angular.module('myApp').controller('SignupController', SignupController);

function SignupController($scope, $http, $state, $timeout) {
    $scope.user = {};
    $scope.badPassword = false;
    $scope.registrationSuccess = false;
    $scope.badReg = false;
    $scope.noMatch = false;

    function passwordCheck() {
        const password = $scope.user.password;
        const hasValidLength = password.length >= 7;
        const hasDigit = /\d/.test(password);
        $scope.badPassword = !hasValidLength || !hasDigit;
        $scope.noMatch = $scope.user.password !== $scope.user.password2;
    }

    $scope.submitForm = function () {
        passwordCheck();

        if ($scope.badPassword || $scope.noMatch) {
            console.log('Password does not meet criteria. Form not submitted.');
            return;
        }

        $http.post('/users/create', $scope.user)
            .then(function (response) {
                console.log('User registered successfully:', response.data.message);
                $scope.registrationSuccess = true;
                $timeout(function () {
                    $state.go('layout.login');
                }, 3000);
            })
            .catch(function (error) {
                console.error('Error registering user:', error);
                $scope.badReg = true;
                $timeout(function () {
                    $state.go('layout.home');
                }, 3000);
            });
    };
}
