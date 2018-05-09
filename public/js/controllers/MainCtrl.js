angular.module("MainCtrl", []).controller("MainController", ["$scope", "$location", "AuthService", "AccountService", function ($scope, $location, AuthService, AccountService) {
    $scope.isLoggedIn = false
    $scope.student = true
    
    AuthService.isLoggedIn(function (res) {
        if (res.logged) {
            $scope.isLoggedIn = true
            AccountService.getUserInfo(function (res) {
                $scope.student = (res.student) ? res : false
                $scope.admin = (res.level == 0) ? true : false
            })
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