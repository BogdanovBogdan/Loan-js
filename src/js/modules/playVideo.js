export default class VideoPlayer {
	constructor(triggers, modal) {
		this.triggers = document.querySelectorAll(triggers);
		this.modal = document.querySelector(modal);
		this.close = this.modal.querySelector('.close');
		this.isCreatedPlayer = false;
	};

	bindTriggers() {
		this.triggers.forEach(trigger => {
			trigger.addEventListener("click", () => {
				
				if (!this.isCreatedPlayer) {
					const path = trigger.getAttribute("data-url");
					this.createPlayer(path); 
					this.isCreatedPlayer = true;
				}
				
				this.modal.style.display = "flex";
			})
		})
	}

	actionModal() {
		this.modal.addEventListener("click", (e) => {
			if (e.target === this.modal || e.target.closest(".close")) {
				this.modal.style.display = "none";
				this.player.pauseVideo();
			}

		})
	}

	createPlayer(url) {
		this.player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			videoId: url,
		});

	};

	init() {
		const tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";

		const firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		this.bindTriggers();
		this.actionModal();
	};
}