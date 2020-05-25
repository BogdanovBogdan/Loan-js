import MainSlider from "./modules/slider/MainSlider";
import VideoPlayer from "./modules/playVideo";

window.addEventListener("DOMContentLoaded", () => {
	const mainSlider = new MainSlider({container: ".page", btns: ".next"});
	mainSlider.render();

	const player = new VideoPlayer(".showup .play", ".overlay");
	player.init();
});