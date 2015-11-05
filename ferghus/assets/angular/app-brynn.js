/** Angular App Code */
(function() {
	var app = angular.module('brynn', [ ]);

	app.controller('EnchantController', ['$scope', function($scope) {
		var scope = $scope;
		this.magic = 0;
		this.successStart = 25;
		this.successEnd = 40;
		this.success = this.successStart;
		this.selectedElixir = null;
		scope.brEmpty = 100;
		scope.brFull = 0;
		var fill = $("#fill");
		var brEmptyText = $("#brEmpty");
		var brFullText = $("#brFull");
		var brValues = {empty:100, full:0};

		this.calcSuccess = function() {
			if (this.magic <= 100)
				this.success = Math.floor(this.successStart + (this.successEnd - this.successStart) * (this.magic / 100.0));
			else
				this.success = this.successStart;
		}

		this.updateBrText = function() {
			if (brValues.empty < 41)
				brEmptyText.css("display", "none");
			if (brValues.full >= 41)
				brFullText.css("display", "initial");
			scope.$apply(function() {
				scope.brEmpty = Math.floor(brValues.empty);
				scope.brFull = Math.floor(brValues.full);
			});
		}

		this.addMagic = function(br) {
			this.magic = this.magic + br;
			this.calcSuccess();
			TweenMax.to(fill, 0.5, {
				top:Math.max(143 - 143 * (this.magic / 100), 0),
				ease:Power4.easeOut
			});
			TweenMax.to(brEmptyText, 0.5, {
				top:Math.max(217 - 74 * (this.magic / 100), 0),
				ease:Power4.easeOut
			});
			TweenMax.to(brFullText, 0.5, {
				top:Math.max(291 - 74 * Math.min(this.magic / 100, 1), 0),
				ease:Power4.easeOut
			});
			var emptyTarget = 100 - this.magic;
			var fullTarget = this.magic;
			TweenMax.to(brValues, 0.5, {
				empty:emptyTarget,
				full:fullTarget,
				ease:Power4.easeOut,
				onUpdate:this.updateBrText
			});
		}

		this.addElixir = function(elixir) {
			var brMin;
			var brMax;
			switch (elixir)
			{
				case 1:
					brMin = 1;
					brMax = 10;
					break;
				case 2:
					brMin = 10;
					brMax = 50;
					break;
				case 3:
					brMin = 3;
					brMax = 5;
					break;
				default:
					brMin = 0;
					brMax = 0;
					break;
			}
			this.addMagic(randomInt(brMin, brMax));
		};

		this.cancel = function() {
			TweenMax.killTweensOf(fill);
			TweenMax.killTweensOf(brEmptyText);
			TweenMax.killTweensOf(brFullText);
			TweenMax.killTweensOf(brValues);
			this.magic = 0;
			this.calcSuccess();
			fill.css("top", 143);
			brEmptyText.css("top", 217);
			brFullText.css("top", 291);
			brEmptyText.css("display", "initial");
			brFullText.css("display", "none");
			scope.brEmpty = 100;
			scope.brFull = 0;
			brValues.empty = 100;
			brValues.full = 0;
			this.selectedElixir = null;
		}

		this.begin = function() {
			
		}
	}]);
})();
