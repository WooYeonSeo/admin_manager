export default class CardCarouselViewModel extends EventEmitter {
	constructor(model) {
		super();
		this.model = model;

		this.sliderState = {
			presentIdx: 0,
			offset : 0,
			dotIdx : 0,
		};
	}

	// functions
	getCardData(){
		return this.model.getCardData();
		//this.model.getImgInfo(this.sliderState.presentIdx);
		//return this.model.getCardData();
		// this.sliderState.presentIdx;
	}

	/**
	 * dot data object return
	 *
	 * @returns
	 * @memberof CardCarouselViewModel
	 */
	getCardDotData(){
		let [dotdata] = this.model.getCardDotData();
		//console.log("in view model :" ,dotdata);
		return dotdata;
	}


}