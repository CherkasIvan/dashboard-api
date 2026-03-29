export function Controller(target?: Function): Function {
	return (target: Function) => {
		target.prototype;
	};
}
