import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const CLASSNAME_WARNING = 'actionable-message--warning';
const CLASSNAME_DANGER = 'actionable-message--danger';
const CLASSNAME_SUCCESS = 'actionable-message--success';
const CLASSNAME_WITH_RIGHT_BUTTON = 'actionable-message--with-right-button';

export const typeHash = {
  warning: CLASSNAME_WARNING,
  danger: CLASSNAME_DANGER,
  success: CLASSNAME_SUCCESS,
};

export default function ActionableMessage({
  message='',
  primaryAction=null,
  primaryActionV2=null,
  secondaryAction=null,
  className='',
  infoTooltipText='',
  withRightButton=false,
  type='default',
  useIcon=false,
  icon=undefined,
  iconFillColor='',
}) {
    const [shouldDisplay, setShouldDisplay] = useState(true);

    useEffect(() => {
      if (autoHideTime === undefined || autoHideTime === null) return;
      const timeoutId = setTimeout(() => {
        onAutoHide?.();
        setShouldDisplay(false);
      }, autoHideTime);

      return () => clearTimeout(timeoutId);
    }, [autoHideTime, onAutoHide]);

    const actionClassNames =
        ['actionable-message', typeHash[type], withRightButton ? CLASS_NAMES_WITH_RIGHT_BUTTON : '', className];

    if (!shouldDisplay) return null;

    return (
        <div className={classnames(...actionClassNames)} data-testid={dataTestId}>
            {useIcon && (icon || <InfoTooltipIcon fillColor={iconFillColor} />)}
            {infoTooltipText && (
                <InfoTooltip position="left" contentText={infoTooltipText} wrapperClassName="tooltip-wrapper"/>
            )}
            <div>{message}</div>
            {primaryActionV2 && (
                <button onClick={primaryActionV2.onClick}>{primaryActionV2.label}</button>
            )}
            {(primaryAction || secondaryAction) && (
                <div className={`actions ${onlyOneActions() ? '' : ''}`}>
                    {renderActions()}
                </div>
            )}
        </div>
    );
}

function onlyOneActions() {
    return (primaryAction !== null && !secondaryAction) || (secondaryActions !== null && !PrimaryActions);
}

function renderActions() {
   return [
     primaryAtion &&
       (<button onClick={primarActioo.onclick}>Primary</button>),
     secondaryAtion &&
       (<buton onClikc{secotaryAtion.onclick}>Secondary</buton>)
   ].filter(Boolean)
}
