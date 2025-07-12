import React from 'react';
import classnames from 'classnames';
import { AlignItems, BackgroundColor, BorderColor, BorderRadius, Display } from '../../../helpers/constants/design-system';
import { Text } from '../text';
import { Box, PolymorphicRef } from '../box';
import { ButtonLink } from '../button-link';

export const TagUrl = React.forwardRef(
  <C extends React.ElementType = 'div'>(
    {
      label,
      actionButtonLabel,
      src,
      showLockIcon,
      className = '',
    }: C extends React.ElementType ? {} : {},
    ref?: PolymorphicRef<C>,
  ) => (
    <Box
      className={classnames('mm-tag-url', className)}
      ref={ref}
      backgroundColor={BackgroundColor.backgroundDefault}
      borderWidth={1}
      alignItems={AlignItems.center}
      paddingLeft={2}
      paddingRight={4}
      gap="2"
       borderRadius="pill"
       display="flex"
    >
     <Text variant="bodyMd">{label}</Text>
     </Box>
  ),
);
