// import '../../index.scss';
// import { LogoSvg } from '../svg/LogoSvg';
// import { Header } from '../ui';

//***** */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '../ui';
import { Cards } from '../ui';
import '../../index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <Header userName="V" />
      <Cards />
    </BrowserRouter>
  );
};

export default App;
