import type { CSSProperties } from 'types';

export default function setStyle(source: CSSProperties | undefined) {
  if (!source || !Object.keys(source).length) {
    return '';
  }
  const newObj = Object.assign(
    {},
    ...Object.entries(source).map(([prop, value]) => {
      const newProp = prop.replace(/[A-Z]/g, p => `-${p.toLowerCase()}`);
      const newValue = typeof value === 'number' ? `${value}px` : value;
      return {
        [newProp]: newValue,
      };
    }),
  );
  return JSON.stringify(newObj).replace(/,"/g, ';"').replace(/"|{|}/g, '');
}
