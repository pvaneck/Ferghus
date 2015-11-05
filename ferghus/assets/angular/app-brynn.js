/** Angular App Code */
(function() {
	var app = angular.module('brynn', [ ]);

	app.controller('EnchantController', ['$scope', function($scope) {
		var scope = $scope;
		var ctrl = this;

		ctrl.magic = 0;
		ctrl.ampsLeft = 5;
		ctrl.successStart = 25;
		ctrl.successEnd = 40;
		ctrl.success = ctrl.successStart;
		ctrl.selectedElixir = null;
		ctrl.brEmpty = 100;
		ctrl.brFull = 0;
		ctrl.resultText = "";

		var fill = $("#fill");
		var brEmptyText = $("#brEmpty");
		var brFullText = $("#brFull");
		var brValues = {empty:100, full:0};
		var progressBar = $("#progressBar");

		ctrl.calcSuccess = function() {
			if (ctrl.magic <= 100)
				ctrl.success = Math.floor(ctrl.successStart + (ctrl.successEnd - ctrl.successStart) * (ctrl.magic / 100.0));
			else
				ctrl.success = ctrl.successStart;
		}

		ctrl.updateBrText = function() {
			if (brValues.empty < 41)
				brEmptyText.css("display", "none");
			if (brValues.full >= 41)
				brFullText.css("display", "inherit");
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
			if (ctrl.ampsLeft <= 0) {
				return;
		    }
			
			var brMin;
			var brMax;
			switch (elixir)
			{
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
			TweenMax.killTweensOf(fill);
			TweenMax.killTweensOf(brEmptyText);
			TweenMax.killTweensOf(brFullText);
			TweenMax.killTweensOf(brValues);
			ctrl.magic = 0;
			ctrl.ampsLeft = 5;
			ctrl.calcSuccess();
			fill.css("top", 143);
			brEmptyText.css("top", 217);
			brFullText.css("top", 291);
			brEmptyText.css("display", "inherit");
			brFullText.css("display", "none");
			ctrl.brEmpty = 100;
			ctrl.brFull = 0;
			brValues.empty = 100;
			brValues.full = 0;
			ctrl.selectedElixir = null;
		}

		ctrl.begin = function() {
			if (!muted)
			{
				audioEnhance.volume = 0.7;
				audioEnhance.currentTime = 0;
				audioEnhance.play();
			}
			$("#progress").bPopup({
				speed: "fast",
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
			if (roll <= ctrl.success)
			{
				scope.$apply(function() {
					ctrl.resultText = "Enchant successful.";
				});
			}
			else
			{
				scope.$apply(function() {
					ctrl.resultText = "Enchant failed.";
				});
			}
			scope.$apply(function() {
				ctrl.cancel();
			});
			$("#result").bPopup({
				speed: "slow",
				followSpeed: "fast",
				modal: false,
				autoClose: 2000
			});
			TweenMax.to(progressBar, 0, {scaleX:0});
		}
	}]);
})();
