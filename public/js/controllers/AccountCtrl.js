angular.module("AccountCtrl", ["cp.ngConfirm"]).controller("AccountController", ["$scope", "$ngConfirm", "$location", "$route", "AccountService", function ($scope, $ngConfirm, $location, $route, AccountService) {
    $scope.accountType = true.toString()
    
    $scope.nAccount = {
        name: "",
        email: "",
        accountType: "",
        studyGroup: ""
    }
    
    AccountService.getUsers(function (res) {
        $scope.users = res
    })
    
    AccountService.getAllSections(function (res) {
        $scope.sectionsList = res
    })
    
    $scope.changeAccountType = function () {
        $scope.accountType = ($scope.accountType == "true") ? true : false
        
        AccountService.changeAccountType($scope.accountType, function (res) {
            if (res.updated) {
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Tipo de cuenta actualizada",
                    content: "Se ha actualizado su tipo de cuenta.",
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
            } else {
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Ocurrió un error",
                    content: "Ocurrió un error en el proceso. Inténtelo de nuevo más tarde.",
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
    
    $scope.createAccount = function () {
        AccountService.createAccount($scope.nAccount, function (res) {
            if (res.registered) {
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Se ha creado al usuario",
                    content: "Se ha creado al usuario con el correo " + $scope.nAccount.email + " y enviado un correo electrónico con sus credenciales a su email.",
                    scope: $scope,
                    buttons: {
                        entendido: {
                            text: "Entendido",
                            btnClass: "btn-primary",
                            action: function (scope, button) {
                                window.location.replace("/")
                            }
                        }
                    }
                })
            } else {
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Ocurrió un error",
                    content: "Ocurrió un error en el proceso. Inténtelo de nuevo más tarde.",
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
    
    $scope.removeUser = function (email) {
        $ngConfirm({
            theme: "bootstrap",
            animation: "zoom",
            closeAnimation: "zoom",
            title: "¿Está completamente seguro de eliminar al usuario " + email + "?",
            content: "Esta acción es irreversible.",
            scope: $scope,
            buttons: {
                estoyseguro: {
                    text: "Estoy seguro/a",
                    btnClass: "btn-danger",
                    action: function (scope, button) {
                        AccountService.removeUser(email, function (res) {
                            if (res.removed) {
                                $route.reload()    
                                
                                $ngConfirm({
                                    theme: "bootstrap",
                                    animation: "zoom",
                                    closeAnimation: "zoom",
                                    title: "Se ha eliminado al usuario",
                                    content: "El usuario " + email + " ha sido eliminado de los registros.",
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
                            } else {
                                $ngConfirm({
                                    theme: "bootstrap",
                                    animation: "zoom",
                                    closeAnimation: "zoom",
                                    title: "Ocurrió un error",
                                    content: "Ocurrió un error en el proceso. Inténtelo de nuevo más tarde.",
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
                },
                
                no: {
                    text: "No",
                    btnClass: "btn-default",
                    action: function (scope, button) {}
                }
            }
        })
    }
}])