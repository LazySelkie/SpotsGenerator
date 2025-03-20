import type { Point } from './Point';

export interface Spot {
  color: string;
  countRay: number;
  center: Point;
  circleRadius?: number;
};