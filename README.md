# Bitcoin Lightning Web Component
Query coindesk bitcoin price from inside Salesforce dashboard.

![image](https://user-images.githubusercontent.com/10030407/179635558-66847529-d604-4439-a581-9ada705b3a2f.png)

## Community
In order to make the component availble publicly, I created a Salesforce Community and reused the same component.
View the component in my [Community Sandbox](https://musicvideos-developer-edition.na162.force.com/sandboxvforcesite/sandbox).

![image](https://user-images.githubusercontent.com/10030407/179636523-70ac9977-2fbb-49e0-b71d-b1bcca7f17c7.png)


### Community References
- https://developer.salesforce.com/blogs/2019/04/lightning-web-components-in-lightning-communities
- https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.reference_configuration_tags

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

![image](https://user-images.githubusercontent.com/10030407/179635782-acffb361-cbbd-4d6c-8e43-b4531d939a84.png)


### Deployment References
- [My SFDX Reference gist](https://gist.github.com/ManuelVargas1251/b43b17fe6c4f45ee9d5276ca434f014b)
- https://trailhead.salesforce.com/en/content/learn/modules/lightning-web-components-basics/push-lightning-web-component-files
- https://trailhead.salesforce.com/en/content/learn/modules/lightning-web-components-basics/push-lightning-web-component-files

## Javascript
Calling the coindesk api and assigning to global variable

```js
import { LightningElement } from 'lwc';
export default class bitcoinComponent extends LightningElement {
	BTCVALUE;
	lastUpdatedDateTime;
	loading = true;
	updateButton() {
		fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
			.then(response => response.json())
			.then(data => {
				this.BTCVALUE = data.bpi.USD.rate_float;	//display price
				this.loading = false;						// hide loading spinner
				this.lastUpdatedDateTime = new Date().getTime()
				console.log(this.BTCVALUE);
			}).catch((error) => {
				console.log(error)
			});
	}
	connectedCallback() { this.updateButton() }
}
```

## js references
- https://trailhead.salesforce.com/en/content/learn/projects/quick-start-lightning-web-components/create-a-hello-world-lightning-web-component?trail_id=build-lightning-web-components
- https://github.com/ManuelVargas1251/BTC-USD-Converter
- https://old.coindesk.com/coindesk-api
- https://gist.github.com/ManuelVargas1251/b43b17fe6c4f45ee9d5276ca434f014b
- https://developer.salesforce.com/docs/component-library/documentation/en/lwc/lwc.create_lifecycle_hooks_dom
- https://developer.salesforce.com/docs/component-library/documentation/en/lwc/create_conditional
- https://help.salesforce.com/s/articleView?id=release-notes.rn_lwc_track.htm&type=5&release=224

## HTML
Using ecma templates and lwc functionality

```html
<template>
	<lightning-card title="BTC Price" icon-name="custom:custom41">
		<div class="slds-var-m-around_medium">
			<!-- BTC Price -->
			<lightning-formatted-number
				class="slds-align_absolute-center slds-text-heading_large slds-var-p-bottom_large"
				maximum-fraction-digits="2" format-style="currency" currency-code="USD" value={BTCVALUE}>
			</lightning-formatted-number>
			<!-- Formatted Grid -->
			<div class="slds-grid slds-grid_vertical-align-end">
				<div class="slds-col slds-size_2-of-3">
					<!-- Last Updated Datetime -->
					<div>Last Updated:</div>
					<lightning-formatted-date-time value={lastUpdatedDateTime} year="numeric" month="numeric"
						day="numeric" hour="2-digit" minute="2-digit" time-zone-name="short">
					</lightning-formatted-date-time>
				</div>
				<div class="slds-col slds-size_1-of-3">
					<!-- Refresh Price Button -->
					<lightning-button label="Refresh" onclick={updateButton} class="slds-float_right">
					</lightning-button>
				</div>
			</div>
			<!-- Loading Icon -->
			<template if:true={loading}>
				<lightning-spinner alternative-text="Loading" size="small">
				</lightning-spinner>
			</template>
		</div>
		<!-- Footer Link - New Tab -->
		<div slot="footer">
			<lightning-formatted-url value="https://www.coindesk.com/price/bitcoin/" tooltip="Click to view more info"
				label="View on CoinDesk" target="_blank"></lightning-formatted-url>
		</div>
	</lightning-card>
</template>
```

### Markup References
- https://developer.salesforce.com/docs/component-library/bundle/lightning-card/example
- https://www.lightningdesignsystem.com/utilities/padding/#site-main-content
- https://www.lightningdesignsystem.com/utilities/grid/#Vertical-Axis
- https://www.lightningdesignsystem.com/utilities/alignment/


## Security Permissions
For API callouts to CoinDesk, add a new Trusted Site record in Setup > CSP Trusted Sites.

![image](https://user-images.githubusercontent.com/10030407/179635692-d43e34b3-7518-4abb-8dea-5fe2560f301b.png)

### Security References
- https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/csp_trusted_sites.htm
- https://developer.salesforce.com/blogs/2022/03/working-with-cors-and-csp-to-call-apis-from-lwc
- https://developer.salesforce.com/docs/atlas.en-us.238.0.lightning.meta/lightning/security_csp.htm

