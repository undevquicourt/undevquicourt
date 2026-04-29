import {Status} from "../shared/type/runner-status";

export function run(km: number): Status {
  if (km <= 25) return "NOMINAL";
  if (km <= 35) return "TEMPO";
  if (km <= 42) return "SURVIVAL";
  return "FINISHER";
}

export const race = {
  pace: "5:00/km",
  finishTime: "3h30",
  strategy: "even split",
  semi1: { time: "1h45", pace: "5:00/km" },
  semi2: { time: "1h45", pace: "5:00/km" },
};