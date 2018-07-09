angular.module("TesisCtrl", ["cp.ngConfirm", 'chart.js']).controller("TesisController", ["$scope", "$location", "TesisService", "$ngConfirm", "$route", function ($scope, $location, TesisService, $ngConfirm, $route) {
    $scope.tesisList = []
    $scope.monthLabelsGraph = []
    $scope.monthDataGraph = []
    $scope.options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
    
    TesisService.getAllByScore(function (res) {
        $scope.tesisList = res.byScore
        
        console.log(res.chart)
        
        let months = [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ]
        
        res.chart.forEach(e => {
            let m = months[e._id.month - 1]
            $scope.monthLabelsGraph.push(m)
            $scope.monthDataGraph.push(e.q)
        })
    })
    
    $scope.seeTesisDetails = function (t) {
        $scope.tesisDetails = {
            abstract: t.abstract,
            keywords: t.keywords
        }
    }
    
    $scope.approveTesis = function (id) {
        TesisService.showTesisInRepository(id, function (res) {
            if (res.approved) {
                $route.reload()
                
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Tesis añadida",
                    content: "Se ha añadido la tesis al repositorio para su vista al público.",
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
                    content: "Vuelva a intentarlo más tarde.",
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
    
    $scope.removeTesis = function (id) {
        TesisService.removeTesisFromRepository(id, function (res) {
            if (res.removed) {
                $route.reload()
                
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Tesis removida",
                    content: "Se ha removido la tesis del repositorio para su vista al público.",
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
                    content: "Vuelva a intentarlo más tarde.",
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