import { useContext } from 'react';
import { useNonContractAddressAlerts } from './useNonContractAddressAlerts';

export function OptimizedUseNonContractAddressAlerts() {
  const confirmations = useContext(ConfirmContext);
  return useNonContractAddressAlerts(confirmations);
}
