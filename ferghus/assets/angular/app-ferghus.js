/** Angular App Code */
(function() {
    var app = angular.module('ferghus', [ ]);

    app.controller('EnhanceController', ['$scope', '$timeout', function($scope, $timeout) {
        var scope = $scope;
        var timeout = $timeout;
        var ctrl = this;

        ctrl.messageOutArray = [];

        var messagesToPrint = [
            'Welcome to the Forge. May the RNG Gods be with you.',
            'Good luck.'
        ];
        
        function addChatMessage(message) {
            ctrl.messageOutArray.push(message);
        }

        function printMessages() {
            angular.forEach(messagesToPrint, function(message, index) {
                $timeout(function() {
                    ctrl.messageOutArray.push(message);
                }, index * 1500);
            });
        }
        printMessages();

		scope.getArray = function(n) {
	    	return new Array(n);
		};

		ctrl.getItem = function() {
			$('#items').bPopup({
				speed: 'fast',
				follow: [false, false],
				position: [94, 180],
				opacity: 0.6
			});	
		}
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
