let universalId: number | string = 5;
universalId = '5';

function printId(id: number | string) {
    if (typeof id == 'string') {
        return id.toUpperCase();
    } else {
        id.toFixed(1);
    }
}

function helloUser(user: string | string[]) {
    if (Array.isArray(user)) {
        console.log(user.join(', ') + 'Hi!');
        return user.join(', ');
    } else {
        console.log(user.toLowerCase() + 'Hello!');
        return user.toLowerCase();
    }
}
