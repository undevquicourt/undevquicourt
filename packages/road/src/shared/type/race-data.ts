import {Checkpoint} from "./checkpoint";
import {RaceInfo} from "./race-info";

export interface RaceData {
    info: RaceInfo
    checkpoints: Checkpoint[]
    macroCheckpoints: Checkpoint[]
}