// utils/__tests__/format.test.ts
import {formatDate} from '@/utils/format';
import {getQuestionPoints} from '@/utils/game'

describe('formatDate', () => {
  it('returns formatted date for valid date string', () => {
    // Mock a fixed date for consistent testing
    const result = formatDate('2023-05-15T14:30:00Z');
    expect(result).toContain('2023');
    expect(result).toContain('May');
    expect(result).toContain('15');
  });

  it('returns N/A for null', () => {
    expect(formatDate(null)).toBe('N/A');
  });

  it('returns N/A for undefined', () => {
    expect(formatDate(undefined)).toBe('N/A');
  });
});

describe('getQuestionPoints', () => {
  it('returns correct point values for valid indexes', () => {
    expect(getQuestionPoints(0)).toBe(100);
    expect(getQuestionPoints(1)).toBe(200);
    expect(getQuestionPoints(14)).toBe(1000000);
  });

  it('returns default value for out of range index', () => {
    expect(getQuestionPoints(20)).toBe(100);
    expect(getQuestionPoints(-1)).toBe(100);
  });
});
