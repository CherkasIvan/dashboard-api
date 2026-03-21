export function LoggerDecorator(): Function {
    return (target: Function) => {
        console.log(target.prototype);
        target.prototype;
    };
}
