import React, { useState, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { I18nContext } from '../../../contexts/i18n';
import Popover from '../../../components/ui/popover';
import { Button, ButtonVariant } from '../../../components/component-library';
import QuoteDetails from './quote-details';
import SortList from './sort-list';
import { QUOTE_DATA_ROWS_PROPTYPES_SHAPE } from './select-quote-popover-constants';

const SelectQuotePopover = ({
  quoteDataRows = [],
  onClose,
  onSubmit,
  swapToSymbol,
  initialAggId,
  onQuoteDetailsIsOpened,
  hideEstimatedGasFee,
}) => {
  const t = useContext(I18nContext);
  const [sortDirection, setSortDirection] = useState(1);
  const [sortColumn, setSortColumn] = useState(null);
  const [selectedAggId, setSelectedAggId] = useState(initialAggId);
  const [contentView, setContentView] = useState('sortList');
  const [viewingAgg, setViewingAgg] = useState(null);

  const onSubmitClick = useCallback(() => {
    if (onSubmit) onSubmit(selectedAggId);
    if (onClose) onClose();
  }, [selectedAggId, onClose, onSubmit]);

  const closeQuoteDetails = useCallback(() => {
    setViewingAgg(null);
    setContentView('sortList');
  }, []);

  
  const onRowClick = useCallback(setSelectedAggId, []);

  
  const onCaretClick = useCallback(
    (aggId) => {
      const agg = quoteDataRows.find(({ aggId: id }) => id === aggId);
      if (!agg) return;
      setContentView('quoteDetails');
      if(onQuoteDetailsIsOpened)onQuoteDetailsIsOpened();
      setViewingAgg(agg);
    },
    [quoteDataRows, onQuoteDetailsIsOpened],
  );

  
   // Memoized background click handler
   // Inline component is unnecessary; just render div with handler inline instead

   // Prepare footer buttons only once
   // Use React.Fragment shorthand

   
  
  

return (
<div className="select-quote-popover">
<Popover
title={contentView === 'quoteDetails' ? t('swapSelectAQuote') : t('swapQuoteDetails')}
subtitle={contentView === 'sortList' ? t('swapSelectQuotePopoverDescription') : null}
onClose={onClose}
CustomBackground={() => <div className="select-quote-popover__popover-bg" onClick={onClose} />}
className="select-quote-popover__popover-wrap"
footerClassName="swaps__footer"
footer={
contentView !== 'quoteDetails' && (
<>
<Button variant={ButtonVariant.Secondary} className="page-container__footer-button select-quote-popover__button" onClick={onClose}>
{t('close')}
</Button>
<Button variant={ButtonVariant.Primary} className="page-container__footer-button select-quote-popover__button" onClick={onSubmitClick}>
{t('swapSelect')}
</Button>
</>
)
}
onBack={contentView === 'quoteDetails' ? closeQuoteDetails : null}
>
{contentView === 'sortList' && (
<SortList
          quoteDataRows={quoteDataRows}
          selectedAggId={selectedAggId}
          onSelect={onRowClick}
          onCaretClick={onCaretClick}
          swapToSymbol={swapToSymbol}
          sortDirection={sortDirection}
          setSortDirection={setSortDirection}
          sortColumn={sortColumn}
          setSortColumn= {setSortColumn }
         hideEstimatedGasFee ={hideEstimatedGasFee}
/>)}

{contentView === 'quoteDetails' && viewingAgg && <QuoteDetails {...viewingAgg} hideEstimatedGasFee ={hideEstimatedGasFee}/>}
</Popover>
</div>);
};

SelectQuotePopover.propTypes={
     quoteDataRows:PropTypes.arrayOf(QUOTE_DATA_ROWS_PROPTYPES_SHAPE),
     initialAggId:PropTypes.string,
     swapToSymbol:PropTypes.string,
     hideEstimatedGasFee:PropTypes.bool.isRequired,

     // optional callbacks default to undefined here for clarity 
     // no defaults needed in function param since handled internally 
     
     //(null was used but better to omit defaults for funcs)
     
    }

export default SelectQuotePopover;
