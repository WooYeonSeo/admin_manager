export default class AbstractView extends EventEmitter{
	constructor(rootSeletor, observer) {
		super();
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