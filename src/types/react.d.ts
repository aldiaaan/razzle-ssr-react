import 'twin.macro';
import {CSSInterpolation} from '@emotion/serialize';

declare module 'react' {
  interface DOMAttributes<T> {
    tw?: string;
    css?: CSSInterpolation;
  }
}
