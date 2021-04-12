import { useEffect } from 'react';
import cflogo from '../../imgs/cflogo.png';
import './home1.css';
import { Show } from '../show/show';
import { Select } from '../select/select';
import { useRecoilState } from 'recoil';
import { atomCurrentScreenState } from '../../component/button/button';
import { selectingState } from '../../atom/select_state';

export const Home1 = () => {
  const [screenState, setScreenState] = useRecoilState(atomCurrentScreenState);
  const [state] = useRecoilState(selectingState);
  useEffect(() => {
    setScreenState('init');
  }, []);
  console.log('cfmark screenState = ', screenState);
  return (
    <div
      className="App"
      onClick={(): void => {
        if (screenState === 'init') setScreenState('select');
      }}
    >
      {screenState === 'select' && <Select />}
      {screenState === 'init' && (
        <header className="App-header">
          <img src={cflogo} className="App-logo" alt="logo" />
          <p>HPW 12/04/2021</p>
          <p
            style={{
              color: 'black',
              opacity: 0.1
            }}
          >
            120420212230
          </p>
        </header>
      )}
      {screenState === 'play' && <Show {...state.selected.split(', ')} />}
    </div>
  );
};
