import { readFileSync } from 'fs';


export const readFile = (fn) => {

    return readFileSync(fn, 'utf-8');
};
