const isDev = process.env.NODE_ENV === 'development';

export default function stateLog<S>(actionName: string, prevState: S, state: S) {
  if (!isDev) {
    return;
  }
  const date = new Date();
  const hour = date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  console.group('%c action', 'color: #999', `@${hour}`);
  console.log('%c prev state ', 'color: #999; font-weight: 600', prevState);
  console.log(`%c ${actionName} `, 'color: #00aeff; font-weight: 600; font-size: 12px');
  console.log('%c next state ', 'color: #7ac143; font-weight: 600', state);
  console.groupEnd();
}
