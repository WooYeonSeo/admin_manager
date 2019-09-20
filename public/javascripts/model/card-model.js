export default class CardModel {
	constructor(initialData = []) {
		this.cardData = initialData;
		console.log(initialData);
	}

	getCardDataLength() {
		return this.cardData.length;
	}

	getCardInfo(index) {
		return this.cardData[index];
	}

	getCardData() {
		let [datalist] = this.cardData;
		let cardTitleData = [];
		let i =0;
		for (const key in datalist) {
			if (datalist.hasOwnProperty(key)) {
				const card = datalist[key];
				let item ={
					"id"    : i,
					"title" : key,
					"img" : card[0].cardimg
				}
				i++;
				cardTitleData.push(item);
			}
		}
		
		return cardTitleData;
	}

	getCardDotData() {
		return [...this.cardData];
	}

	setImgData(item) {
		this.cardData.push(item);
	}

	getImgData(){
		let [datalist] = this.cardData;
		let imgData = [];
		let i =0;
		for (const key in datalist) {
			if (datalist.hasOwnProperty(key)) {
				for (const caitem of datalist[key]) {
					imgData.push(caitem.image)
				}
			}
		}
		return imgData;
	}

	/**
	 * 카드의 가장 첫번째 인덱스 번호를 알아낸다
	 *
	 * @param {*} cardid
	 * @returns
	 * @memberof CardModel
	 */
	getFirstIdx(cardid){
		let [datalist] = this.cardData;
		let imgData = [];
		let key = Object.keys(datalist)[cardid];
		let cardArr = datalist[key];
		return cardArr[0].idx;
	}
}