
import {
  formatAmount,
  formatMenuItemDate,
  getLeadingZeroCount,
  getRandomKey,
  getUsdAmount,
} from './notification.util';

describe('formatMenuItemDate', () => {
  beforeAll(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date(Date.UTC(2024, 5, 7, 9, 40, 0)));
    jest.useRealTimers();
});

describe('getNotificationData - formatAmount() tests', () => {
});

describe('getNotificationData - getLeadingZeroCount() tests', () => {
});

describe('getRandomKey', () => {
});

describe('getUsdAmount', () => {
