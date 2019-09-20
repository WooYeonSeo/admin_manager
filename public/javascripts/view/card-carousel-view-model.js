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

	changeImgIndex(moveIdx) {
		const { presentIdx } = this.sliderState;
		let nextIndex = presentIdx + moveIdx;
		let maxlength = 17;
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

	changeImgIndexMany(cardid) {
		let destIdx = this.setCarouselIdx(cardid)
		const { presentIdx } = this.sliderState;
		let moveIdx = this.checkDirection(destIdx,presentIdx);
		let nextIndex = presentIdx + moveIdx;
		let maxlength = 17;
		let maxwidth = (maxlength)*410; // this.itemLength * this.itemWidth; 숫자 빼자.. 
		//setImg 
		this.sliderState.presentIdx = nextIndex;
		if(moveIdx < 0){
			this.sliderState.offset += 410*-moveIdx;
		}else{
			this.sliderState.offset -= 410*moveIdx;
		}
		let endflag = false;

		this.setEdgeOffset(nextIndex,maxlength);
		this.emit('CHANGE_IMG_IDX',endflag );
	}

	checkDirection(destIdx,presentIdx){
		let right, left = 0;
		let maxlength = 17;
		destIdx = Number(destIdx);
	
		if(destIdx < presentIdx){
			right = (maxlength - presentIdx) + destIdx;
			left = presentIdx - destIdx;
		}else{
			right = destIdx - presentIdx;
			left = presentIdx + (maxlength-destIdx); // 0 17-4
		}

		if(right < left){
			return right
		}else {
			return -left;
		}
	}

	setEdgeOffset(nextIndex,maxlength){
		let endflag = false;
		console.log("nextIndex " ,nextIndex);
		if(nextIndex <=0){
			nextIndex = maxlength; 
			this.sliderState.presentIdx = maxlength;
			this.sliderState.offset = -( (maxlength-1) * 410);
			endflag = true;
			this.emit('CHANGE_IMG_IDX',endflag );
		}else if(nextIndex >= maxlength){
			nextIndex = 0; 
			this.sliderState.presentIdx = 0;
			this.sliderState.offset = 0;
			endflag = true; //getImgInfo()
			this.emit('CHANGE_IMG_IDX',endflag );
		}
	}


	getOffset() {
		return this.sliderState.offset;
	}

	getIdx() {
		return this.sliderState.presentIdx;
	}

	// functions
	getCardData(){
		return this.model.getCardData();
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

	/**
	 * get carousel image data by Array
	 *
	 * @returns
	 * @memberof CardCarouselViewModel
	 */
	getImgInfo(){
		let imgData = this.model.getImgData();
		return imgData;
	}

	/**
	 * 카드 id의 첫번째 idx를 얻기.
	 *
	 * @param {*} cardid
	 * @returns
	 * @memberof CardCarouselViewModel
	 */
	setCarouselIdx(cardid){
		return this.model.getFirstIdx(cardid);
	}

	/**
	 * 현재 이미지 인덱스 얻기.
	 *
	 * @returns
	 * @memberof CardCarouselViewModel
	 */
	getImgIndex() {
		return this.sliderState.presentIdx;
	}

}