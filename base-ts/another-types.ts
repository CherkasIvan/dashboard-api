let a = 'Hi!'

if(typeof a == 'string'){

}

let b: typeof a

type Coord = {
  lat: number,
  long:number
}

type P = keyof Coord

let c: P = 'long'

function log(str: string | null): void {
  str?.toLowerCase()
}

const d: bigint = BigInt(100000000000)

const e: symbol = Symbol('aaa')