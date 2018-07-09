angular.module("HomeCtrl", ["cp.ngConfirm"]).controller("HomeController", ["$scope", "$ngConfirm", "AuthService", "AccountService", function ($scope, $ngConfirm, AuthService, AccountService) {
    $scope.isLoggedIn = false
    $scope.student = true
    
    $scope.changePasswordData = {
        oldPassword: "",
        nPassword: "",
        nPassword2: ""
    }
    
    AuthService.isLoggedIn(function (res) {
        if (res.logged) {
            $scope.isLoggedIn = true
            AccountService.getUserInfo(function (res) {
                $scope.userName = res.name
                $scope.student = (res.student) ? res : false
                $scope.admin = (res.level == 0) ? true : false
                $scope.isStudentOrTeacher = (res.student) ? "Alumno" : "Docente"
                $scope.isStudentOrTeacher = (res.level == 0) ? "Administrador" : $scope.isStudentOrTeacher
                $scope.email = res.email
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