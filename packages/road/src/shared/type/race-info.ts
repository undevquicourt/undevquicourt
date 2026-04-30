import {Pace} from "./pace.type";

export interface RaceInfo {
    date: string;
    name: string;
    distanceKms: number;
    elevationMeter: number;
    averagePace: Pace;
}

