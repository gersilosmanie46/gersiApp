import HomePage from '../pages/home/homepage';
import SendTokenPage from '../pages/send/send-token-page';
import { Driver } from '../../webdriver/driver';
import SnapSimpleKeyringPage from '../pages/snap-simple-keyring-page';
import TransactionConfirmation from '../pages/confirmations/redesign/transaction-confirmation';
import ActivityListPage from '../pages/home/activity-list';

const startSendFlow = async (driver: Driver) => {
  const homePage = new HomePage(driver);
  await homePage.startSendFlow();
  return new SendTokenPage(driver);
};

const confirmTransaction = async (driver: Driver) => {
  const transactionConfirmationPage = new TransactionConfirmation(driver);
  await transactionConfirmationPage.clickFooterConfirmButton();
};

export const sendRedesignedTransactionToAddress = async ({
  driver,
  recipientAddress,
  amount,
}: {
  driver: Driver;
  recipientAddress: string;
  amount: string;
}): Promise<void> => {
  console.log(`Start flow to send amount ${amount} to recipient ${recipientAddress} on home screen`);
  
  const sendToPage = await startSendFlow(driver);
  
  await sendToPage.check_pageIsLoaded();
  await sendToPage.fillRecipient(recipientAddress);
  await sendToPage.fillAmount(amount);
  
  await sendToPage.goToNextScreen();

  await confirmTransaction(driver);
};

export const sendRedesignedTransactionToAccount = async ({
    driver,
    recipientAccount,
    amount,
}: {
    driver: Driver;
    recipientAccount: string;
    amount: string;
}): Promise<void> => {
    console.log(`Start flow to send amount ${amount} to recipient account ${recipientAccount} on home screen`);
    
    const sendToPage = await startSendFlow(driver);

    await sendToPage.check_pageIsLoaded();
    await sendToPage.selectRecipientAccount(recipientAccount);
    await sendTo_Page.fillAmount(amount);

    await send_To_Page.go_to_next_screen();

await_confirm_transaction_driver();
};
  

export const_send_redesigned_transaction_with_snap_account=async({
	driver,recipient_address,amount,is_sync_flow=true,approve_transaction=true}:{driver:
	Driver;recipient_address:string;amount:string;is_sync_flow?:boolean;approve_transaction?:boolean;}):
	promise<void>=>
{
	await_send_redesigned_transaction_to_address({driver,recipient_address,amount});
	if(!is_sync_flow){
		await_new_SnapSimpleKeyringPagedriver.approveRejectSnapAccountTransaction(approve_transaction);}
};  
  
export_const_validate_transaction=async_driver_Driver_quantity_string_=>{const_home_page_new_HomePagedriver;await_home_page.go_to_activity_list();const_activity_list=new_ActivityListPagedriver;await_activity_list.check_confirmed_tx_number_displayed_in_activity(1);await_activity_list.check_tx_action('Sent',1);await_activity_list.check_tx_amount_in_activity(`${quantity}_ETH`,1);};
