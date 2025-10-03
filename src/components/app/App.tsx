import { BrowserRouter } from 'react-router-dom';
import { Header, Cards, Content, Banner, Search } from '../ui';
import '../../index.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Content>
        <Header userName="" />
        <Banner />
        <Search />
        <Cards title="" />
      </Content>
    </BrowserRouter>
  );
}
