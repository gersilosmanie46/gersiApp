import { strict as assert } from 'assert';
import { Driver } from '../../../webdriver/driver';

class ActivityListPage {
  private driver: Driver;

  private selectors = {
    activityListAction: '[data-testid="activity-list-item-action"]',
    completedTransactions: '[data-testid="activity-list-item"]',
    confirmedTransactions: '.transaction-status-label--confirmed',
    failedTransactions: '.transaction-status-label--failed',
    tooltip: '.tippy-tooltip-content',
    bridgeTransactionCompleted: '.transaction-status-label--confirmed',
    bridgeTransactionPending: '.bridge-transaction-details__segment--pending',
    transactionAmountsInActivity:
      '[data-testid="transaction-list-item-primary-currency"]',
    viewTransactionOnExplorerButton: { text: 'View on block explorer', tag: 'a' },
    cancelTransactionButton: { text: 'Cancel', tag: 'button' },
    speedupButton: '[data-testid="speedup-button"]',
    confirmTransactionReplacementButton: { text:'Submit', tag:'button' }
  };

  constructor(driver: Driver) {
    this.driver = driver;
  }

  async clickOnActivity(index:number): Promise<void> {
    const activities = await this.driver.findElements(this.selectors.activityListAction);
    await activities[index -1].click();
  }

  async viewTransactionOnExplorer(index:number): Promise<void> {
    await this.clickOnActivity(index);
    await this.driver.clickElement(this.selectors.viewTransactionOnExplorerButton);
  }

  async checkTxNumberDisplayed(selector:string, expectedNumber:number, timeout=10000):Promise<void>{
     await this.driver.wait(async () => (await this.driver.findElements(selector)).length === expectedNumber, timeout);
   }

  async check_completedTxNumberDisplayedInActivity(expectedNumber=1):Promise<void>{
     return this.checkTxNumberDisplayed(this.selectors.completedTransactions, expectedNumber,10000);
   }
  
   async check_confirmedTxNumberDisplayedInActivity(expectedNumber=1):Promise<void>{
     return this.checkTxNumberDisplayed(this.selectors.confirmedTransactions, expectedNumber,60000);
   }
  
   async check_failedTxNumberDisplayedInActivity(expectedNumber=1):Promise<void>{
     return this.checkTxNumberDisplayed(this.selectors.failedTransactions, expectedNumber,60000);
   }

   async check_noTxInActivity(): Promise<void> {
     await this.driver.assertElementNotPresent(this.selectors.completedTransactions);
   }

   async check_txAction(expectedAction:string,index=1){
     const transactionActions = await this.driver.findElements(this.selectors.activityListAction);

     await this.driver.wait(async ()=>{
       const text = await transactionActions[index-1].getText();
       return text === expectedAction;
     },60000)
   }

   async check_pendingBridgeTransactionActivity(expectedNum=1){
      return this.checkTxNumberDisplayed(this.selectors.bridgeTransactionPending,expectedNum ,60000); 
   }
   
   async check_completedBridgeTransactionActivity(expectedNum=1){
      return this.checkTxNumberDisplayed(this.selectors.bridgeTransactionCompleted ,expectedNum ,60000); 
   }


  async check_txAmountInActivity(
      expectedAmount='-1 ETH', index=1
      ):Promise<void> {

        await this.driver.waitForSelector(this.selectors.transactionAmountsInActivity);

        const amounts = await this.driver.findElements(
         	this.selectors.transactionAmountsInActivity,
        );

        const actualAmount =await amounts[index -1].getText();

        assert.equal(actualAmount,
         	expectedAmount,
         	`${actualAmount} is displayed instead of ${expectedAmount} for tx ${index}`
         );
       }


	async check_warningMessage(warningText:string) : Promise<void>{
		await	this.driver.waitForSelector({tag:'div',text : warningText});
	}

	async	check_noFailedTransactions() : Promise <void> {

		try{
			await	this.driver.findElement(	this. selectors.failedTransactions ,{timeout :1000});
		}catch{
			return;
		}

	const failedTxs =await	this. driver.findElements(	this. selectors.failedTransactions );

	if(!failedTxs.length)	return;

	const errors:string[]=[];

	for(const ft of failedTxs){

	 	await	this. driver.hoverElement(ft);

	 	const tip =await	this. driver.findElement(	this. selectors.tooltip );

	 	errors.push(await tip.getText());
	
	   }
	throw new Error(`Failed transactions found in activity list:\n${errors.join('\n')}`);
}


async click_transactionListItem(){
	await	t his .driver.clickElement (this .selectors.completedTransactions );
}
async	click_cancelTransac tion(){
	await	t his .driver.clickElemen t (this .selectors.cancelTransacti onButt on );
}
async	click_speedUpTran saction (){
	await	t his .driver.cli ckEleme nt (this .selectors.speedupButto n );
}
async	click_confirmTransa ctionReplacement(){
	await	t his .driv er.cli ckEleme ntAndWai tToDisappear (
	     	th is.selec tors.confirm TransactionReplac ementButto n ,
	    );
}
async	check_waitForTransac tionStatus(status:'confirmed'|'cancelled'){
	return th is.driv er.wai tForSelect or(`.transactio n-statu s-labe l--${status}`,{timeout :5000});
}

async	check_transactionActiv ityByTex t(txnTex t:s tring ){
	retur n th is.driv er.wai tForSelect or({tex t:t xnTex t,css:this.sele ct ors.activi tyLis tActi on});
}



}

export default ActivityListPage;
