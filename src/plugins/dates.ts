export type TDateArr = [number, number, number];
type oneToNine = 1|2|3|4|5|6|7|8|9;
type d = oneToNine | 0;
type DD = `${0}${oneToNine}` | `${1|2}${d}` | `3${0|1}`;
type MM = `0${oneToNine}` | `1${0|1|2}`;
export type YYYY = `19${d}${d}` | `20${d}${d}`;
export type TDateKebab = `${YYYY}-${MM}-${DD}`
export type TRussianDate = `${DD}.${MM}.${YYYY}`

class DateKebab {
    constructor(public str: TDateKebab) {}

    toArr(): TDateArr {
        return this.str.split('-').map(str => +str) as TDateArr;
    }
}

export const getDateFromKebab = (str: TDateKebab): Date => {
    let dateArr: TDateArr = new DateKebab(str).toArr();
    if (dateArr.find(d => isNaN(d))) return new Date();
    dateArr[1]--;
    return new Date(dateArr[0], dateArr[1], dateArr[2]);
}