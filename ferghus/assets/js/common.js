function bgSway() {
	var bg = $("img.bg");
	TweenMax.to(bg, 12, {x:64, ease:Sine.easeInOut});
	TweenMax.to(bg, 12, {x:-64, ease:Sine.easeInOut, delay: 12, onComplete:bgSway});
}
bgSway();