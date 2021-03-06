/** Angular App Code */
(function() {
    var app = angular.module('brynn', [ ]);

    app.controller('EnchantController', ['$scope', '$timeout', function($scope, $timeout) {
        var scope = $scope;
        var timeout = $timeout;
        var ctrl = this;

        ctrl.magic = 0;
        ctrl.ampsLeft = 5;
        ctrl.successStart = 25;
        ctrl.successEnd = 40;
        ctrl.success = ctrl.successStart;
        ctrl.selectedElixir = null;
        ctrl.brEmpty = 100;
        ctrl.brFull = 0;
        ctrl.resultText = '';
        ctrl.messageOutArray = [];

        var successTimer = null;
        var fill = $('#fill');
        var brEmptyText = $('#brEmpty');
        var brFullText = $('#brFull');
        var brValues = {empty:100, full:0};
        var progressBar = $('#progressBar');
        var messagesToPrint = [
            'Welcome to the Magic Laboratory. May the RNG Gods be with you.',
            'Good luck.'
        ];

        ctrl.calcSuccess = function() {
            if (ctrl.magic <= 100)
                ctrl.success = Math.floor(ctrl.successStart + (ctrl.successEnd - ctrl.successStart) * (ctrl.magic / 100.0));
            else
                ctrl.success = ctrl.successStart;
        }

        ctrl.updateSuccess = function() {
            if(successTimer)
                timeout.cancel(successTimer);
            successTimer = timeout(function() {
                if (isNaN(ctrl.successEnd))
                    ctrl.successEnd = 25;
                else
                    ctrl.successEnd = Math.min(Math.max(Math.floor(ctrl.successEnd), 25), 100);
                ctrl.calcSuccess();
                $('#maxSuccessInput').blur();
            }, 1000);
        }

        ctrl.updateBrText = function() {
            scope.$apply(function() {
                ctrl.brEmpty = Math.floor(brValues.empty);
                ctrl.brFull = Math.ceil(brValues.full);
            });
        }

        ctrl.addMagic = function(br) {
            ctrl.magic = ctrl.magic + br;
            ctrl.calcSuccess();
            TweenMax.to(fill, 0.5, {
                top:Math.max(143 - 143 * (ctrl.magic / 100), 0),
                ease:Power4.easeOut
            });
            TweenMax.to(brEmptyText, 0.5, {
                top:Math.max(217 - 74 * (ctrl.magic / 100), 0),
                ease:Power4.easeOut
            });
            TweenMax.to(brFullText, 0.5, {
                top:Math.max(291 - 74 * Math.min(ctrl.magic / 100, 1), 0),
                ease:Power4.easeOut
            });
            var emptyTarget = 100 - ctrl.magic;
            var fullTarget = ctrl.magic;
            TweenMax.to(brValues, 0.5, {
                empty:emptyTarget,
                full:fullTarget,
                ease:Power4.easeOut,
                onUpdate:ctrl.updateBrText
            });
        }

        ctrl.addElixir = function(elixir) {
            if (ctrl.ampsLeft <= 0)
                return;

            var brMin;
            var brMax;
            switch (elixir) {
                case 1:
                    brMin = 1;
                    brMax = 10;
                    ctrl.ampsLeft--;
                    break;
                case 2:
                    brMin = 10;
                    brMax = 50;
                    ctrl.ampsLeft--;
                    break;
                case 3:
                    brMin = 3;
                    brMax = 5;
                    ctrl.ampsLeft--;
                    break;
                default:
                    brMin = 0;
                    brMax = 0;
                    break;
            }
            ctrl.addMagic(randomInt(brMin, brMax));
        };

        ctrl.cancel = function() {
            ctrl.selectedElixir = null;
            if (!ctrl.magic)
                return;
            TweenMax.killTweensOf(fill);
            TweenMax.killTweensOf(brEmptyText);
            TweenMax.killTweensOf(brFullText);
            TweenMax.killTweensOf(brValues);
            ctrl.magic = 0;
            ctrl.ampsLeft = 5;
            ctrl.calcSuccess();
            fill.css('top', 143);
            brEmptyText.css('top', 217);
            brFullText.css('top', 291);
            ctrl.brEmpty = 100;
            ctrl.brFull = 0;
            brValues.empty = 100;
            brValues.full = 0;
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
                onClose: ctrl.result
            });
            TweenMax.to(progressBar, 2.1, {
                scaleX:1,
                ease:Power0.easeOut
            });
        }

        ctrl.result = function() {
            var roll = randomInt(1, 100);
            if (roll <= ctrl.success) {
                addChatMessage('Enchant successful. (' + ctrl.success + '% success, roll: ' + roll + ')')
                scope.$apply(function() {
                    ctrl.resultText = 'Enchant successful.';
                });
            }
            else {
                addChatMessage('Enchant failed. (' + ctrl.success + '% success, roll: ' + roll + ')')
                scope.$apply(function() {
                    ctrl.resultText = 'Enchant failed.';
                });
            }
            scope.$apply(function() {
                ctrl.cancel();
            });
            $('#result').bPopup({
                speed: 'slow',
                followSpeed: 'fast',
                modal: false,
                autoClose: 2000
            });
            TweenMax.to(progressBar, 0, {scaleX:0});
        }

        function addChatMessage(message) {
            ctrl.messageOutArray.push(message);
            if (ctrl.messageOutArray.length > 8)
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
