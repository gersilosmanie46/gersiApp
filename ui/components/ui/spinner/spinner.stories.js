import React from 'react';
import Spinner from '.';

export default {
  title: 'Components/UI/Spinner',
  argTypes: {
    className: { control: 'text' },
    color: { control: 'text' },
  },
  args: {
    color: 'var(--color-icon-muted)',
  },
};

export const DefaultStory = ({ color }) => (
  <div style={{ width: 100, height: 100 }}>
    <Spinner color={color} />
  </div>
);

DefaultStory.storyName = 'Default';
