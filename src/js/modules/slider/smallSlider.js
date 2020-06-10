import Slider from "./slider";

export default class SmallSlider extends Slider {
	constructor({ activeClass = null, autoPlay = false, animation = false, ...options } = {}) {
		try {
			super(options);
			this.autoPlay = autoPlay;
			this.activeClass = activeClass;
			this.animation = animation;
			this.button = this.container.querySelector("button");
		} catch (error) {}
	}

	decorizeSlides() {
		const activeSlide = this.slides[0];

		for (const slide of this.slides) {
			slide.classList.remove(this.activeClass);
			if (this.animation) {
				slide.querySelector(".card__title").style.opacity = 0.4;
				slide.querySelector(".card__controls-arrow").style.opacity = 0;
			}
		}

		activeSlide.classList.add(this.activeClass);
		if (this.animation) {
			activeSlide.querySelector(".card__title").style.opacity = 1;
			activeSlide.querySelector(".card__controls-arrow").style.opacity = 1;
		}
	};

	autoSlide() {
		this.animation = setInterval(() => {
			this.nextSlide();
		}, 5000);
	};

	nextSlide() {
		this.button ? this.container.insertBefore(this.slides[0], this.button) : this.container.appendChild(this.slides[0]);
		this.decorizeSlides();
	};

	bindTriggers() {
		this.next.addEventListener("click", () => this.nextSlide());

		this.prev.addEventListener("click", () => {
			this.button ? this.container.insertBefore(this.button.previousElementSibling, this.container.firstElementChild) : this.container.insertBefore(this.container.lastElementChild, this.container.firstElementChild)
			this.decorizeSlides();
		})
	};

	init() {
		try {
			this.container.style.cssText = `
			display: flex;
			flex-wrap: wrap;
			overflow: hidden;
			align-items: flex-start;
			`;

			this.bindTriggers();
			this.decorizeSlides();

			if (this.autoPlay) {
				this.autoSlide();

				for (const element of [this.next, this.prev, this.container]) {
					element.addEventListener("mouseover", () => {
						clearInterval(this.animation);
					})
					element.addEventListener("mouseout", () => {
						this.autoSlide();
					})
				};
			};
		} catch (error) {}
	};
};