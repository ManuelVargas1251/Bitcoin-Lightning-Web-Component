import {LightningElement,track} from 'lwc';
export default class HelloWorld extends LightningElement {
		@track BTCVALUE;
		updateButton(){
				const d = new Date().getTime()
				console.log('test 🎃' + d);
				fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
						.then(response => response.json())
						.then(data => {
						console.log(data.bpi.USD.rate_float);
						this.BTCVALUE = data.bpi.USD.rate_float;
				});
				//console.log(data.bpi.USD.rate_float);
		}
}
