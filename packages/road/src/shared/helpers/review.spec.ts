import {review} from "./review";

import {RaceData} from "../type/race-data";

describe('Review', () => {
    it('should output a log', () => {
        const dummyRace:RaceData = {
            info:{
                distanceKms: 20,
                elevationMeter: 50,
                date: "2 janvier 2026",
                averagePace: '5:00',
                name: "Some race"

            },
            checkpoints: [
                {km: 5, time: "00:22:30"},
                {km: 10, time: "00:45:00"},
                {km: 15, time: "01:10:00"},
                {km: 20, time: "01:30:00"}
            ],
            macroCheckpoints:[
                {km: 10, time: "00:45:00"},
                {km: 20, time: "01:30:00"}
            ]
        }

        expect(() => review(dummyRace)).not.toThrow();
    });
});