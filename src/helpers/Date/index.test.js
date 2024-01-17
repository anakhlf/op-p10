import { getMonth } from "./index"; // Importez la fonction getMonth depuis votre fichier source

describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            const testDate = new Date("2022-01-01");
            expect(getMonth(testDate)).toBe("janvier");
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            const testDate = new Date("2022-07-08");
            expect(getMonth(testDate)).toBe("juillet");
        });
    });
})

