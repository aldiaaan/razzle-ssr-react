export function isDev() {
  return process.env.NODE_ENV === 'development';
}

export function isServer() {
  return typeof window === 'undefined';
}
