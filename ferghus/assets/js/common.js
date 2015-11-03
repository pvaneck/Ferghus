function bgSway() {
	var bg = $("#bg");
	TweenMax.to(bg, 12, {x:48, ease:Sine.easeInOut});
	TweenMax.to(bg, 12, {x:-48, ease:Sine.easeInOut, delay: 12, onComplete:bgSway});
}
bgSway();
