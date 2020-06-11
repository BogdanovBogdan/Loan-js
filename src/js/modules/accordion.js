export default class Accordion {
	constructor(trigger, message) {
		this.trigger = document.querySelector(trigger),
		this.message = document.querySelector(message)
	}

	init() {
		const durationTime = 500, // miliseconds
				messageStyle = this.message.style,
				marginMsg = window.getComputedStyle(this.message).marginTop;

		messageStyle.maxHeight = '0px';
		messageStyle.marginTop = '0px';
		messageStyle.transition = `all ${durationTime / 1000}s`;
		messageStyle.overflow = 'hidden'
		
		this.trigger.addEventListener("click", () => {
			if (window.getComputedStyle(this.message).display === "none") {
				messageStyle.display = "block";
				messageStyle.maxHeight = this.message.scrollHeight + "px";
				messageStyle.marginTop = marginMsg;
			} else {
				messageStyle.maxHeight = messageStyle.marginTop = '0px';
				setTimeout(() => {
					messageStyle.display = "none";
				}, durationTime)
			}
		});
	}

	// this.nextElementSibling.style.maxHeight = this.nextElementSibling.scrollHeight + 80 + "px";
	// this.nextElementSibling.style.maxHeight = "0px";
	
}