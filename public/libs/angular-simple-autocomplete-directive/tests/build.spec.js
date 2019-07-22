describe('simple-autocomplete', function () {
    var $compile,
        $rootScope;

    beforeEach(module('simple-autocomplete'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should work as an element', function () {
        var e = angular.element('<autocomplete options="[1,2,3]" model="test"/>');
        $compile(e)($rootScope);
        expect(e.html()).toBe(' <input ng-model="model" ng-change="autocomplete(model)" ng-disabled="ngDisabled" ng-keydown="keyEvent($event)" class="ng-pristine ng-untouched ng-valid"> <ul ng-show="showOptions"> <!-- ngRepeat: option in filteredOptions track by $index --> </ul> ');
    });

    it('should work as an attribute', function () {
        var e = angular.element('<input autocomplete options="[1,2,3]" model="test"/>');
        $compile(e)($rootScope);
        expect(e.html()).toBe(' <input ng-model="model" ng-change="autocomplete(model)" ng-disabled="ngDisabled" ng-keydown="keyEvent($event)" class="ng-pristine ng-untouched ng-valid"> <ul ng-show="showOptions"> <!-- ngRepeat: option in filteredOptions track by $index --> </ul> ');
    });

    it('shouldn\'t work without options', function () {
        var e = angular.element('<input model="test"/>');
        $compile(e)($rootScope);
        expect(e.html()).toBe('');
    });

    it('shouldn\'t work without model', function () {
        var e = angular.element('<input options="[1,2,3]"/>');
        $compile(e)($rootScope);
        expect(e.html()).toBe('');
    });
});
