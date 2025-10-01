// import '../../index.scss';
// import { LogoSvg } from '../svg/LogoSvg';
// import { Header } from '../ui';

//***** */

// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// import { Header } from '../ui';
// import { Cards } from '../ui';
// import '../../index.scss';

import { BrowserRouter } from 'react-router-dom';
import { Header, Cards } from '../ui';
import '../../index.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Header userName="V" />
      <Cards title="V" />
    </BrowserRouter>
  );
}
