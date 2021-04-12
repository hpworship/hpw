import './App.css';
import { Home1 } from './pages/home/home1';
import { RecoilRoot } from 'recoil';

function App() {
  // return <Select />;
  return (
    <RecoilRoot>
      <Home1 />
    </RecoilRoot>
  );
}

export default App;
