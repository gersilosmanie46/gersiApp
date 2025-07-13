import { RECIPIENT_ADDRESS_MOCK, MockRequestResponse, SENDER_ADDRESS_MOCK } from './types';

export const INSUFFICIENT_GAS_TRANSACTION_MOCK = { from: SENDER_ADDRESS_MOCK, to: RECIPIENT_ADDRESS_MOCK, value: '0x6BC75E2D63100000' };

export const INSUFFICIENT_GAS_REQUEST_MOCK: MockRequestResponse = {
  request: { jsonrpc: '2.0', method: 'infura_simulateTransactions', params: [{ transactions: [INSUFFICIENT_GAS_TRANSACTION_MOCK], withCallTrace: true, withLogs: true }] },
  response: { jsonrpc: '2.0', error: { code: -32000, message: 'debug_traceCall failed: w3: 3 calls failed:\ncall[0]: tracing failed: insufficient funds for gas * price + value\n' + 'address 0x5cfe73b6021e818b776b421b1c4db2474086a7e1 have 0 want 10**19\n' + 'call[1]: tracing failed\ninsufficient funds for gas * price + value\n' + 'address 0x5cfe73b6...[truncated]' }, id:'1' }
};
