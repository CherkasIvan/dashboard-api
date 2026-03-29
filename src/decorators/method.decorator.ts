export function Method(
	target?: Object,
	propertyKey?: string,
	propertyDescriptor?: PropertyDescriptor,
): void {
	console.log(propertyKey);
}
