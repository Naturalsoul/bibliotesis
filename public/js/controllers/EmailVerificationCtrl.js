angular.module("EmailVerificationCtrl", []).controller("EmailVerificationController", ["$scope", "$location", "$routeParams", "$ngConfirm", "AuthService", function ($scope, $location, $routeParams, $ngConfirm, AuthService) {
    $scope.userData = {
        email: $routeParams.email,
        hash: $routeParams.hash
    }
    
    $scope.verificationStatus = "No Verificado. Ha ocurrido un problema al verificar tu cuenta. Por favor, ponte en contacto con el equipo de Bibliotesis para resolver dudas."

    AuthService.verificateEmail($scope.userData, function (res) {
        if (res.message) {
            $scope.verificationStatus = res.message
        }
        
        $ngConfirm({
            theme: "bootstrap",
            animation: "zoom",
            closeAnimation: "zoom",
            title: "Estado de cuenta",
            content: $scope.verificationStatus,
            scope: $scope,
            buttons: {
                entendido: {
                    text: "Entendido",
                    btnClass: "btn-primary",
                    action: function () {
                        window.location.replace("/login")
                    }
                }
            }
        })
        
        setTimeout(function () {
            window.location.replace("/login")
        }, 10000)
    })
}])