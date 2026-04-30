import { computeSplits } from "./pace";
import {Checkpoint} from "../type/checkpoint";

describe("computeSplits", () => {
    describe("input validation", () => {
        it("throws when input is not an array", () => {
            //@ts-expect-error runtime guard
            expect(() => computeSplits(null)).toThrow();
            //@ts-expect-error runtime guard
            expect(() => computeSplits(undefined)).toThrow();
            //@ts-expect-error runtime guard
            expect(() => computeSplits("foo")).toThrow();
        });

        it("throws on an empty array", () => {
            expect(() => computeSplits([])).toThrow();
        });

        it("throws with a single checkpoint", () => {
            expect(() => computeSplits([{ km: 5, time: "00:25:00" }])).toThrow(
            );
        });
    });

    describe("synthetic start checkpoint", () => {
        it("does not prepend a start when the first checkpoint is already km 0", () => {
            const splits = computeSplits([
                { km: 0, time: "00:00:00" },
                { km: 5, time: "00:27:30" },
                { km: 10, time: "00:55:00" },
            ]);

            expect(splits).toHaveLength(2);
            expect(splits[0].from).toBe(0);
            expect(splits[0].to).toBe(5);
        });

        it("prepends a synthetic { km: 0, time: '00:00:00' } when the first checkpoint is not at km 0", () => {
            const splits = computeSplits([
                { km: 5, time: "00:27:30" },
                { km: 10, time: "00:55:00" },
            ]);

            expect(splits).toHaveLength(2);
            expect(splits[0]).toMatchObject({ from: 0, to: 5 });
            expect(splits[1]).toMatchObject({ from: 5, to: 10 });
        });
    });

    describe("split computation", () => {
        const checkpoints:Checkpoint[] = [
            { km: 0, time: "00:00:00" },
            { km: 5, time: "00:27:30" },
            { km: 10, time: "00:55:00" },
            { km: 21.1, time: "01:56:00" },
        ];

        it("returns n-1 splits for n checkpoints", () => {
            expect(computeSplits(checkpoints)).toHaveLength(3);
        });

        it("exposes the expected shape on every split", () => {
            const splits = computeSplits(checkpoints);

            for (const split of splits) {
                expect(split).toEqual({
                    from: expect.any(Number),
                    to: expect.any(Number),
                    distance: expect.any(Number),
                    splitTime: expect.any(String),
                    pace: expect.any(String),
                });
            }
        });

        it("computes distance as the difference between consecutive km marks", () => {
            const splits = computeSplits(checkpoints);

            expect(splits[0].distance).toBe(5);
            expect(splits[1].distance).toBe(5);
            expect(splits[2].distance).toBeCloseTo(11.1, 5);
        });

        it("chains from/to so the route is contiguous", () => {
            const splits = computeSplits(checkpoints);

            for (let i = 1; i < splits.length; i++) {
                expect(splits[i].from).toBe(splits[i - 1].to);
            }
        });

        it("covers the full route from 0 to the last checkpoint", () => {
            const splits = computeSplits(checkpoints);

            expect(splits[0].from).toBe(0);
            expect(splits.at(-1)!.to).toBe(21.1);
        });
    });

    describe("monotonicity guards", () => {
        it("throws when two consecutive checkpoints share the same km", () => {
            expect(() =>
                computeSplits([
                    { km: 0, time: "00:00:00" },
                    { km: 5, time: "00:25:00" },
                    { km: 5, time: "00:30:00" },
                ]),
            ).toThrow();
        });

        it("throws when km goes backwards", () => {
            expect(() =>
                computeSplits([
                    { km: 0, time: "00:00:00" },
                    { km: 5, time: "00:25:00" },
                    { km: 3, time: "00:30:00" },
                ]),
            ).toThrow();
        });

        it("throws when two consecutive checkpoints share the same time", () => {
            expect(() =>
                computeSplits([
                    { km: 0, time: "00:00:00" },
                    { km: 5, time: "00:25:00" },
                    { km: 10, time: "00:25:00" },
                ]),
            ).toThrow();
        });

        it("throws when time goes backwards", () => {
            expect(() =>
                computeSplits([
                    { km: 0, time: "00:00:00" },
                    { km: 5, time: "00:25:00" },
                    { km: 10, time: "00:24:00" },
                ]),
            ).toThrow();
        });

        it("also validates the synthetic-start segment", () => {
            expect(() =>
                computeSplits([
                    { km: 5, time: "00:00:00" },
                    { km: 10, time: "00:30:00" },
                ]),
            ).toThrow();
        });
    });
});