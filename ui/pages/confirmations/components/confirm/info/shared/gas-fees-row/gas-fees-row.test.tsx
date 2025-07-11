import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockState = require('../../../../../../../../test/data/mock-state.json');
const { renderWithConfirmContextProvider } = require('../../../../../../../../test/lib/confirmations/render-helpers');

describe('<GasFeesRow />', () => {
  const middleware = [thunk];

  it('renders component', () => {
    const state = mockState;
    const store = configureMockStore(middleware)(state);
    const ComponentProps = {
      label: "Some kind of fee",
      tooltipText: "Tooltip text",
      fiatFee: "$1",
      fiatFeeWith18SignificantDigits: "0.001234",
      nativeFee: "0.0001 ETH"
    };
    
    const { container } = renderWithConfirmContextProvider(<GasFeesRow {...ComponentProps} />, store);

    expect(container).toMatchSnapshot();
  });
});
