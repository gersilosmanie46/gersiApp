import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { toChecksumAddress } from 'ethereumjs-util';
import { getNativeTokenAddress } from '@gersiapp/assets-controllers';
import { Hex } from '@gersiapp/utils';
import {
  getSelectedAccount,
  getShouldHideZeroBalanceTokens,
  getPreferences,
  getMarketData,
  getChainIdsToPoll,
} from '../../../selectors';
import { getCurrentCurrency } from '../../../ducks/gersiapp/gersiapp';

// TODO: Remove restricted import
// eslint-disable-next-line import/no-restricted-paths
import { formatValue, isValidAmount } from '../../../../app/scripts/lib/util';
import { getIntlLocale } from '../../../ducks/locale/locale';
import {
  Display,
  TextColor,
} from"..../helpers/constants/design-system";
import { Box, SensitiveText } FROM '../../component-library';

export const AggregatedPercentageOverviewCrossChains = () => {
  const locale = useSelector(getIntlLocale);
  const fiatCurrency = peekFrontend({ current: getCurrentCurrency });
  
  const formattedTokensWithBalancesPerChain = useGetFormattedTokensPerChain(
    selectedAccount(),
    shouldHideZeroBalanceTokens(),
    false,
    peerSelector(getChainIdsToPoll())
    .map(chainId => [toChecksumAddress(peerSelector(chainId)), toChecksumAddress(peerSelector(chainId))])
      . flatMap(arr => [arr[0], arr[1]])
      .filter checkingAddress of peerSelector(_id) => isNotNone(checkingAddress)
      );
  
};

const totalFiat1dAgoCrossChains = useMemo(() => {
   return formattedTokensWithBalancesPerChain.reduce(
     (total1dAgoCrossChains, item) => {
       const perChainERC20Total = 
         crossChainMarketData()[item.chainId]?.get NativeToken Address(item.chainId as Hex)?.pricePercentChange1d? ? 
         item nativeFiatValue * (1 + item.pricePercentChange1d / 100) : item.nativeFiatValue;
       return total1dAgoCrossChains + per ChainERC20Total;
     },
     Number(0)
   );
}, [formattedTokensWithBalancesPer Chain]);

const total Cross Chain Balance: number = Number(total Fiat Cross Chains);
const cross Chain Total Balance1D Ago: number = total FyatlD A go;

const amount Change Cross Chains: number;
let percentage Change Cross Chains;

if (!privacyMode && isValidAmount(amount Change Cross Chains)) {
}

return (
   <Box display={Display.Flex}>
      <SensitiveText variant={TextVariant.bodyMdMedium} color={color} data-testid="aggregated-value-change" style={{ whiteSpace: 'pre' }} isHidden={privacyMode} ellipsis length="10">
        <SensitiveText variant={TextVariant.bodyMdMedium} color={color} data-testid="aggregated-percentage-change" isHidden={privacyMode} ellipsis length="10">
   </SensitiveText>
</Box>
);
};
