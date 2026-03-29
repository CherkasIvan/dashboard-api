import 'reflect-metadata';

export function Inject(key?: string): Function {
	return (target: Function) => {
		Reflect.defineMetadata(key, 2, target);
		const meta = Reflect.getMetadata(key, target);
		console.log(meta);
		return meta;
	};
}

export function Injectable(key?: string): Function {
	return (target: Function) => {
		Reflect.defineMetadata(key, 2, target);
		const meta = Reflect.getMetadata(key, target);
		console.log(meta);
		return meta;
	};
}
