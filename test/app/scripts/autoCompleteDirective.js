app.directive('autoComplete',[function() {
    return {
        restrict: 'AEC',
        scope: {
            ngModel= '=',
            options= '=',
            onSelect= '&'
        },
        template: '<div class="auto-complete-container"></div>',
        link: function(scope, element, attrs) {

        }
    }
}]);