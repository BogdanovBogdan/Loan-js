export default class Form {
	constructor() {
		this.forms = document.querySelectorAll("form");
		this.message = {
			success: "Данные успешно отправленны",
			failure: "Ошибка отправки данных",
			loading: "Загрузка..."
		};
		this.url = "assets/question.php";
	}

	async postData(url, data) {
		const response = await fetch(url, {
			method: "POST",
			body: data,
		});

		return await response.text();
	}

	postForm(form) {
		const formData = new FormData(form);

		const textMess = document.createElement("div");
		textMess.innerText = this.message.loading;
		textMess.style.cssText = `
			font-size: 18px;
			margin-top: 15px;
			display: inline-block;
			padding: 5px 10px;
			background-color: #9ec73d;
			border-radius: 4px;
		`;
		form.parentNode.appendChild(textMess);

		this.postData(this.url, formData)
			.then(res => {
				console.log(res)
				form.querySelectorAll("input").forEach(input => input.value = '');
				textMess.innerText = this.message.success;
			})
			.catch(error => {
				console.error(`Error: ${error}`)
				textMess.innerText = this.message.failure;
			})
			.finally(() => setTimeout(() => { textMess.remove() }, 5000));
	}

	checkMailInputs() {
		const mailInputs = document.querySelectorAll("[type='email']");

		mailInputs.forEach(input => {
			input.addEventListener("input", (e) => {
				e.preventDefault();
				if (input.value.match(/[а-яё]/gi)) {
					input.value = "";
					alert("Cyrillic characters are not allowed");
				}
			})
		})
	}

	initMask() {
		const setCursorPosition = (pos, elem) => {
			elem.focus();

			if (elem.setSelectionRange) {
				elem.setSelectionRange(pos, pos);
			} else if (elem.createTextRange) {
				let range = elem.createTextRange();

				range.collapse(true);
				range.moveEnd("character", pos);
				range.moveStart("character", pos);
				range.select();
			}
		}
		
		const createMask = function(event) {
			
			let matrix = "+1 (___) ___-____",
				 i = 0,
				 def = matrix.replace(/\D/g, ""),
				 val = this.value.replace(/\D/g, "");
			
			if (def.length >= val.length) val = def;

			this.value = matrix.replace(/./g, symbol => {
				return /[_\d]/.test(symbol) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : symbol;
			})

			if (event.type === "blur") {
				if (this.value.length === 2) this.value = "";
			} else {
				setCursorPosition(this.value.length, this);
			}
		}

		const inputs = document.querySelectorAll("[name='phone']");

		inputs.forEach(input => {
			["input", "focus", "blur"].forEach(event => input.addEventListener(event, createMask));

			["click", "keyup"].forEach(eventName => {
				input.addEventListener(eventName, function() {setCursorPosition(this.value.length, this)});
			});
		})
	}

	init() {
		for (const form of this.forms) {
			form.addEventListener("submit", (e) => {
				e.preventDefault();
				this.postForm(form);
			});
		};

		this.checkMailInputs();
		this.initMask();
	}
}