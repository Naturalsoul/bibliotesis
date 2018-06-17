angular.module("MainCtrl", []).controller("MainController", ["$scope", "$location", "AuthService", "AccountService", "TesisService", function ($scope, $location, AuthService, AccountService, TesisService) {
    $scope.isLoggedIn = false
    $scope.student = true
    
    AuthService.isLoggedIn(function (res) {
        if (res.logged) {
            $scope.isLoggedIn = true
            AccountService.getUserInfo(function (res) {
                $scope.student = (res.student) ? res : false
                $scope.admin = (res.level == 0) ? true : false
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
}])