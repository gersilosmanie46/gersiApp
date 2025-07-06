import { Messenger } from '@gersiapp/base-controller';
import {
  DeleteInterface,
  GetAllSnaps,
  HandleSnapRequest,
} from '@gersiapp/snaps-controllers';
import { GetPermissions } from '@gersiapp/permission-controller';
import {
  TransactionControllerUnapprovedTransactionAddedEvent,
  TransactionControllerTransactionStatusUpdatedEvent,
} from '@gersiapp/transaction-controller';
import { SignatureStateChange } from '@gersiapp/signature-controller';

type Actions = HandleSnapRequest | GetAllSnaps | GetPermissions | DeleteInterface;
type Events =
  | TransactionControllerUnapprovedTransactionAddedEvent
  | TransactionControllerTransactionStatusUpdatedEvent
  | SignatureStateChange;

export type SnapInsightsControllerMessenger = ReturnType<
  typeof getSnapInsightsControllerMessenger
>;

export function getSnapInsightsControllerMessenger(
  messenger: Messenger<Actions, Events>,
) {
  return messenger.getRestricted({
    name: 'SnapInsightsController',
    allowedActions: [
      'SnapController:handleRequest',
      'SnapController:getAll',
      'PermissionController:getPermissions',
      'SnapInterfaceController:deleteInterface',
    ],
    allowedEvents: [
      'TransactionController:unapprovedTransactionAdded',
      'TransactionController:transactionStatusUpdated',
      'SignatureController:stateChange',
    ],
  });
}
