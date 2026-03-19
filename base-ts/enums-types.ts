enum EDirection {
    Left,
    Right,
}

EDirection.Left;

function move(direction: EDirection) {
    switch (direction) {
        case EDirection.Left:
            return -1;
        case EDirection.Right:
            return 1;
    }
}

function objMode(obj: { Left: number }) {}

objMode(EDirection);

const enum EDirection2 {
    Up,
    Down,
}

let myDir = EDirection2.Up;
