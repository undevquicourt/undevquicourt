const statuses = ["NOMINAL","TEMPO","SURVIVAL","FINISHER","RECOVERING"] as const;
export type Status = typeof statuses[number];