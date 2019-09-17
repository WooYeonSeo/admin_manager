export default class AbstractView {
	constructor(rootSeletor, observer) {
		const rootElement = document.querySelector(rootSeletor);
		this.observer = observer;

		this.initElement(rootElement);
		this.bindEvent();
	}

	initElement(rootElement) {
		this.dom = {};
		this.template = {};
	}

	bindEvent() {
	}
}