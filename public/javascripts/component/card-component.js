import AbstractView from '../component/abstract-view.js';

export default class cardComponent extends AbstractView {
	constructor(rootSeletor) {
		super(rootSeletor);
	}
	// implemented function
	// root : carousel box
	initElement(root) {
		this.dom = {
			card_box : root,
		};

		this.template = {
			cardTemplate: `
			<div class="card_item ship-card" id="{id}">
				<div class="card_clickable">
					<div class="card_title">{title}</div>
				</div>
				<div class="card_content">
					<ul id="ship-group" class="dot_box">
					</ul>
				</div>
			</div>
			`
		};
	}

	bindEvent(){
		this.dom.card_box.addEventListener('click', (e) => {
			console.log("event name in ", e.target);
			this.emit('EVENT_NAME');
		});
	}

	/**
	 * 화면에 카드들을 렌더링 
	 *
	 * @param {Array} cardArr
	 * @memberof cardComponent
	 */
	 initCard(cardInfo) {
		let card = "";
	
		let cardTemplate = this.template.cardTemplate;
		cardTemplate = cardTemplate.replace('{id}', `card_${cardInfo.id}`);
		cardTemplate = cardTemplate.replace('{title}', `${cardInfo.title}`);
		card += cardTemplate;
		
		this.dom.card_box.insertAdjacentHTML('beforeend',card);
		this.dom.card = this.dom.card_box.querySelector(`#card_${cardInfo.id}`);
		//console.log("value check : " ,this.dom.card)
	} 
}
