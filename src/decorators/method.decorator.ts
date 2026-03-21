export function Method(
    target?: Object,
    propertyKey?: string,
    propertyDescriptor?: PropertyDescriptor,
) {
    console.log(propertyKey);
}
