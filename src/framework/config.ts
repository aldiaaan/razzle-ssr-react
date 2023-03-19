import {isDev} from './utils';

export const DevelopmentConfig = {
  MODE: 'development',
};

export const ProductionConfig = {
  MODE: 'production',
};

export const RuntimeConfig =
  typeof window !== 'undefined' ? window.__config : isDev() ? DevelopmentConfig : ProductionConfig;
