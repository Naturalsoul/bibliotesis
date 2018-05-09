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
    
    $scope.removeStudent = function (email) {
        for (let s of $scope.studyGroup.students) {
            if (s.email == email) {
                $scope.studyGroup.students.splice($scope.studyGroup.indexOf(s), 1)
            }
            
            break
        }
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
}])