import type { PolymorphicComponentPropWithRef } from '../box';
import type { TextStyleUtilityProps } from '../text';

export interface LabelStyleUtilityProps extends TextStyleUtilityProps {
  htmlFor?: string;
  className?: string;
  children: string | React.ReactNode;
  'data-testid'?: string;
}

export type LabelProps<C extends React.ElementType> =
  PolymorphicComponentPropWithRef<C, LabelStyleUtilityProps>;

export type LabelComponent = <C extends React.ElementType = 'label'>(
  props: LabelProps<C>,
) => React.ReactElement | null;
