import type { Point } from './Point';

export interface Spot {
  color: string;
  center: Point;
  circleRadius?: number;
};