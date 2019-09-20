import AbstractView from '../component/abstract-view.js';

export default class DotComponent extends AbstractView {
	constructor(rootSeletor) {

		super(rootSeletor);
	}

	initElement(rootEl) {
		this.dom = {
			cardBox : rootEl,
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
	 * @param {Object} dots
	 * @memberof DotComponent
	 */
	initDot(dots) {
		let keys = Object.keys(dots);
		let cardElements = this.dom.cardBox.querySelectorAll(".card_item");
		for (let i = 0; i < keys.length; i++) {
			let dotsHtml = "";
			let cardDotBox = cardElements[i].querySelector('.card_content ul');

			for (const dot of dots[keys[i]]) {
				let dotTemplate = this.template.dotTemplate;
				dotTemplate = dotTemplate.replace('{index}', `${dot.idx}`);
				dotsHtml += dotTemplate;
			}

			cardDotBox.innerHTML = dotsHtml;
			this.dom.dots =[];
			 this.dom.cardBox.querySelectorAll('.dot_box').forEach((item)=>{
				this.dom.dots = [ ...this.dom.dots , ...item.children];
			});
		}
	}

	/**
	 * 변경되야 하는 dot index를 받아서 활성화시켜준다
	 *
	 * @param {*} index
	 * @memberof DotComponent
	 */
	updateDot(index) {
		const activeClass = 'on';
		const inactiveClass = 'off';
		[...this.dom.dots].forEach(dot => {
			if (parseInt(dot.dataset.page, 10) === index ) {
				dot.classList.add(activeClass);
				dot.classList.remove(inactiveClass);
			} else {
				dot.classList.remove(activeClass);
				dot.classList.add(inactiveClass);
			}
		});
	}
}