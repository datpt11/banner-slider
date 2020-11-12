export default function delay(ms = 0) {
  return new Promise((resolve: () => void) => {
    const timeId = setTimeout(() => {
      resolve();
      clearTimeout(timeId);
    }, ms);
  });
}
