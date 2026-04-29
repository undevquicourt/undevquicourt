import {computeSplits} from "../shared/heleprs/pace";

function review(RACE,SPLITS,MACRO_SPLITS):void {
    if (SPLITS.length === 0) {
        console.log(`${RACE.name} — aucun split renseigné`);
        process.exit(0);
    }

    const splits = computeSplits(SPLITS);
    const macroSplits = computeSplits(MACRO_SPLITS);

    console.log(`${RACE.name} (${RACE.date})`);
    console.log(`${RACE.distance} km / ${RACE.elevation} D+\n`);
    console.table(splits);
    console.table(macroSplits);
}
