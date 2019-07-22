/*
 * angular-simple-autocomplete-directive
 * (c) 2016 Alex Neamtu
 * License: MIT
 */

var autocompleteTmpl = require('./templates/autocomplete.html');

class controller {
    constructor($scope, $sce) {
        this.$scope = $scope;
        this.$sce = $sce;
        $scope.selected = -1;

        $scope.selectOption = this.selectOption.bind(this);
        $scope.autocomplete = this.autocomplete.bind(this);
        $scope.keyEvent = this.keyEvent.bind(this);
    }

    selectOption(option) {
        this.$scope.model = option;
        this.$scope.showOptions = false;
        this.$scope.filteredOptions = [];
    }

    autocomplete(search) {
        this.$scope.showOptions = false;
        this.$scope.filteredOptions = [];
        angular.forEach(this.$scope.options, (o) => {
            o = o.toString();
            if (o.indexOf(search) >= 0 && search) {
                this.$scope.filteredOptions.push({
                    value: o,
                    text: this.$sce.trustAsHtml(o.replace(search, '<em>' + search + '</em>'))
                });
            }
        });
        if (this.$scope.filteredOptions.length > 0) {
            this.$scope.showOptions = true;
        }
    }

    keyEvent(e) {
        if (this.$scope.filteredOptions) {
            switch (e.keyCode) {
                case 38:
                    this.$scope.selected--;
                    if (this.$scope.selected < 0) {
                        this.$scope.selected = this.$scope.filteredOptions.length - 1;
                    }
                    break;
                case 40:
                    this.$scope.selected++;
                    if (this.$scope.selected >= this.$scope.filteredOptions.length) {
                        this.$scope.selected = 0;
                    }
                    break;
                case 13:
                    if (angular.isDefined(this.$scope.filteredOptions[this.$scope.selected])) {
                        this.selectOption(this.$scope.filteredOptions[this.$scope.selected].value);
                    }
                    break;
            }
        }
    }
}

controller.$inject = ['$scope', '$sce'];

function autocomplete() {
    return {
        restrict: 'AE',
        scope: {
            model: '=',
            options: '=',
            ngDisabled: '='
        },
        replace: true,
        transclude: true,
        template: autocompleteTmpl,
        controller

    }
}

export default autocomplete;