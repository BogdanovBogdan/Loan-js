import MainSlider from "./modules/slider/MainSlider";
import SmallSlider from "./modules/slider/smallSlider";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Form from "./modules/form";

window.addEventListener("DOMContentLoaded", () => {
	const mainSlider = new MainSlider({container: ".page", btns: ".next"});
	mainSlider.render();

	const sliderShowUp = new SmallSlider({
		container: ".showup__content-slider",
		next: ".showup__next",
		prev: ".showup__prev",
		activeClass: "card-active",
		animation: true
	});
	sliderShowUp.init();

	const sliderModules = new SmallSlider({
		container: ".modules__content-slider",
		next: ".modules__info-btns .slick-next",
		prev: ".modules__info-btns .slick-prev",
		activeClass: "card-active",
		animation: true,
		autoPlay: true
	});
	sliderModules.init();

	const sliderFeed = new SmallSlider({
		container: ".feed__slider",
		next: ".feed__slider .slick-next",
		prev: ".feed__slider .slick-prev",
		activeClass: "feed__item-active",
	});
	sliderFeed.init();

	const player = new VideoPlayer(".showup .play", ".overlay");
	player.init();

	new Difference (".officerold", ".officernew", ".officer__card-item", ".plus").init();

	new Form().init();
});