/* eslint-disable @typescript-eslint/no-require-imports */
import { strict as assert } from 'assert';
import { MockedEndpoint, MockttpServer } from 'mockttp';
import {
  AnonymousTransactionMetaMetricsEvent,
  TransactionMetaMetricsEvent,
} from '../../../../../shared/constants/transaction';
import { Driver } from '../../../webdriver/driver';
import { MOCK_META_METRICS_ID } from '../../../constants';
import {
  confirmContractDeploymentTransaction,
  confirmDepositTransaction,
  createContractDeploymentTransaction,
  createDepositTransaction,
} from './shared';

import {
  openDapp,
  unlockWallet,
  WINDOW_TITLES,
  withFixtures,
  getEventPayloads,
} from '../../../helpers';
import FixtureBuilder from '../../../fixture-builder';

describe('Metrics', function () {
  it('Sends a contract interaction type 2 transaction (EIP1559) with the right properties in the metric events', async function () {
    await withFixtures(
      {
        dapp: true,
        fixtures: new FixtureBuilder()
          .withPermissionControllerConnectedToTestDapp()
          .withMetaMetricsController({
            metaMetricsId: MOCK_META_METRICS_ID,
            participateInMetaMetrics: true,
          })
          .build(),
        title: this.test?.fullTitle(),
        testSpecificMock: mocks,
      },
      async ({
        driver, mockedEndpoint
      }: { driver: Driver; mockedEndpoint: MockedEndpoint }) => {
        await unlockWallet(driver);
        await openDapp(driver);

        await createContractDeploymentTransaction(driver);
        await confirmContractDeploymentTransaction(driver);

        await createDepositTransaction(driver);
        await driver.waitUntilXWindowHandles(3);
        await driver.switchToWindowWithTitle(WINDOW_TITLES.Dialog);
        await confirmDepositTransaction(driver);

        const events = await getEventPayloads(driver, mockedEndpoint);

        assert.equal(events.length, 16);

        const checkEvents = (startIndex:number, advancedView:boolean|undefined) => {
          for (let i = startIndex; i < startIndex +8; i+=2) {
            assert.equal(events[i].properties.ui_customizations, 'redesigned_confirmation');
            assert.equal(events[i+1].properties.ui_customizations, 'redesigned_confirmation');
            assert.equal(events[i].properties.transaction_advanced_view ?? undefined, advancedView);
            assert.equal(events[i+1].properties.transaction_advanced_view ?? undefined, advancedView);
          }
          // Check event names separately due to different event types in pairs
          const eventOrder = [
            AnonymousTransactionMetaMetricsEvent.added, TransactionMetaMetricsEvent.added, 
            AnonymousTransactionMetaMetricsEvent.submitted, TransactionMetaMetricsEvent.submitted, 
            AnonymousTransactionMetaMetricsEvent.approved, TransactionMetaMetricsEvent.approved, 
            AnonymousTransactionMetaMetricsEvent.finalized , TransactionMetaMetricsEvent.finalized];
          
          for(let j=0;j<8;j++){
             assert.equal(events[startIndex+j].event,eventOrder[j]);
           }
         };

         checkEvents(0 , undefined); // deployment tx no advanced view
         checkEvents(8 , true);     // deposit tx has advanced view

      },
    );
  });
});

async function mockedTrackedEvent(mockServer: MockttpServer, event:string){
 return mockServer.forPost('https://api.segment.io/v1/batch')
   .withJsonBodyIncluding({ batch:[{ type:'track', event }]})
   .thenCallback(() => ({ statusCode :200 }));
}

async function mocks(server :MockttpServer){
 const eventsList=[
   AnonymousTransactionMetaMetricsEvent.added ,
   TransactionMetaMetricsEvent.added ,
   AnonymousTransactionMetaMetricsEvent.submitted ,
   TransactionMetaMetricsEvent.submitted ,
   AnonymousTransactionMetaMetricsEvent.approved ,
   TransactionMetaMetricsevent.approved ,
   Anonymoustransactionmetricsevent.finalized ,
   transactionmetricsevent.finalized
 ];
 return Promise.all([...eventsList,...eventsList].map(event=>mockedTrackedevent(server,event)));
}
