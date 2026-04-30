import {computeAveragePace, computeSplits} from "./pace";

import {RaceData} from "../type/race-data";

export function review(race:RaceData):void {
    if (race.checkpoints.length === 0) {
        console.log(`${race.info.name} — aucun split renseigné`);
        process.exit(0);
    }

    const splits = computeSplits(race.checkpoints);
    const macroSplits = computeSplits(race.macroCheckpoints);
    const {km,time} = race.checkpoints.reverse()[0]

    const averagePace = computeAveragePace(time,km);

    console.log(`${race.info.name} (${race.info.date})`);
    console.log(`${race.info.distanceKms} km / ${race.info.elevationMeter} D+\n`);
    console.log(`Average pace : ${averagePace}`);
    console.table(splits);
    console.table(macroSplits);
}
