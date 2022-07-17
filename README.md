# btc-lwc
## Bitcoin Lightning Web Component
query coindesk bitcoin price from inside Salesforce dashboard.

![image](https://user-images.githubusercontent.com/10030407/140394085-211740e4-70f9-42db-a075-3de8b82ed04d.png)

## html
using ecma templates

```html
<template>
  <lightning-card title="BTC Price" icon-name="custom:custom14">
    <div class="slds-m-around_medium">
      <lightning-button label="Refresh" value="test" onclick={updateButton}></lightning-button>
      <lightning-textarea readonly value={BTCVALUE} rows="7" ></lightning-textarea>
    </div>
  </lightning-card>
</template>
```

## javascript
using track to update price

```js
import {LightningElement,track} from 'lwc';
export default class bitcoinComponent extends LightningElement {
	@track BTCVALUE;
	updateButton(){
		const d = new Date().getTime()
		console.log('Date: ' + d);
		fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
				.then(response => response.json())
				.then(data => {
				this.BTCVALUE = data.bpi.USD.rate_float;
				console.log(this.BTCVALUE);
		});
	}
}
```

## deployment
Deploy to your org

```sfdx force:source:deploy -m LightningComponentBundle:bitcoinComponent```

## reference
https://trailhead.salesforce.com/en/content/learn/projects/quick-start-lightning-web-components/create-a-hello-world-lightning-web-component?trail_id=build-lightning-web-components

https://github.com/ManuelVargas1251/BTC-USD-Converter

https://old.coindesk.com/coindesk-api

https://gist.github.com/ManuelVargas1251/b43b17fe6c4f45ee9d5276ca434f014b
