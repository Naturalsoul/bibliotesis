angular.module("DocentesCtrl", ["cp.ngConfirm", 'moment-picker']).controller("DocentesController", ["$scope", "$ngConfirm", "$location", "$route", "$window", "AccountService", "DocentesService", function ($scope, $ngConfirm, $location, $route, $window, AccountService, DocentesService) {
    
    // Variables ---------------------------------------------------------------
    
    $scope.showForms = 0
    
    $scope.nStudent = {
        name: "",
        email: "",
        studyGroup: "",
        section: ""
    }
    
    $scope.studyGroupList = []
    
    $scope.studyGroup = {
        name: "",
        theme: "",
        students: [],
        section: ""
    }
    
    $scope.studentList = []
    
    $scope.studentToAdd = ""
    
    $scope.showAdvanceInputsFlag = false
    $scope.requestAdvanceFlag = false
    
    $scope.advance = {
        studyGroup: "",
        description: "",
        date: ""
    }
    
    $scope.advanceList = []
    
    $scope.finalAdvance = {
        id: 0,
        feedback: ""
    }
    
    $scope.difference = {
        file: {},
        advance: "",
        title1: "",
        text1: "",
        title2: "",
        text2: ""
    }
    
    $scope.showComparisonText = false
    $scope.lookingForDifferences = false
    
    $scope.tesis = {
        studyGroup: "",
        title: "",
        description: "",
        date: ""
    }
    
    $scope.tesisList = []
    
    $scope.finalTesis = {
        id: 0,
        score: 1
    }
    
    $scope.nSection = {
        code: "",
        teacher: {
            name: "",
            email: "",
            level: 0,
        }
    }
    
    $scope.sectionsList = []
    
    // -------------------------------------------------------------------------
    
    // Secciones ---------------------------------------------------------------
    
    DocentesService.getTeacherInfo(function (res) {
        $scope.nSection.teacher = {
            name: res.name,
            email: res.email,
            level: res.level
        }
    })
    
    DocentesService.getSectionsList(function (res) {
        $scope.sectionsList = res
    })
    
    $scope.addNewSection = function () {
        DocentesService.addNewSection($scope.nSection, function (res) {
            if (res.saved) {
                $route.reload()
                
                $scope.showForms = 1
                
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Sección Registrada",
                    content: "Se ha registrado la nueva sección.",
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
                    content: (res.message) ? res.message : "Vuelva a intentarlo más tarde.",
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
    
    $scope.removeSection = function (code) {
        $ngConfirm({
            theme: "bootstrap",
            animation: "zoom",
            closeAnimation: "zoom",
            title: "¿Está seguro de eliminar la sección?",
            content: "Esta acción es irreversible.",
            scope: $scope,
            buttons: {
                si: {
                    text: "Sí",
                    btnClass: "btn-danger",
                    action: function (scope, button) {
                        DocentesService.removeSection(code, function (res) {
                            if (res.removed) {
                                $route.reload()
                
                                $scope.showForms = 1
                                
                                $ngConfirm({
                                    theme: "bootstrap",
                                    animation: "zoom",
                                    closeAnimation: "zoom",
                                    title: "Sección Eliminada",
                                    content: "Se ha eliminado la sección.",
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
                },
                no: {
                    text: "No",
                    btnClass: "btn-default",
                    action: function () {}
                }
            }
        })
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
                    content: "Se ha registrado el nuevo alumno y enviado un correo electrónico con sus credenciales y registrado el nuevo grupo de estudio o añadido a este último.",
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
    
    $scope.getStudyGroupsBySection = function () {
        DocentesService.getStudyGroups($scope.studyGroup.section, function (res) {
            $scope.studyGroupList = res
            $scope.showStudyGroupsFlag = true
        })
    }
    
    $scope.showStudyGroupInputs = function () {
        for (let sg of $scope.studyGroupList) {
            if (sg.name == $scope.studyGroup.name) {
                $scope.studyGroup.theme = sg.theme
                $scope.studyGroup.students = sg.students
            }
        }
        
        DocentesService.getStudentList($scope.studyGroup.section, function (res) {
            $scope.studentList = res.filter(e => e.level != 0)
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
    
    $scope.removeStudyGroup = function () {
        $ngConfirm({
            theme: "bootstrap",
            animation: "zoom",
            closeAnimation: "zoom",
            title: "¿Está completamente seguro de eliminar este grupo de estudio?",
            content: "Esta acción es irreversible.",
            scope: $scope,
            buttons: {
                estoyseguro: {
                    text: "Estoy seguro/a",
                    btnClass: "btn-danger",
                    action: function (scope, button) {
                        DocentesService.removeStudyGroup($scope.studyGroup.name, function (res) {
                            if (res.removed) {
                                $route.reload()
                                
                                $scope.showForms = 2
                                
                                $ngConfirm({
                                    theme: "bootstrap",
                                    animation: "zoom",
                                    closeAnimation: "zoom",
                                    title: "Grupo de Estudio Eliminado",
                                    content: "Se ha eliminado el grupo de estudio.",
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
                },
                
                no: {
                    text: "No",
                    btnClass: "btn-default",
                    action: function (scope, button) {}
                }
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
        $scope.advance.date = $scope.advance.date._d
        
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
    
    $scope.downloadFile = function (file) {
        $window.open("/api/plataforma/alumnos/advances/file?path=" + file.path, "_self")
    }
    
    $scope.setFileToLookForDiffs = function (file) {
        $scope.difference.file = file
        $scope.showComparisonText = false
    }
    
    $scope.doComparison = function () {
        $scope.lookingForDifferences = true
        
        if ($scope.difference.advance) {
            DocentesService.lookForDifferences($scope.difference.file, $scope.difference.advance, function (res) {
                if (res.file1 && res.file2) {
                    let file1 = res.file1
                    let file2 = res.file2
                    let color = ""
                    let span = null
                    
                    let diff = JsDiff.diffChars(file1, file2),
                        display = document.getElementById('differenceBox'),
                        fragment = document.createDocumentFragment();
                    
                    display.innerHTML = ""
                    
                    diff.forEach(function(part){
                      // green for additions, red for deletions
                      // grey for common parts
                      color = part.added ? 'green' :
                        part.removed ? 'red' : 'grey';
                      span = document.createElement('span');
                      span.style.color = color;
                      span.style.fontWeight = (color == "grey") ? "normal" : "bold";
                      span.appendChild(document
                        .createTextNode(part.value));
                      fragment.appendChild(span);
                    });
                    
                    display.appendChild(fragment);
                    
                    $scope.lookingForDifferences = false
                    $scope.showComparisonText = true
                } else {
                    $scope.lookingForDifferences = false
                    $ngConfirm({
                        theme: "bootstrap",
                        animation: "zoom",
                        closeAnimation: "zoom",
                        title: "Ocurrió un error",
                        content: "No hay documentos en uno o ambos avances.",
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
    }
    
    // -------------------------------------------------------------------------
    
    // Tesis -------------------------------------------------------------------
    
    $scope.showTesisForm = function () {
        if ($scope.tesis.studyGroup != "") {
            $scope.requestTesisFlag = true
        } else {
            $ngConfirm({
                theme: "bootstrap",
                animation: "zoom",
                closeAnimation: "zoom",
                title: "Ocurrió un error",
                content: "Debe escoger un grupo de estudio primero antes de solicitar una tesis.",
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
    
    $scope.getTesisInfo = function () {
        DocentesService.getTesisInfo($scope.tesis.studyGroup, function (res) {
            $scope.tesisList = res
        })
    }
    
    $scope.requestTesis = function () {
        DocentesService.requestTesis($scope.tesis, function (res) {
            if (res.saved) {
                $route.reload()
                    
                $scope.showForms = 4
                
                $ngConfirm({
                    theme: "bootstrap",
                    animation: "zoom",
                    closeAnimation: "zoom",
                    title: "Tesis Solicitada",
                    content: "Se ha solicitado la tesis al grupo de estudio correspondiente.",
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
    
    $scope.showApproveTesisModal = function (id) {
        $scope.finalTesis.id = id
        $("#approveTesisModal").modal()
    }
    
    $scope.approveTesis = function () {
        $("#approveTesisModal").modal("toggle")
        
        setTimeout(function () {
            DocentesService.approveTesis($scope.finalTesis, function (res) {
                if (res.approved) {
                    $route.reload()
                    
                    $scope.showForms = 4
                    
                    $ngConfirm({
                        theme: "bootstrap",
                        animation: "zoom",
                        closeAnimation: "zoom",
                        title: "Tesis Cerrada",
                        content: "Se ha cerrado la tesis del grupo de estudio correspondiente.",
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
    
    $scope.seeTesisDetails = function (tesis) {
        $scope.tesisDetails = {
            abstract: tesis.abstract,
            keywords: tesis.keywords
        }
    }
    
    // -------------------------------------------------------------------------
}])