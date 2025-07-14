import quoteDataRows from './mock-quote-data';

describe('quoteDataRows', () => {
  const expectedValues = [
    { aggId: 'Agg1', amountReceiving: '100 DAI' },
    { aggId: 'Agg2', amountReceiving: '101 DAI' },
    { aggId: 'Agg3', amountReceiving: '102 DAI' },
    { aggId: 'Agg4', amountReceiving: '150 DAI' },
    { aggId: 'Agg5', amountReceiving: '104 DAI' },
    { aggId: 'Agg6', amountReceiving: '105 DAI' }
  ];

  it('matches expected values for quoteDataRows', () => {
    quoteDataRows.forEach((row, index) => {
      expect(row.aggId).toBe(expectedValues[index].aggId);
      expect(row.amountReceiving).toBe(expectedValues[index].amountReceiving);
    });
  });
});
