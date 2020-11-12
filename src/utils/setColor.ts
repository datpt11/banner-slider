import { CSSProperties } from 'types';

export default function setColor(color?: string): CSSProperties {
  return !!color ? { color } : {};
}
