export default class Download {
	constructor(triggers) {
		this.triggers = document.querySelectorAll(triggers);
		this.path = 'assets/img/talk_bg.jpg';
	}

	downloadFile(path) {
		let link = document.createElement("a");

		link.setAttribute("href", path);
		link.setAttribute("download", "random_pic");
		link.style.display = "none";
		
		document.body.appendChild(link);

		link.click();

		document.body.removeChild(link);
	}
	
	init() {
		this.triggers.forEach(trigger => {
			trigger.addEventListener("click", () => {
				this.downloadFile(this.path);
			})
		})
	}
}