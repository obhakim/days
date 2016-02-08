angular.module("umbraco").controller("DocumentTypePickerController", function ($scope, $http) {

    $scope.doctypes = [];
    $scope.model.value = $scope.model.value || [];

    if (!($scope.model.value instanceof Array))
        $scope.model.value = [];

    $http.get("backoffice/DocumentTypePicker/DocumentTypePickerApi/GetAllDocumentTypes").then(function (response) {

        $scope.doctypes = response.data;

        for (var i = 0; i < $scope.model.value.length; i++) {
            for (var j = 0; j < $scope.doctypes.length; j++) {
                if ($scope.model.value[i].alias == $scope.doctypes[j].alias) {
                    $scope.doctypes[j].checked = true;
                    break;
                }
            }
        }

        $scope.$watch("doctypes", function (newValue, oldValue) {

            if (newValue === oldValue)
                return;

            $scope.model.value = [];

            for (var j = 0; j < $scope.doctypes.length; j++) {
                if ($scope.doctypes[j].checked) {
                    $scope.model.value.push({ alias: $scope.doctypes[j].alias, name: $scope.doctypes[j].name });
                }
            }

        }, true);

    });

});