import AbstractView from '../component/abstract-view.js';

export default class cardComponent2 extends AbstractView {
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
		
	}
	
	bindActiveEvent(){
		this.dom.card_box.addEventListener('click', (e) => this.emit('CHANGE_IMG_FIRST',e));
	}

	/**
	 * 화면에 카드들을 렌더링 
	 *
	 * @param {Array} cardArr
	 * @memberof cardComponent
	 */
	 initCard(cardArr) {
		let cardlist = "";
	
		for (let card of cardArr) {
			let cardTemplate = this.template.cardTemplate;
			cardTemplate = cardTemplate.replace('{id}', `card_${card.id}`);
			cardTemplate = cardTemplate.replace('{title}', `${card.title}`);
			cardlist += cardTemplate;
		}
		
		this.dom.card_box.innerHTML =cardlist;
		this.dom.card = this.dom.card_box.children;
		//console.log("value check : " ,this.dom.card)
		this.bindActiveEvent();
	} 

	
}
