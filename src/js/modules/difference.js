export default class Difference {
	constructor(officerOld, officerNew, item, trigger) {
		try {
			this.officerOld = document.querySelector(officerOld);
			this.officerNew = document.querySelector(officerNew);
			this.itemSelector = item;
			this.triggerSelector = trigger;
		} catch (error) { }
	}

	bindTriggers(container) {
		let index = 0;

		container.querySelector(this.triggerSelector).addEventListener("click", () => {
			const items = container.querySelectorAll(this.itemSelector);

			items[index].style.display = "flex";
			items[index].classList.add("animated", "fadeIn");
			items[index].style.setProperty("animation-delay", ".4s");

			items[items.length - 1].style.opacity = 1;
			items[items.length - 1].classList.add("animated", "fadeInDown");
			setTimeout(() => {
				items[items.length - 1].classList.remove("fadeInDown");
			}, 1000)

			index++;

			if (index == items.length - 1) items[index].style.display = "none";
		})
	};

	hideItems(container) {
		container.querySelectorAll(this.itemSelector).forEach((item, i, arr) => {
			if (i !== arr.length - 1) {
				item.style.display = "none";
			}
		})
	}

	init() {
		try {
			this.hideItems(this.officerOld);
			this.hideItems(this.officerNew);
			this.bindTriggers(this.officerOld);
			this.bindTriggers(this.officerNew);
		} catch (error) {}
	};

}