/** Angular App Code */
(function() {
	var app = angular.module('brynn', [ ]);

	app.controller('EnchantController', function() {
		this.magic = 0;
		this.successStart = 25;
		this.successEnd = 40;
		this.success = this.successStart;

		this.calcSuccess = function() {
			this.success = Math.floor(this.successStart + (this.successEnd - this.successStart) * (this.magic / 100.0));
		}

		this.addMagic = function(br) {
			this.magic = this.magic + br;
			this.calcSuccess();
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
					break;
			}
			this.addMagic(randomInt(brMin, brMax));
		};

		this.begin = function() {
			
		}

		this.cancel = function() {
			this.magic = 0;
			this.calcSuccess();
		}
	})
})();
