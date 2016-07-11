app.directive('autoComplete',[function() {
    return {
        restrict: 'AEC',
        scope: {
            ngModel= '=',
            options= '=',
            onSelect= '&'
        },
        template: "<div class='auto-complete'>" +
                        "<input type='text' ng-model='inputValue' class='input-auto-complete' ng-click='onChangeValue()' ng-change='onChangeValue()'/>" +
                        "<div class='option-list' ng-if='showOptions'>" +
                            "<span class='option' ng-repeat='option in filteredOptions' ng-click='onValueSelect(option, $index);inputValue = option'>" +
                                "{{option}}" +
                            "</span>" +
                        "</div>" +
                    "</div>",
        link: function(scope, element, attrs) {
            scope.inputValue = null;
            scope.showOptions = false;
            scope.filteredOptions = angular.copy(scope.options);

            var assignValues = function assignValues() {
                scope.ngModel = scope.inputValue;
            };

            scope.onChangeValue = function onChangeValue() {
                if (scope.options.length === 0) {
                    return;
                }
                
                if (!scope.inputValue) {
                    scope.filteredOptions = angular.copy(scope.options); 
                    scope.showOptions = true;                   
                    return;
                }
                scope.showOptions = false;
                scope.filteredOptions = $filter('filter')(scope.options, function(option) {
                                            return option.indexOf(scope.inputValue) > -1;
                                        });
                if (scope.filteredOptions.length > 0) {
                    scope.showOptions = true;
                }
            };

            scope.$watch('inputValue', assignValues);

            scope.onValueSelect = function onValueSelect(option, index) {
                scope.showOptions = false;
                scope.inputValue = option; //For Binding values in the text box
                scope.ngModel = option; //For Binding values in the ng-Model(passing to controller)
                if (scope.onSelect) {
                    scope.onSelect(option, index);
                }
            };

            document.querySelector('body').addEventListener('click', function(event) {
                if (event.srcElement.className.indexOf('input-auto-complete') == -1) {
                    scope.showOptions = false;  
                }
                if(!scope.$$phase) {
                    scope.$apply();
                }
            });
        }
    }
}]);