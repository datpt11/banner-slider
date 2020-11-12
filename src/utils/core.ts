import { html, Component as PComponent } from 'htm/preact';
import createState, { CreateStateInterface, UnSubscribe } from './createState';

export * from 'htm/preact';
export { VNode } from 'preact';
export { createPortal, PureComponent } from 'preact/compat';
export { createState };

interface MapStateDefault {
  getState: CreateStateInterface['getState'];
  subscribe: CreateStateInterface['subscribe'];
}

function getStates<T extends Record<string, MapStateDefault>>(mapStateToProps: T) {
  return Object.keys(mapStateToProps).reduce<Record<string, CreateStateInterface['getState']>>((obj, key) => {
    return {
      ...obj,
      [key]: mapStateToProps[key].getState(),
    };
  }, {});
}

export function withStore<T extends Record<string, any>>(mapStateToProps: T) {
  return <C>(Component: C) => {
    class WithStore extends PComponent {
      private unsubs: UnSubscribe[];

      constructor() {
        super();
        this.state = {
          ...getStates(mapStateToProps),
        };
        this.unsubs = Object.keys(mapStateToProps).map<UnSubscribe>(key => {
          return mapStateToProps[key].subscribe(this.handleSubscribe);
        });
      }

      public componentWillUnmount() {
        this.unsubs.forEach(unsub => {
          unsub();
        });
      }

      private handleSubscribe = () => {
        this.setState({
          ...getStates(mapStateToProps),
        });
      };

      public render() {
        return html`<${Component} ...${this.state} />`;
      }
    }
    return WithStore as any;
  };
}
