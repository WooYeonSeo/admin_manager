import AbstractView from '../component/abstract-view.js';

export default class DotComponent extends AbstractView {
	constructor(rootSeletor) {

		super(rootSeletor);
	}

	initElement(rootEl) {
		this.dom = {
			dotBox: rootEl.querySelector('.card_content'),
			dotsInnerBox: rootEl.querySelector('.dot_box'),
		};

		this.template = {
			dotTemplate: `
                <li class="dot off" role="tab" data-page="{index}">
                    <a href='#'></a>
                </li>
			`
		};
	}

	bindEvent() {
		//this.dom.dotsInnerBox.addEventListener('click', (e) => this.emit('ACTIVE_DOT',e));
	}

	/**
	 * 카드에 해당하는 dot 배열을 받아서 dot 생성
	 *
	 * @param {Array} dotArr
	 * @memberof DotComponent
	 */
	initDot(dotArr) {
		let dotsHtml = "";
	
		for (const dot of dotArr) {
			let dotTemplate = this.template.dotTemplate;
			dotTemplate = dotTemplate.replace('{index}', `${dot.idx}`);
			dotsHtml += dotTemplate;
		}
		this.dom.dotsInnerBox.innerHTML = dotsHtml;
		this.dom.dots = this.dom.dotsInnerBox.children;
	}

	activeDot(index) {
		const activeClass = 'on';

		[...this.dom.dots].forEach(dot => {
			if (parseInt(dot.dataset.index, 10) === index ) {
				dot.classList.add(activeClass);
			} else {
				dot.classList.remove(activeClass);
			}
		});
	}
}