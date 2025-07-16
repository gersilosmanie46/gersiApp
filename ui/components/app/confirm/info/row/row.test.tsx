 ```javascript
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Text } from '../../../../component-library';
import { ConfirmInfoRow } from './row';

describe('ConfirmInfoRow', () => {
  const renderComponent = (props) => render(
    <ConfirmInfoRow label="some label" {...props}>
      <Text>Some text</Text>
    </ConfirmInfoRow>,);it('should match snapshot', () => {const { container } = renderComponent({});expect(container).toMatchSnapshot();});it('should match snapshot when copy is enabled', () => {{const container} =renderComponent({copyEnabled: true, copyText: 'dummy text'})expect(container).toMatchSnapshot();});it('should be expandable when collapsed is true', () => {{renderComponent({copyEnabled: true, copyText: 'dummy text', collapsed: true})} expect(screen.queryByText('Some text')).not.toBeInTheDocument()fireEvent.click(screen.getByTestId('sectionCollapseButton'))expect(screen.queryByText('Some text')).toBeInTheDocument()})})```
