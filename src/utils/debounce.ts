export default function debounce<F extends (...params: any[]) => void>(fn: F, delay = 400) {
  let timeoutID: number = (null as unknown) as number;
  return ((_this: any, ...args: any[]) => {
    clearTimeout(timeoutID);
    timeoutID = window.setTimeout(() => fn.apply(_this, args), delay);
  }) as F;
}
