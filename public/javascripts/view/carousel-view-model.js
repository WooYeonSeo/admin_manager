export default class CarouselViewModel extends EventEmitter {
	constructor(model) {
		super();
		this.model = model;

		this.sliderState = {
			presentIdx: 0,
		};
	}

	changeImgIndex(moveIdx) {
		const { presentIdx } = this.sliderState;
		let nextIndex = presentIdx + moveIdx;
		let maxlength = 5;
		if(nextIndex < 0){
			nextIndex = maxlength; // last length;
		}else if(nextIndex > maxlength){
			nextIndex = 0; // last length;
		}
		//setImg 
		this.sliderState.presentIdx = nextIndex;
		this.emit('CHANGE_IMG_IDX');
	}

	getImgInfo() {
		return this.model.getImgInfo(this.sliderState.presentIdx);
	}
}