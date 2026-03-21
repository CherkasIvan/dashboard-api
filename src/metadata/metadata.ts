import 'reflect-metadata';

export function Meta(target: Function): void {
    Reflect.defineMetadata('a', 1, target);
    const meta = Reflect.getMetadata('a', target);
    console.log(meta);
}
