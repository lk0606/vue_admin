
export function isObject(data: object): boolean {
  return Object.prototype.toString.call(data) === "[object Object]";
}
