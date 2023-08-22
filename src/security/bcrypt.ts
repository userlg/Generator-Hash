import { genSaltSync, hashSync,  } from "bcrypt-ts";

function generateHash(plainText: string): string {

    let salt = genSaltSync(10);

    let hash = hashSync(plainText, salt);

    return hash;
}

export default generateHash;