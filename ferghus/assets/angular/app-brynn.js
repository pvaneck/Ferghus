/** Angular App Code */
(function() {
	var app = angular.module('brynn', [ ]);

	app.controller('EnchantController', function() {
		this.magic = 0;
		this.successStart = 25;
		this.successEnd = 40;
		this.success = this.successStart;
		var fill = $("#fill");
		this.selectedElixir = null;

		this.calcSuccess = function() {
			this.success = Math.floor(this.successStart + (this.successEnd - this.successStart) * (this.magic / 100.0));
		}

		this.addMagic = function(br) {
			this.magic = this.magic + br;
			this.calcSuccess();
			var fillTop = Math.max(143 - 143 * (this.magic / 100), 0);
			TweenMax.to(fill, 0.5, {top:fillTop, ease:Power4.easeOut});
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

		this.begin = function() {
			
		}

		this.cancel = function() {
			this.magic = 0;
			this.calcSuccess();
			fill.css("top", 143);
			this.selectedElixir = null;
		}
	})
})();
