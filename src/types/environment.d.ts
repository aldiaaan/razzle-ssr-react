declare global {
  namespace NodeJS {
    interface ProcessEnv {
      RAZZLE_PUBLIC_DIR: string;
    }
  }
}

export {};
