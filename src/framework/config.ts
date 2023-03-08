export function getConfig(env: 'DEV' | 'PROD') {
  return env === 'DEV'
    ? {
        API_VERSION: '1.0.0',
      }
    : {
        API_VERSION: '1.0.0',
      };
}
