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
}