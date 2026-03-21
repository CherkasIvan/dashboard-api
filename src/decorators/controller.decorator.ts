export function Controller(target?: Function): Function {
    console.log(target);
    return (target: Function) => {
        console.log(target.prototype);
        target.prototype;
    };
}
