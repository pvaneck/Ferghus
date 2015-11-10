/** Angular App Code */
(function() {
    var app = angular.module('ferghus', ['ngSanitize']);

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
            if (ctrl.messageOutArray.length > 5)
                ctrl.messageOutArray.shift();
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
        }

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
            if (ctrl.selectedItem === null || ctrl.selectedItem >= 15) {
                return;
            }
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
            var roll = randomFloat(0, 100);
            roll = Math.round(roll*10000)/10000;
            var prob = enhanceProbabilities[ctrl.selectedItem];
            var desc = '<br /> &nbsp; +' + ctrl.selectedItem;
            if (roll < prob) {
                desc += ' &#8594; +' + (ctrl.selectedItem + 1);
                if (prob >= 100)
                    addChatMessage('Enhance successful. (' + prob.toFixed(0) + '% success)' + desc);
                else
                    addChatMessage('Enhance successful. (' + prob.toFixed(0) + '% success, roll: ' + roll + ')' + desc);
                ctrl.selectedItem++;
            }
            else {
                switch (ctrl.selectedItem)
                {
                    case 3:
                    case 4:
                        desc += ' &#8594; +' + (ctrl.selectedItem - 1);
                        ctrl.selectedItem--;
                        break;
                    case 5:
                    case 6:
                    case 7:
                        desc += ' &#8594; +0';
                        ctrl.selectedItem = 0;
                        break;
                    default:
                        desc += ' destroyed.';
                        ctrl.selectedItem = null;
                        break;
                }
                message  = 'Enhance failed. (' + prob.toFixed(0) + '% success, roll: ' + roll + ')' + desc;
                addChatMessage(message);
            }
            scope.$digest();
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
