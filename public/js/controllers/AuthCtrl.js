angular.module("AuthCtrl", ["cp.ngConfirm"]).controller("AuthController", ["$scope", "$ngConfirm", "$location", "AuthService", function ($scope, $ngConfirm, $location, AuthService) {
    $scope.loginData = {
        email: "",
        password: ""
    }
    
    $scope.sign = {
        email: "",
        password: ""
    }
    
    $scope.login = function () {
        AuthService.login($scope.loginData, function (res) {
            if (res.logged) {
                window.location.replace("/plataforma")
            } else {
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Datos incorrectos",
                    content: "El email y/o password son incorrectos.",
                    scope: $scope,
                    buttons: {
                        entendido: {
                            text: "Entendido",
                            btnClass: "btn-primary",
                            action: function (scope, button) {
                                
                            }
                        }
                    }
                })
            }
        })
    }
    
    $scope.signUp = function () {
        $("#signUpModal").modal("hide")
        
        AuthService.signUp($scope.sign, function (res) {
            if (res.registered) {
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Un solo paso más",
                    content: "Debe confirmar su correo electrónico y podrá ingresar a la plataforma de Bibliotesis. Gracias por registrarse.",
                    scope: $scope,
                    buttons: {
                        entendido: {
                            text: "Entendido",
                            btnClass: "btn-primary",
                            action: function (scope, button) {
                                
                            }
                        }
                    }
                })
                
                $scope.sign = {
                    email: "",
                    password: ""
                }
            } else {
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Ocurrió un error",
                    content: "Ha ocurrido un error en el proceso. Verifique que su Correo Electrónico sea el correcto.",
                    scope: $scope,
                    buttons: {
                        entendido: {
                            text: "Entendido",
                            btnClass: "btn-primary",
                            action: function (scope, button) {
                                
                            }
                        }
                    }
                })
            }
        })
    }
}])