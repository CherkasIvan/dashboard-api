function log<T>(obj: T): T {
    return obj;
}

function log2<T, K>(obj: T, arr: K[]): K[] {
    return arr;
}

log<string>('5');
log<number>(5);

log2<number, string>(2, ['st', 'ri', 'ng']);

interface IHasLength {
    length: number;
}

function log3<T extends IHasLength, K>(obj: T, arr: K[]): K[] {
    console.log(obj.length);
    return arr;
}

interface IUser {
    name: string;
    age?: number;
    bid: <T>(sum: T) => boolean;
}

function bid<T>(sum: T): boolean {
    return true;
}
