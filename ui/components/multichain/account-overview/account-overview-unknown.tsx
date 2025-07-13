import React from 'react';
import { Box } from '../../component-library';
import { useI18nContext } from '../../../hooks/useI18nContext';
import { AccountOverviewCommonProps, AccountOverviewLayout } from './';

export const AccountOverviewUnknown = ({ ...props }: AccountOverviewCommonProps) => {
  const t = useI18nContext();
  
  return (
    <AccountOverviewLayout showActivity showTokens={false} showNfts={false} showDefi={false} {...props}>
      <Box className="account-overview-unknown__empty">
        <Box className="account-overview-unknown__empty-text">
          <span>{t('accountTypeNotSupported')}</span>
        </Box>
      </Box>
    </AccountOverviewLayout>
  );
};
