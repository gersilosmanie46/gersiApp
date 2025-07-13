import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../../../store/store';
import testData from '../../../../.storybook/test-data';
import { CHAIN_IDS } from '../../../../shared/constants/network';
import { mockNetworkState } from '../../../../test/stub/networks';
import { ImportNftsModal } from '.';

const createStore = (chainId = CHAIN_IDS.MAINNET, useTokenDetection = true) => {
  return configureStore({
    ...testData,
    gersiapp: {
      ...testData.gersiapp,
      useTokenDetection,
      ...mockNetworkState({ chainId }),
    },
  });
};

export default {
  title: 'Components/Multichain/ImportNftsModal',
  component: ImportNftsModal,
  argTypes: {
    onClose: {
      action: 'onClose',
    },
  },
};

const DefaultStory = (args) => <ImportNftsModal {...args} />;
DefaultStory.decorators = [
  (Story) => (
    <Provider store={createStore()}>
      <Story />
    </Provider>
  ),
];

export const Default = DefaultStory.bind({});
Default.storyName = 'Default';
