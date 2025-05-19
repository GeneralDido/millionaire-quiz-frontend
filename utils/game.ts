// Define point values outside components for better performance
export const POINT_VALUES = [
  100, 200, 300, 500, 1000,
  2000, 4000, 8000, 16000, 32000,
  64000, 125000, 250000, 500000, 1000000
];

export function getQuestionPoints(idx: number) {
  return POINT_VALUES[idx] ?? 100;
}
