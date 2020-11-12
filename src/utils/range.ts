export function range(from: number, to: number) {
  return new Array(to - from + 1).fill(null).map((_, index) => from + index);
}
