import {LightningElement,track} from 'lwc';
export default class bitcoinComponent extends LightningElement {
	@track BTCVALUE;
	loading = true;
	updateButton(){
		const d = new Date().getTime()
		console.log('Date: ' + d);
		fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
				.then(response => response.json())
				.then(data => {
				this.BTCVALUE = data.bpi.USD.rate_float;	//display price
				this.loading = false;	// hide loading spinner
				console.log(this.BTCVALUE);
		});
	}
	connectedCallback(){this.updateButton()}
}