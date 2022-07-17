import { LightningElement, track } from 'lwc';
export default class bitcoinComponent extends LightningElement {
	BTCVALUE;
	lastUpdatedDateTime;
	loading = true;
	updateButton() {
		fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
			.then(response => response.json())
			.then(data => {
				this.BTCVALUE = data.bpi.USD.rate_float;	//display price
				this.loading = false;	// hide loading spinner
				this.lastUpdatedDateTime = new Date().getTime()
				console.log(this.BTCVALUE);
			}).catch((error) => {
				console.log(error)
			});
	}
	connectedCallback() { this.updateButton() }
}