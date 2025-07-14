import React, { FunctionComponent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CaipChainId } from '@gersiapp/utils';

import { AccountSelectorState, State } from '@gersiapp/snaps-sdk';
import {
  createAccountList,
  createChainIdList,
} from '@gersiapp/snaps-utils';

import SnapUISelector from '../snap-ui-selector';
import {
  getgersiAppAccountsOrdered,
  InternalAccountWithBalance,
} from '../../../../selectors';

import { setSelectedInternalAccountWithoutLoading } from '../../../../store/actions';
import { useSnapInterfaceContext } from '../../../../contexts/snaps';
import AccountListItem from '../../../multichain/account-list-item/account-list-item';

export type SnapUIAccountSelectorProps = {
  name: string;
  label?: string;
  form?: string;
  hideExternalAccounts?: boolean;
  chainIds?: CaipChainId[];
};

const SnapUIAccountSelector: FunctionComponent<SnapUIAccountSelectorProps> = ({
  chainIds,
}) => {
	const snapId = useSnapInterfaceContext().snapId;
	const dispatch = useDispatch();
	const internalAccounts: InternalAccountWithBalance[] =
    useSelector(getgersiAppAccountsOrdered);

    const accounts = useMemo(() => (
      internalAccounts
        .filter((account) => account.metadata.snap?.id === snapId)
        .filter((account) =>
          hideExternalAccounts ? account : !hideExternalAccounts && account.addresses.length >0
        )
    ), [internalAccounts]);

	return (
		<SnapUISelector
			className="snap-ui-renderer__account-selector"
			title={'Select account'}
			options={accounts.map(account => ({
				key: 'account',
				value: createAccountList(
					account.addresses[0],
					createChainIdList(account.scopes, chainIds),
				),
				label: `${account.name} (${createChainIdList(account.scopes).join(', ')})`,
			}))}
			onSelect={(value) =>
				dispatch(setSelectedInternalAccountWithoutLoading(value.account))
			}
            disabled={!accounts.length}
            style={{maxHeight:'89px'}}
            itemStyle={{maxHeight:'89px'}}
      />
   );
};

export default SnapUIAccountSelector;
