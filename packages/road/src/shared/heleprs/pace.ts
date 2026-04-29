export function parseTime(hhmmss) {
    const [h, m, s] = hhmmss.split(":").map(Number);
    return h * 3600 + m * 60 + s;
}

export function formatPace(secondsPerKm) {
    const m = Math.floor(secondsPerKm / 60);
    const s = Math.round(secondsPerKm % 60);
    return `${m}:${String(s).padStart(2, "0")}/km`;
}

export function formatDuration(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
}

export function computeSplits(checkpoints) {
    if (!Array.isArray(checkpoints) || checkpoints.length < 2) {
        throw new Error("computeSplits: au moins 2 checkpoints requis (départ + arrivée)");
    }

    const points = checkpoints[0].km === 0
        ? checkpoints
        : [{ km: 0, time: "00:00:00" }, ...checkpoints];

    return points.slice(1).map((curr, i) => {
        const prev = points[i];
        const distance = curr.km - prev.km;
        const splitTime = parseTime(curr.time) - parseTime(prev.time);

        if (distance <= 0) {
            throw new Error(`computeSplits: distance non croissante entre km ${prev.km} et km ${curr.km}`);
        }
        if (splitTime <= 0) {
            throw new Error(`computeSplits: temps non croissant entre ${prev.time} et ${curr.time}`);
        }

        return {
            from: prev.km,
            to: curr.km,
            distance,
            splitTime: formatDuration(splitTime),
            pace: formatPace(splitTime / distance),
        };
    });
}