angular.module("MainCtrl", ["cp.ngConfirm"]).controller("MainController", ["$scope", "$location", "$ngConfirm", "AuthService", "AccountService", "TesisService", function ($scope, $location, $ngConfirm, AuthService, AccountService, TesisService) {
    $scope.changePasswordData = {
        oldPassword: "",
        nPassword: "",
        nPassword2: ""
    }
    
    TesisService.getByFlag(function (res) {
        $scope.tesisList = res
    })
    
    $scope.setTesisInfo = function (t) {
        $scope.tesis = {
            title: t.title,
            files: t.files,
            abstract: t.abstract,
            keywords: t.keywords
        }
    }
    
    $scope.showFile = function (path, name) {
        let mapForm = document.createElement("form");
        mapForm.target = "_blank";
        mapForm.method = "POST"; // or "post" if appropriate
        mapForm.action = "/plataforma/tesis/file";
        mapForm.style.display = "none"

        let mapInput = document.createElement("input");
        mapInput.type = "text";
        mapInput.name = "path";
        mapInput.value = path;
        mapInput.style.display = "none"
        mapForm.appendChild(mapInput);
        
        let mapInput2 = document.createElement("input");
        mapInput2.type = "text";
        mapInput2.name = "filename";
        mapInput2.value = name;
        mapInput2.style.display = "none"
        mapForm.appendChild(mapInput2);

        document.body.appendChild(mapForm);

        mapForm.submit();
    }
    
    AccountService.checkForPassword(function (res) {
        if (res.changePassword) {
            console.log("asdfasdf")
            $("#changePasswordModal").modal({
                backdrop: "static",
                keyboard: false,
                show: true
            })
        }
    })
    
    $scope.changePassword = function () {
        if ($scope.changePasswordData.oldPassword && $scope.changePasswordData.nPassword && $scope.changePasswordData.nPassword2) {
            if ($scope.changePasswordData.nPassword == $scope.changePasswordData.nPassword2) {
                AccountService.changePassword($scope.changePasswordData.oldPassword, $scope.changePasswordData.nPassword, function (res) {
                    if (res.changed) {
                        $("#changePasswordModal").modal("hide")
                        
                        $ngConfirm({
                            theme: "bootstrap",
                            animation: "zoom",
                            closeAnimation: "zoom",
                            title: "Contraseña Actualizada",
                            content: "Se ha actualizado su contraseña. Ya puede ingresar al sistema con sus nuevas credenciales de acceso.",
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
                            content: "Ocurrió un error en el proceso. Asegúrese que su contraseña actual es la correcta o inténtelo más tarde.",
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
            } else {
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Ocurrió un error",
                    content: "Las contraseñas no coinciden.",
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
        } else {
            $ngConfirm({
                theme: "bootstrap",
                animation: "zoom",
                closeAnimation: "zoom",
                title: "Datos incompletos",
                content: "Debe ingresar todos los datos que se le solicitan.",
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
    }
}])