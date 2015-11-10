/** Angular App Code */
(function() {
	var app = angular.module('ferghus', [ ]);

	app.controller('EnchantController', ['$scope', '$timeout', function($scope, $timeout) {


		$scope.getArray = function(n) {
	    	return new Array(n);
		};
	}]);

	app.directive('scrollBottom', function () {
        return {
            scope: {
                scrollBottom: '='
            },
            link: function (scope, element) {
                scope.$watchCollection('scrollBottom', function (newValue) {
                    if (newValue) {
                        $(element).scrollTop($(element)[0].scrollHeight);
                    }
                });
            }
        }
    });
})();