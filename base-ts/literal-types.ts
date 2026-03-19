const a = 'sfsdf';

const b: 'hi' = 'hi';

type TDirection = 'left' | 'right';

function moveDog(direction: TDirection): -1 | 0 | 1 {
    switch (direction) {
        case 'left':
            return -1;
        case 'right':
            return 1;
        default:
            return 0;
    }
}

moveDog('left');

interface IConnection {
    host: string;
    port: number;
}

function connect(connection: IConnection | 'default') {}

connect('default');

const connection = {
    host: 'localhost',
    protocol: 'https' as 'https',
};

function connectToHttps(host: string, protocol: 'http' | 'https') {}

connectToHttps(connection.host, connection.protocol);

const c: any = 5;
const d = c as number;
const e = <number>c;
