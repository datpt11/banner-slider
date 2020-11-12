export default function qs<T extends object>(source: T): string {
  return Object.entries(source).reduce((str, [key, value]) => {
    return `${str}${!!str ? '&' : ''}${key}=${value}`;
  }, '');
}
