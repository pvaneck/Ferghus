/** Angular App Code */
(function() {
    var app = angular.module('ferghus', [ ]);

    app.controller('EnhanceController', ['$scope', '$timeout', function($scope, $timeout) {
        var scope = $scope;
        var timeout = $timeout;
        var ctrl = this;

        ctrl.selectedItem = null;
        ctrl.messageOutArray = [];


        var popupItems;	
        var progressBar = $('#progressBar');
        var messagesToPrint = [
            'Welcome to the Forge. May the RNG Gods be with you.',
            'Good luck.'
        ];

        var enhanceProbabilities = [
            100, 100, 100, 75, 75, 50, 50, 50, 40, 40, 40, 40, 33.3334, 33.3334, 33.3334
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

		ctrl.getArray = function(n) {
	    	return new Array(n);
		};

		ctrl.getItem = function() {
			popupItems = $('#items').bPopup({
				speed: 'fast',
				follow: [false, false],
				position: [94, 180],
				opacity: 0.6
			});
		}

		ctrl.selectItem = function(item) {
			ctrl.selectedItem = item;
			popupItems.close();
		}

        ctrl.begin = function() {
            if (!muted) {
                audioEnhance.volume = 0.7;
                audioEnhance.currentTime = 0;
                audioEnhance.play();
            }
            $('#progress').bPopup({
                speed: 'fast',
                followSpeed: 250,
                opacity: 0.3,
                modalClose: false,
                autoClose: 1850,
                onClose: ctrl.doEnhance
            });
            TweenMax.to(progressBar, 2.1, {
                scaleX:1,
                ease:Power0.easeOut
            });
        }

        ctrl.doEnhance = function() {
            if (ctrl.selectedItem === null || ctrl.selectItem >= 15) {
                return;
            }
            var roll = randomFloat(0, 100);
            roll = Math.round(roll*10000)/10000
            var prob = enhanceProbabilities[ctrl.selectedItem];
            if (roll < prob) {
                addChatMessage('Enhance successful. (' + prob + '% success, roll: ' + roll + ')');
                ctrl.selectedItem  += 1
            }
            else {
                addChatMessage('Enhance failed. (' + prob + '% success, roll: ' + roll + ')');
                ctrl.selectedItem = null;
            }
            scope.$apply();
            TweenMax.to(progressBar, 0, {scaleX:0});

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
