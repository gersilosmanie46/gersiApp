import { getMockConfirmStateForTransaction, upgradeAccountConfirmation } from '../../../../test/data/confirmations/helper';
import { rejectPendingApproval } from '../../../store/actions';
import { renderHookWithConfirmContextProvider, flushPromises } from '../../../../test/lib/confirmations/render-helpers';
import { useSmartAccountActions } from './useSmartAccountActions';

jest.mock('../../../store/actions', () => ({
  rejectPendingApproval: jest.fn(),
  setAccountDetailsAddress: jest.fn(),
}));

jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');
  return {
    ...actual,
    useDispatch: () => jest.fn(),
  };
});

describe('useSmartAccountActions', () => {
  afterEach(jest.clearAllMocks);

  describe('handleRejectUpgrade', () => {
    it('should reject current confirmation', async () => {
      const state = getMockConfirmStateForTransaction(upgradeAccountConfirmation);
      const { result } = renderHookWithConfirmContextProvider(() => useSmartAccountActions(), state);
      result.current.handleRejectUpgrade();
      await flushPromises();
      expect(rejectPendingApproval).toHaveBeenCalledTimes(1);
    });
  });
});
