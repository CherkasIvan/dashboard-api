export function Prop(): Function {
    return function (target: Object, propertyKey: string): Object | null {
        return target ? target : null;
    };
}
