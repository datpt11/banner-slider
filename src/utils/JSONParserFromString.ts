export type Selector = string;
export type QualifiedName = string;
export interface AttrAllReturn {
  [key: string]: string;
}
export type QueryAttr = (qualifiedName: QualifiedName) => string;
export type QueryAttrAll = () => AttrAllReturn;
export type QueryText = () => string;
export interface QueryReturn {
  attr: QueryAttr;
  attrAll: QueryAttrAll;
  text: QueryText;
  HTML: QueryText;
}
export type Query = (selectors: string) => QueryReturn;
export interface CallbackParams extends QueryReturn {
  query: Query;
}
export type Callback<T> = (element: CallbackParams) => T;

function getAttr($child: HTMLElement) {
  return (qualifiedName: QualifiedName) => {
    return $child.getAttribute(qualifiedName) || '';
  };
}

function getAttrAll($child: HTMLElement) {
  return () => {
    const attributes = Object.values($child.attributes);
    return attributes.reduce<AttrAllReturn>((obj, item) => {
      return {
        ...obj,
        [item.name]: item.value,
      };
    }, {});
  };
}

function getText($child: HTMLElement) {
  return () => {
    return $child.innerText || '';
  };
}

function getHTML($child: HTMLElement) {
  return () => {
    return $child.innerHTML || '';
  };
}

function handleCallback<T>($el: HTMLElement, callback: Callback<T>) {
  return callback({
    query: (selectors: Selector) => {
      const $child: HTMLElement | null = $el.querySelector(selectors);
      if (!$child) {
        return {
          attr: () => '',
          attrAll: () => ({}),
          text: () => '',
          HTML: () => '',
        };
      }
      return {
        attr: getAttr($child),
        attrAll: getAttrAll($child),
        text: getText($child),
        HTML: getHTML($child),
      };
    },
    attr: getAttr($el),
    attrAll: getAttrAll($el),
    text: getText($el),
    HTML: getHTML($el),
  });
}

export default function JSONParserFromString(source: string) {
  const doc = new DOMParser().parseFromString(source, 'text/html');
  return <T extends any>(selectors: Selector, callback: Callback<T>) => {
    const $els: HTMLElement[] = Array.from(doc.querySelectorAll(selectors));
    if ($els.length === 1) {
      const [$el] = $els;
      return [handleCallback($el, callback)];
    }
    return $els.map($el => {
      return handleCallback($el, callback);
    });
  };
}
