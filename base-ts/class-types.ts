class Coord {
    message = '1';
    lat!: number;
    long!: number;

  computeDistance(newLat: number, newLang: number ):number {
    return 1
  }

    constructor(lat: number, long: number) {
        this.lat = lat;
        this.long = long;
        console.log(this.message)
    }
}

const point = new Coord(0, 1);

class MapLocation extends Coord {
    message = '21';
    _name!: string;

  override computeDistance(newLat: number, newLang: number ):number {
    return 1
  }

  get name() {
    return this._name
  }

  set name(currentName: string) {
    this._name = currentName
  }

    constructor(lat: number, long: number, name: string) {
        super(lat, long);
    }
}

interface ILoggerService {
  log: (s: string) => void
}

class Log implements ILoggerService {
  log(s: string) {
    console.log(s)
  };
}


abstract class Base {
  print(s: string) {
    console.log(s)
  }

  abstract error(e:string): void 

  }

class BaseExtended extends Base {
  error(e: string): void {
    throw new Error("Method not implemented.");
  }

}


class Animal {
  name!:string
}

class Dog {
  name!:string
  tail!: boolean
}

const puppy: Animal = new Dog()

new BaseExtended().print('qqqq')