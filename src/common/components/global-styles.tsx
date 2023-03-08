import React from 'react';
import tw, {GlobalStyles as BaseStyles} from 'twin.macro';
import {Global, css} from '@emotion/react';

const customStyles = css({
  body: {
    ...tw`antialiased`,
  },
  ...css`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,500;1,600;1,700;1,800;1,900&display=swap');
    html {
      font-family: 'Poppins', sans-serif !important;
    }
  `,
});

export default function GlobalStyles() {
  return (
    <>
      <Global styles={customStyles} />
      <BaseStyles />
    </>
  );
}