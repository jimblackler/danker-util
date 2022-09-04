export function binarySearch(length: number, predicate: (index: number) => boolean) {
  let low = 0;
  let high = length;
  while (low + 1 !== high) {
    const mid = Math.floor((low + high) / 2);
    if (predicate(mid)) {
      high = mid;
    } else {
      low = mid;
    }
  }
  return low;
}
