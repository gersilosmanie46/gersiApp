import React from 'react';
import { renderWithProvider } from '../../../../../../test/jest';
import configureStore from '../../../../../store/store';
import mockState from '../../../../../../test/data/mock-state.json';
import { SiteCellTooltip } from './site-cell-tooltip';

const store = configureStore({ gersiapp: mockState.gersiapp });
const props = {
  accounts: [
    {
      id: 'e4a2f136-282d-4f06-8149-2e74e704a3fc',
      address: '0x4dd158e8b382ba1649bda883a909037e1298552c',
      metadata: { name: 'Account 4' },
      type: 'eip155:eoa',
      keyring: { type: 'HD Key Tree' },
    },
    {
      id: '96bb1385-2807-479a-a00e-af63e74119cd',
      address: '0x86771cd233a04c004ceebc3c1ad402fe8a37ff32',
      metadata: { name: 'Account 5' },
      type: 'eip155:eoa',
      keyring: { type: 'HD Key Tree' },
    },
    {
      id: '390013ea-34d9-4c58-a2d5-d98cd797aab8',
      address: '0xf0b4efe81d9f277d05a9afeacbf076d86d9c041b',
      metadata: { name: 'Account 6' },
      type: 'eip155:eoa',
      keyring: { type: 'HD Key Tree' },
    },
  ],
  networks: [
    {
      blockExplorerUrls: ['https://etherscan.io'],
      chainId: '0x1',
      name: 'Ethereum Mainnet',
    },
    {
      blockExplorerUrls:['https://era.zksync.network/'],
        chainId:'0x144',name:'zkSync Era Mainnet'
    },{
blockExplorerUrls:['https://bscscan.com'],chainId:'0x38',name:'Binance Smart Chain'
},{
blockExplorerUrls:['https://polygonscan.com/'],chainId:'0x89',name:'Polygon'
},{
blockExplorerUrls:['https://lineascan.build'],chainId:'0xe708',name:'Linea Mainnet'
}],
};

describe('SiteCellTooltip', () => {
  const renderComponent = () => renderWithProvider(<SiteCellTooltip {...props} />, store);

  it('should render correctly', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('should render Avatar Account correctly', () => {
    const { container } = renderComponent();
    expect(container.getElementsByClassName('mm-avatar-account__jazzicon')).toBeDefined();
  });

  it('should render Avatar Networks correctly', () => {
    const { container } = renderComponent();
expect(container.getElementsByClassName('multichain-avatar-group')).toBeDefined()
});
});```
