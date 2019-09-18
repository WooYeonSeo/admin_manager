export default class CarouselViewModel extends EventEmitter {
	constructor(model) {
		super();
		this.model = model;

		this.sliderState = {
			presentIdx: 0,
			offset : 0
		};
	}

	changeImgIndex(moveIdx) {
		const { presentIdx } = this.sliderState;
		let nextIndex = presentIdx + moveIdx;
		let maxlength = 6;
		let maxwidth = (maxlength)*410; // this.itemLength * this.itemWidth; 숫자 빼자.. 
		
		//setImg 
		this.sliderState.presentIdx = nextIndex;
		if(moveIdx < 0){
			this.sliderState.offset +=  410;
		}else{
			this.sliderState.offset -=  410;
		}
		let endflag = false;
		this.emit('CHANGE_IMG_IDX',endflag );

		this.setEdgeOffset(nextIndex,maxlength);
	}

	setEdgeOffset(nextIndex,maxlength){
		let endflag = false;
		if(nextIndex <=0){
			nextIndex = maxlength; 
			this.sliderState.presentIdx = maxlength;
			this.sliderState.offset = -2050;
			endflag = true;
			this.emit('CHANGE_IMG_IDX',endflag );
		}else if(nextIndex >= maxlength){
			nextIndex = 0; 
			this.sliderState.presentIdx = 0;
			this.sliderState.offset = 0;
			endflag = true; //getImgInfo()
			this.emit('CHANGE_IMG_IDX',endflag );
		}
		console.log("presentIdx1 :"+ this.sliderState.presentIdx);
		console.log("this.offset : ", this.sliderState.offset);
	}

	getImgInfo() {
		return this.model.getImgInfo(this.sliderState.presentIdx);
	}

	getOffset() {
		return this.sliderState.offset;
	}

	getIdx() {
		return this.sliderState.presentIdx;
	}

	getImgData() {
		return this.model.getImgData();
	}
}