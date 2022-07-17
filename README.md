# Bitcoin Lightning Web Component
Query coindesk bitcoin price from inside Salesforce dashboard.

![image](https://user-images.githubusercontent.com/10030407/179420812-f790363a-ef05-481c-8186-2c30cd706d13.png)

## Deployment
To import to your own org, 
1. Download the project folder, "BitcoinLightningWebComponent".

```sh
gh repo clone ManuelVargas1251/Bitcoin-Lightning-Web-Component
```

2. CD into the project folder

```sh
cd Bitcoin-Lightning-Web-Component
```

3. Make sure you are logged in to the org you want to deploy to by checking your auth list; if not, log in!

```js
sfdx auth:list
sfdx auth:web:login -a yourOrgName --instanceurl [your url]
```

4. Deploy to your org. [sfdx reference gist](https://gist.github.com/ManuelVargas1251/b43b17fe6c4f45ee9d5276ca434f014b)

```sh
sfdx force:source:deploy -m LightningComponentBundle:bitcoinComponent
```


## Javascript
Calling the coindesk api and assigning to global variable

```js
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
```

## Html
Using ecma templates and lwc functionality

```html
<template>
	<lightning-card title="BTC Price" icon-name="custom:custom41">
		<div class="slds-var-m-around_medium">
			
			<lightning-formatted-number 
				class="slds-align_absolute-center slds-text-heading_large slds-var-p-bottom_large"
				maximum-fraction-digits="2"
				format-style="currency"
				currency-code="USD"
				value={BTCVALUE}>
			</lightning-formatted-number>

			Last Update:
			<lightning-formatted-date-time
				value={lastUpdatedDateTime}
				year="numeric"
				month="numeric"
				day="numeric"
				hour="2-digit"
				minute="2-digit"
				time-zone-name="short">
			</lightning-formatted-date-time>

			<lightning-button label="Refresh" onclick={updateButton} class="slds-float_right"></lightning-button>

			<template if:true={loading}>
				<lightning-spinner alternative-text="Loading" size="small">
				</lightning-spinner>
			</template>
			
		</div>
		<p slot="footer">
			<lightning-formatted-url value="https://www.coindesk.com/price/bitcoin/" tooltip="Click to view more info" label="View on CoinDesk" target="_blank" ></lightning-formatted-url>
		</p>
	</lightning-card>
</template>
```



## reference
https://trailhead.salesforce.com/en/content/learn/projects/quick-start-lightning-web-components/create-a-hello-world-lightning-web-component?trail_id=build-lightning-web-components

https://github.com/ManuelVargas1251/BTC-USD-Converter

https://old.coindesk.com/coindesk-api

https://gist.github.com/ManuelVargas1251/b43b17fe6c4f45ee9d5276ca434f014b

https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_lifecycle_hooks_dom

https://developer.salesforce.com/docs/component-library/documentation/en/lwc/create_conditional

https://www.lightningdesignsystem.com/utilities/alignment/

https://developer.salesforce.com/docs/component-library/bundle/lightning-card/example

https://www.lightningdesignsystem.com/utilities/padding/#site-main-content

https://help.salesforce.com/s/articleView?id=release-notes.rn_lwc_track.htm&type=5&release=224
