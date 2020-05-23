
export default class Slider {
	constructor(page, btns) {
		this.page = document.querySelector(page);
		this.slides = this.page.children;
		this.btns = document.querySelectorAll(btns);
		this.slideIndex = 1;
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
		} catch (error) {
			console.log(`An error occurred while getting the variable this.widget: ${error}`);
		}

		this.slides.forEach(slide => {
			slide.style.display = "none";
		});

		this.slides[this.slideIndex - 1].style.display = "block";
	};

	plusSlide(n) {
		this.showSlide(this.slideIndex += n);
	};

	render() {
		try {
			this.widget = document.querySelector(".hanson");
		} catch (error) {console.log(`An error occurred while getting the variable this.widget: ${error}`);}

		this.btns.forEach(btn => {
			btn.addEventListener("click", () => {
				this.plusSlide(1);
			});

			btn.parentElement.previousElementSibling.addEventListener("click", (e) => {
				e.preventDefault();
				this.showSlide(this.slideIndex = 1);
			});
		});


		this.showSlide(this.slideIndex);
	};
};