export function findValueByKey(
  array: { [key: string]: number }[],
  key: string,
): number | null {
  for (let i = 0; i < array.length; i++) {
    const obj = array[i];
    if (obj.hasOwnProperty(key)) {
      return obj[key];
    }
  }
  return null;
}
