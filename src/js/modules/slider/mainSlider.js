import Slider from "./slider";

export default class MainSlider extends Slider {
	constructor({ nextBtn = null, prevBtn = null, ...options }) {
		super(options);
		this.nextBtns = document.querySelectorAll(nextBtn);
		this.prevBtns = document.querySelectorAll(prevBtn);
		try { this.widget = document.querySelector(".hanson") } catch (error) { }
	}

	showSlide(n) {
		if (n > this.slides.length) {
			this.slideIndex = 1;
		} else if (n < 1) {
			this.slideIndex = this.slides.length;
		}

		try {
			this.widget.style.opacity = "0";

			if (n === 3) {
				this.widget.classList.add("animated");
				setTimeout(() => {
					this.widget.style.opacity = "1";
					this.widget.classList.add("fadeInUp");
				}, 3000)
			} else {
				this.widget.style.opacity = "0";
				this.widget.classList.remove("fadeInUp");
			}
		} catch (error) { }

		this.slides.forEach(slide => {
			slide.style.display = "none";
		});

		this.slides[this.slideIndex - 1].style.display = "block";
	};

	toSlide(n) {
		this.showSlide(this.slideIndex += n);
	};

	bindTriggers() {
		this.btns.forEach(btn => {
			btn.addEventListener("click", () => this.toSlide(1));

			btn.parentElement.previousElementSibling.addEventListener("click", (e) => {
				e.preventDefault();
				this.showSlide(this.slideIndex = 1);
			});
		});

		try {
			this.nextBtns.forEach(nextBtn => {
				nextBtn.addEventListener("click", () => this.toSlide(1))
			})

			this.prevBtns.forEach(prevBtn => {
				prevBtn.addEventListener("click", () => this.toSlide(-1))
			})
		} catch (e) { }
	}

	render() {
		if (this.container) {
			this.bindTriggers();
			this.showSlide(this.slideIndex);
		}
	};
}