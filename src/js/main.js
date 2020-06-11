import MainSlider from "./modules/slider/MainSlider";
import SmallSlider from "./modules/slider/smallSlider";
import VideoPlayer from "./modules/playVideo";
import Difference from "./modules/difference";
import Form from "./modules/form";
import Accordion from "./modules/accordion";

window.addEventListener("DOMContentLoaded", () => {
	new MainSlider({container: ".page", btns: ".sidecontrol .next"}).render();

	new MainSlider({
		container: ".moduleapp", 
		btns: ".sidecontrol .next",
		nextBtn: ".nextmodule",
		prevBtn: ".prevmodule"
	}).render();

	new SmallSlider({
		container: ".showup__content-slider",
		next: ".showup__next",
		prev: ".showup__prev",
		activeClass: "card-active",
		animation: true
	}).init();

	new SmallSlider({
		container: ".modules__content-slider",
		next: ".modules__info-btns .slick-next",
		prev: ".modules__info-btns .slick-prev",
		activeClass: "card-active",
		animation: true,
		autoPlay: true
	}).init();
	
	new SmallSlider({
		container: ".feed__slider",
		next: ".feed__slider .slick-next",
		prev: ".feed__slider .slick-prev",
		activeClass: "feed__item-active",
	}).init();

	new VideoPlayer(".showup .play", ".overlay").init();

	new VideoPlayer(".module__video-item .play", ".overlay").init();

	new Difference (".officerold", ".officernew", ".officer__card-item", ".plus").init();

	new Form().init();

	new Accordion(".module__info-show .plus", ".module__info-show + .msg").init();
});