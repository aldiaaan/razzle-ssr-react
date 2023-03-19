export {};

declare global {
  interface Window {
    __config: Record<string, string>;
  }
}
