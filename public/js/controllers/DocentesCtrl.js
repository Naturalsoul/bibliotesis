angular.module("DocentesCtrl", ["cp.ngConfirm"]).controller("DocentesController", ["$scope", "$ngConfirm", "$location", "$route", "AccountService", "DocentesService", function ($scope, $ngConfirm, $location, $route, AccountService, DocentesService) {
    
    // Variables ---------------------------------------------------------------
    
    $scope.showForms = 0
    
    $scope.nStudent = {
        name: "",
        email: "",
        password: "",
        studyGroup: ""
    }
    
    $scope.studyGroupList = []
    
    $scope.studyGroup = {
        name: "",
        theme: "",
        students: []
    }
    
    $scope.studentList = []
    
    $scope.studentToAdd = ""
    
    $scope.showAdvanceInputsFlag = false
    $scope.requestAdvanceFlag = false
    
    $scope.advance = {
        studyGroup: "",
        title: "",
        description: "",
        tries: 1
    }
    
    $scope.advanceList = []
    
    $scope.finalAdvance = {
        id: 0,
        feedback: ""
    }
    
    // -------------------------------------------------------------------------
    
    // Añadir Alumnos ----------------------------------------------------------
    
    $scope.addNewStudent = function () {
        DocentesService.addNewStudent($scope.nStudent, function (res) {
            if (res.registered) {
                $route.reload()
                
                $scope.showForms = 1
                
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Alumno Añadido",
                    content: "Se ha registrado el nuevo alumno y registrado el nuevo grupo de estudio o añadido a este último.",
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
                    content: "El alumno ya se encuentra registrado o vuelva a intentarlo más tarde.",
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
    
    // -------------------------------------------------------------------------
    
    // Grupos de Estudio -------------------------------------------------------
    
    DocentesService.getStudyGroups(function (res) {
        $scope.studyGroupList = res
    })
    
    $scope.showStudyGroupInputs = function () {
        for (let sg of $scope.studyGroupList) {
            if (sg.name == $scope.studyGroup.name) {
                $scope.studyGroup.theme = sg.theme
                $scope.studyGroup.students = sg.students
            }
        }
        
        DocentesService.getStudentList(function (res) {
            $scope.studentList = res
        })
        
        $scope.showStudyGroupInputsFlag = true
    }
    
    $scope.addUserToGroup = function () {
        if ($scope.studentToAdd.length < 1) {
            $ngConfirm({
                theme: "bootstrap",
                animation: "zoom",
                closeAnimation: "zoom",
                title: "Debe indicar un alumno",
                content: "Debe indicar un email de alumno válido.",
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
            let flag = false
        
            for (let s of $scope.studyGroup.students) {
                if (s.email == $scope.studentToAdd) {
                    flag = true
                }
            }
            
            if (flag) {
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Alumno ya en grupo de estudio",
                    content: "Ya se ha agregado este alumno al grupo de estudio.",
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
                for (let s of $scope.studentList) {
                    if (s.email == $scope.studentToAdd) {
                        $scope.studyGroup.students.push({
                            email: s.email,
                            name: s.name
                        })
                        
                        break
                    }
                }
                
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Alumno Agregado",
                    content: "Se ha agregado el alumno al grupo de estudio. Recuerde actualizar la información antes de salir para guardar los cambios.",
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
    }
    
    $scope.removeStudent = function (email) {
        for (let s of $scope.studyGroup.students) {
            if (s.email == email) {
                let i = $scope.studyGroup.students.indexOf(s)
                
                if (i == ($scope.studyGroup.students.length)) {
                    $scope.studyGroup.students.pop()
                } else {
                    $scope.studyGroup.students.splice(i, 1)
                }
                
                break
            }
        }
        
        $ngConfirm({
            theme: "bootstrap",
            animation: "zoom",
            closeAnimation: "zoom",
            title: "Alumno Eliminado",
            content: "Se ha eliminado el alumno del grupo de estudio. Recuerde actualizar la información antes de salir para guardar los cambios.",
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
    
    $scope.updateStudyGroup = function () {
        DocentesService.updateStudyGroup($scope.studyGroup, function (res) {
            if (res.updated) {
                $route.reload()
                
                $scope.showForms = 2
                
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Grupo de Estudio Actualizado",
                    content: "Se ha añadido la nueva información al grupo de estudio.",
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
    
    // -------------------------------------------------------------------------
    
    // Avances -----------------------------------------------------------------
    
    $scope.showAdvanceInputs = function () {
        $scope.showAdvanceInputsFlag = true
        
        DocentesService.getAdvances($scope.advance.studyGroup, function (res) {
            $scope.advanceList = res
        })
    }
    
    $scope.requestAdvance = function () {
        $scope.requestAdvanceFlag = true
    }
    
    $scope.requestNewAdvance = function () {
        DocentesService.requestNewAdvance($scope.advance, function (res) {
            if (res.saved) {
                $route.reload()
                
                $scope.showForms = 3
                
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Avance Solicitado",
                    content: "Se ha solicitado el nuevo avance al grupo de estudio correspondiente.",
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
    
    $scope.showApproveModal = function (id) {
        $scope.finalAdvance.id = id
        
        $("#feedbackAdvanceModal").modal()
    }
    
    $scope.approveAdvance = function () {
        $("#feedbackAdvanceModal").modal("toggle")
        
        setTimeout(function () {
            DocentesService.approveAdvance($scope.finalAdvance, function (res) {
                if (res.closed) {
                    $route.reload()
                    
                    $scope.showForms = 3
                    
                    $ngConfirm({
                        theme: "bootstrap",
                        animation: "zoom",
                        closeAnimation: "zoom",
                        title: "Avance Cerrado",
                        content: "Se ha cerrado el avance del grupo de estudio correspondiente.",
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
        }, 400)
    }
    
    // -------------------------------------------------------------------------
}])