import { BrowserRouter } from 'react-router-dom';
import { Header, Cards, Content } from '../ui';
import '../../index.scss';

export default function App() {
  return (
    <BrowserRouter>
      <Content>
        <Header userName="V" />
        <Cards title="V" />
      </Content>
    </BrowserRouter>
  );
}
