import {Status} from "../shared/type/runner-status";
import {Pace} from "../shared/type/pace.type";
import {HMSTime} from "../shared/type/hms-time.type";

export function run(km: number): Status {
  if (km <= 25) return "NOMINAL";
  if (km <= 37) return "TEMPO";
  if (km <= 43) return "SURVIVAL";
  return "FINISHER";
}

interface RaceReport{
  pace: Pace;
  finishTime: HMSTime;
  strategy:string;
  semi1: {
    time: HMSTime;
    pace: Pace;
  },
  semi2: {
    time: HMSTime;
    pace: Pace;
  },
  status: string
}
export const race:RaceReport = {
  pace: "4:58",
  finishTime: "03:33:53",
  strategy: "negative split",
  semi1: { time: "01:46:00", pace: "5:04" },
  semi2: { time: "01:47:00", pace: "4:53" },
  status: "finished"
};