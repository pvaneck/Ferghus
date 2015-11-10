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
