import Item from "./Item";
import { BrowserRouter } from 'react-router-dom';
import Topbar from './Topbar';

function App() {
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Item />
      </BrowserRouter>
    </>
  );
}

export default App;
