import type { Point } from './Point';

export interface Spot {
    color: string;
    countRay: number;
    circleRadius: number;
    center: Point;
};