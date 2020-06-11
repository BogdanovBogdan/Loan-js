export default class Accordion {
	constructor(triggers) {
		this.triggers = document.querySelectorAll(triggers)
	}

	init() {
		this.triggers.forEach(trigger => {
			const durationTime = 500, // miliseconds
				message = trigger.closest(".module__info-show").nextElementSibling,
				marginMsg = window.getComputedStyle(message).marginTop;

			message.style.maxHeight = '0px';
			message.style.marginTop = '0px';
			message.style.transition = `all ${durationTime / 1000}s`;
			message.style.overflow = 'hidden'

			trigger.addEventListener("click", () => {
				if (window.getComputedStyle(message).display === "none") {
					message.style.display = "block";
					message.style.maxHeight = message.scrollHeight + "px";
					message.style.marginTop = marginMsg;
				} else {
					message.style.maxHeight = message.style.marginTop = '0px';
					setTimeout(() => {
						message.style.display = "none";
					}, durationTime)
				}
			});
		})

	}

	// this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
	// this.nextElementSibling.style.maxHeight = "0px";

}