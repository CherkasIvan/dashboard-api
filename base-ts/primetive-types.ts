let a: number = 5;
let b: string = 'dsf';

let c = a + b;

let d: string = '4';

let e: number = a + Number(d);

let f: boolean = true;

let names: string[] = ['Anton', 'Ivan'];
let ages: number[] = [13, 26];

let tup: [string, number] = ['TUP', 26];

let g: any = 3;
g = 'sdsad';
g = true;

let anyArr: any[] = ['sdf', 5, false];

function greet(name: string): string {
    return `HI ${name}`;
}

let concatNames = names.map((x: string): void => {
    x + x;
});

function cord(coordinates: { lat: number; long?: number }) {
    return coordinates;
}
