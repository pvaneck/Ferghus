// Helper functions
var mt = new MersenneTwister();
function randomInt(min, max) {
	return Math.floor(mt.random() * (max - min + 1) + min);
}
function randomFloat(min, max) {
	return mt.random_incl() * (max - min) + min;
}

// Manual .active for buttons (fixes Firefox)
var lastActive = null;
$('.canClick').mousedown(function(e) {
	lastActive = $(this);
	lastActive.addClass('active');
});
$('body').mouseup(function(e) {
	if (lastActive !== null)
		lastActive.removeClass('active');
});

// Prevent text selection
$('body *').not(':has(.canType)').not('.canType').mousedown(function(e) {
	e.preventDefault();
});

// Endless sway ease for BG
function bgSway() {
	var bg = $('#bg');
	TweenMax.to(bg, 12, {x:64, ease:Sine.easeInOut});
	TweenMax.to(bg, 12, {x:-64, ease:Sine.easeInOut, delay: 12, onComplete:bgSway});
}
bgSway();

// Audio initializing and toggling
var audioAmbience; // See page-specific JS
var audioEnhance = setAudio('enhance');
var mute = $('#mute');
var muted = false;

function setAudio(file) {
	var audio = new Audio();
	if (audio.canPlayType('audio/ogg'))
		return new Audio('assets/sound/' + file + '.ogg');
	else
		return new Audio('assets/sound/' + file + '.mp3');
}

mute.click(function () {
	muted = !muted;
	if (muted) {
		$(this).css('opacity', '0.5');
		audioAmbience.volume = 0;
	} else {
		$(this).css('opacity', '1');
		audioAmbience.volume = ambienceVolume;
	}
});

// On-load logic
$(document).ready(function () {
	audioAmbience.volume = ambienceVolume;
	audioAmbience.play();

	// Gapless audio looping
	audioAmbience.addEventListener('timeupdate', function() {
	    var buffer = .44;
	    if(this.currentTime > this.duration - buffer) {
	        this.currentTime = 0;
	        this.play();
	    }
	}, false);
});
