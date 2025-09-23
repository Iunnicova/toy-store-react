// import '../../index.scss';
// import { LogoSvg } from '../svg/LogoSvg';
// import { HeaderUl } from '../ui';

//***** */

import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HeaderUl } from '../ui';
import '../../index.scss';

const App = () => {
  return (
    <BrowserRouter>
      <HeaderUl userName="Alice" />
      {/* <main>
        <h1>Hello React 🚀</h1>
      </main> */}
    </BrowserRouter>
  );
};

export default App;
