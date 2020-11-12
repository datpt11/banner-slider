export type ScrollEndCallback = () => void;
export interface Config {
  offset: number;
  root: Element | null;
}

let prevY = -1;

function scrollEnd(element: Element | null, callback: ScrollEndCallback, config?: Partial<Config>) {
  if (!element) {
    return;
  }
  const defaultConfig: Config = {
    offset: 10,
    root: null,
  };
  const cfg = { ...defaultConfig, ...config };
  const { offset, root } = cfg;
  const handleScroll: IntersectionObserverCallback = entries => {
    const ratio = entries[0].intersectionRatio;
    const y = entries[0].boundingClientRect.y;
    if ((prevY === -1 || prevY > y) && ratio !== 0) {
      callback();
    }
    prevY = y;
  };
  const instance = new IntersectionObserver(handleScroll, {
    root,
    rootMargin: `0px 0px ${offset}px 0px`,
    threshold: 1,
  });
  instance.observe(element);
}

export default scrollEnd;
