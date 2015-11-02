function bgSway() {
	var bg = $("img.bg");
	TweenMax.to(bg, 8, {left:32, ease:Power1.easeInOut});
	TweenMax.to(bg, 8, {left:-32, ease:Power1.easeInOut, delay: 8, onComplete:bgSway});
}
bgSway();