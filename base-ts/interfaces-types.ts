type TCoordinates = { lat: number; long?: number };

interface ICoordinates {
    lat: number;
    long?: number;
}

function cord(coordinates: TCoordinates | ICoordinates) {
    return coordinates;
}

interface IAnimal {
    name: string;
}

interface IDog extends IAnimal {
    tail: boolean;
}

const dog: IDog = {
    name: 'Patrik',
    tail: true,
};

type TAnimal = {
    name: string;
};

type TCat = TAnimal & {
    tail?: boolean;
};

const cat: TCat = {
    name: 'Zura',
};

interface IAleph {
    name: string;
}

interface IAleph {
    tail: boolean;
}
