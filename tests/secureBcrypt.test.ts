import { describe, it, expect } from "vitest";

import generateHash from '../src/security/bcrypt';

import { compareSync } from "bcrypt-ts"

describe("Secure suit test", () => {

    it("Generate Hash Test", async () => {

        let wordTest = 'WordTest1';

        let hash = generateHash(wordTest);

        expect(compareSync(wordTest, hash)).toBeTruthy();
    });


});