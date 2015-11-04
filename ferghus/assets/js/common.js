// Helper functions
var mt = new MersenneTwister();
function randomInt(min, max) {
	return Math.floor(mt.random() * (max - min + 1) + min);
}
function randomFloat(min, max) {
	return mt.random() * (max - min) + min;
}

// Manual .active for buttons (fixes Firefox)
var lastActive = null;
$(".canClick").mousedown(function(e) {
	lastActive = $(this);
	lastActive.addClass("active");
});
$("body").mouseup(function(e) {
	lastActive.removeClass("active");
});

// Prevent text selection
$("body").mousedown(function(e) {
	e.preventDefault();
});

// Endless sway ease for BG
function bgSway() {
	var bg = $("#bg");
	TweenMax.to(bg, 12, {x:64, ease:Sine.easeInOut});
	TweenMax.to(bg, 12, {x:-64, ease:Sine.easeInOut, delay: 12, onComplete:bgSway});
}
bgSway();

// Audio toggling
var amb = $("#amb");
var mute = $("#mute");
var muted = false;

mute.click(function () {
	muted = !muted;
	if (muted) {
		$(this).css("opacity", "0.5");
		amb.prop("volume", 0);
	} else {
		$(this).css("opacity", "1");
		amb.prop("volume", amb_volume);
	}
});

// On-load logic
$(document).ready(function () {
	if (amb) {
		amb.prop("volume", amb_volume);
	}
});
