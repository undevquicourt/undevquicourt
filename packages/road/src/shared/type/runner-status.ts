const statuses = ["NOMINAL","TEMPO","SURVIVAL","FINISHER"] as const;
export type Status = typeof statuses[number];