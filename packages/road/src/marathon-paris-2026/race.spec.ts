import {runner} from "../config";
import {race} from "./race";
import {paceToMsSpeed, parseTime} from "../shared/helpers/pace";

describe("Marathon de Paris 2026", () => {

    it("should finish the race", () => {
        expect(race.status).toBe("finished");
        // ✅ PASS
    });

    it("should achieve negative split", () => {
        expect(paceToMsSpeed(race.semi2.pace)).toBeGreaterThan(paceToMsSpeed(race.semi1.pace));
        // ✅ PASS — 4:53 < 5:04
    });

    it("should hit target finish time", () => {
        expect(parseTime(race.finishTime)).toBeLessThanOrEqual(parseTime("03:30:00"));
        // ❌ FAIL — actual: 3:33:53 (+3:53)
    });

    it("should maintain composure at finish", () => {
        //@ts-expect-error just for the craic
        expect(runner.tears).toBe(false);
        // ❌ FAIL
    });

    it("should be able to walk after", () => {
        //@ts-expect-error just for the craic
        expect(stairs.status).not.toBe(503);
        // ❌ FAIL — 503 Service Unavailable
    });
});