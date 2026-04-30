// Marathon de paris 2026
// 42.195, 163 D+ — 12 avril 2026

export const RACE = {
    name: "Marathon de paris 2026",
    date: "2026-04-12",
    distance: 42.195,
    elevation: 163,
};

/** @type {{ km: number, time: string }[]} */
export const SPLITS = [
    { km: 0, time: "00:00:00" },
    { km: 10, time: "00:51:05" },
    { km: 20, time: "01:41:37" },
    { km: 30, time: "02:31:31" },
    { km: 40, time: "03:20:08" },
    { km: 43, time: "03:33:53" },
];

/** @type {{ km: number, time: string }[]} */
export const MACRO_SPLITS = [
    { km: 0, time: "00:00:00" },
    { km: 21, time: "01:46:31" },
    { km: 43, time: "03:33:53" },
];