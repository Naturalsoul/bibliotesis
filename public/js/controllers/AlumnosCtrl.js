angular.module("AlumnosCtrl", ["cp.ngConfirm"]).controller("AlumnosController", ["$scope", "$ngConfirm", "$location", "$route", "$window", "AccountService", "AlumnosService", function ($scope, $ngConfirm, $location, $route, $window, AccountService, AlumnosService) {
    
    $scope.studyGroup = ""
    $scope.advanceList = []
    $scope.advanceId = 0
    
    $scope.uploadingFile = false
    
    AlumnosService.getStudyGroup(function (res) {
        $scope.studyGroup = res
        
        AlumnosService.getAdvanceList($scope.studyGroup.name, function (res) {
            $scope.advanceList = res
            
            AlumnosService.getTesisInfo($scope.studyGroup.name, function (res) {
                $scope.tesisList = res
            })
        })
    })
    
    $scope.uploadFiles = function (id) {
        $scope.advanceId = id
    }
    
    $scope.uploadFileToServer = function () {
        $("#uploadFileModal").modal("toggle")

        setTimeout(function () {
            let form = $('#uploadFileForm')[0];
            let formData = new FormData(form)
            
            // Se utiliza JQuery debido al envio de multiples files
            $.ajax({
                url: '/api/plataforma/alumnos/advances/up',
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                success: function (res) {
                    $scope.uploadingFile = false
                    
                    if (res.updated) {
                        $route.reload()
                        $ngConfirm({
                            theme: "bootstrap",
                            animation: "zoom",
                            closeAnimation: "zoom",
                            title: "Archivo guardado",
                            content: "Se ha guardado el archivo con éxito.",
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
                            content: (res.message) ? res.message : "Ha ocurrido un error en el proceso. Intente de nuevo más tarde.",
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
                },
                error: function (err) {
                    console.log(err.data)
                    $ngConfirm({
                        theme: "bootstrap",
                        animation: "zoom",
                        closeAnimation: "zoom",
                        title: "Ocurrió un error",
                        content: "Ha ocurrido un error en el proceso. Intente de nuevo más tarde.",
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
            });
        }, 400)
    }
    
    $scope.downloadFile = function (file) {
        $window.open("/api/plataforma/alumnos/advances/file?path=" + file.path, "_self")
    }
    
    $scope.uploadTesis = function (id) {
        $scope.tesisId = id
    }
    
    $scope.uploadTesisToServer = function () {
        $("#uploadTesisModal").modal("toggle")

        setTimeout(function () {
            let form = $('#uploadTesisForm')[0];
            let formData = new FormData(form)
            
            // Se utiliza JQuery debido al envio de multiples files
            $.ajax({
                url: '/api/plataforma/alumnos/tesis/up',
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                success: function (res) {
                    $scope.uploadingFile = false
                    
                    if (res.up) {
                        $route.reload()
                        $ngConfirm({
                            theme: "bootstrap",
                            animation: "zoom",
                            closeAnimation: "zoom",
                            title: "Archivo guardado",
                            content: "Se ha guardado el archivo con éxito.",
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
                            content: (res.message) ? res.message : "Ha ocurrido un error en el proceso. Intente de nuevo más tarde.",
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
                },
                error: function (err) {
                    console.log(err.data)
                    $ngConfirm({
                        theme: "bootstrap",
                        animation: "zoom",
                        closeAnimation: "zoom",
                        title: "Ocurrió un error",
                        content: "Ha ocurrido un error en el proceso. Intente de nuevo más tarde.",
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
            });
        }, 400)
    }
    
    $scope.seeTesisDetails = function (tesis) {
        $scope.tesisDetails = {
            abstract: tesis.abstract,
            keywords: tesis.keywords
        }
    }
}])