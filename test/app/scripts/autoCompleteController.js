app.controller('autoCompleteController', ['$scope', 'autoCompleteService', function($scope, autoCompleteService) {

    $scope.autoCompleteModel = {};
    $scope.autoCompleteModel.value = null;
    $scope.autoCompleteModel.nameList = autoCompleteService.getNameList();
    $scope.autoCompleteModel.onSelect = function (option, index) {
        console.log(option + ' ' + index);
    };

}]);