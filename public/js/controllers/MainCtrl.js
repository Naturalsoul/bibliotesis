angular.module("MainCtrl", []).controller("MainController", ["$scope", "$location", "AuthService", function ($scope, $location, AuthService) {
    $scope.isLoggedIn = false
    
    AuthService.isLoggedIn(function (res) {
        if (res.logged) {
            $scope.isLoggedIn = true
        } else {
            $scope.isLoggedIn = false
        }
    })
    
    $scope.logout = function () {
        AuthService.logout(function (res) {
            if (!res.logged) {
                window.location.replace("/")
            }
        })
    }
}])