export default class VideoPlayer {
	constructor(triggers, modal) {
		this.triggers = document.querySelectorAll(triggers);
		this.modal = document.querySelector(modal);
		this.close = this.modal.querySelector('.close');
		this.isCreatedPlayer = false;
		this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
	};

	bindTriggers() {
		this.triggers.forEach((trigger, i) => {

			if (i % 2 === 1) {
				trigger.parentElement.setAttribute("data-disabled", "true");
			}

			trigger.addEventListener("click", () => {
				this.isDisabled = trigger.parentElement.getAttribute("data-disabled");

				if (!this.isDisabled || this.isDisabled === "false") {
					this.disabledActiveVideo = trigger.parentElement.nextElementSibling;
					this.iconPlay = trigger.querySelector(".play__circle").querySelector("svg").cloneNode(true);

					const path = trigger.getAttribute("data-url");

					if (!this.isCreatedPlayer) {
						this.createPlayer(path);
						this.isCreatedPlayer = true;
					} else {
						this.player.loadVideoById({ videoId: path })
					}

					this.modal.style.display = "flex";
				}
			})
		})
	}

	createPlayer(url) {
		this.player = new YT.Player('frame', {
			height: '100%',
			width: '100%',
			playerVars: { 'autoplay': 0 },
			videoId: url,
			events: {
				'onStateChange': this.onPlayerStateChange
			}
		});
	};

	onPlayerStateChange(state) {
		try {
			if (state.data === YT.PlayerState.ENDED && !this.isDisabled) {
				this.disabledActiveVideo.setAttribute("data-disabled", "false");
				this.disabledActiveVideo.style.opacity = 1;
				this.disabledActiveVideo.style.filter = "none";
				this.disabledActiveVideo.querySelector(".play__circle").classList.remove("closed");
				this.disabledActiveVideo.querySelector(".play__circle").innerHTML = "";
				this.disabledActiveVideo.querySelector(".play__circle").appendChild(this.iconPlay);
				this.disabledActiveVideo.querySelector(".play__text").classList.remove("attention");
				this.disabledActiveVideo.querySelector(".play__text").innerText = "Play video";
			}
		} catch (error) {}
	}

	actionModal() {
		this.modal.addEventListener("click", (e) => {
			if (e.target === this.modal || e.target.closest(".close")) {
				this.modal.style.display = "none";
				this.player.stopVideo()
			}
		})
	}

	init() {
		if (this.triggers.length) {
			const tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
	
			const firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	
			this.bindTriggers();
			this.actionModal();
		}
	};
}