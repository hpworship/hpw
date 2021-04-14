import { useEffect } from 'react';
import cflogo from '../../imgs/cflogo.png';
import iconI from '../../imgs/iconI.png';
import iconA from '../../imgs/iconA.png';
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
    // onClick={(): void => {
    //   if (screenState === 'init') setScreenState('select');
    // }}
    >
      {screenState === 'select' && <Select />}
      {screenState === 'init' && (
        <header className="App-header">
          <div onClick={(): void => {
            if (screenState === 'init') setScreenState('select');
          }}>
            <img src={cflogo} className="App-logo" alt="logo" />
          </div>
          <p>HPW 12/04/2021</p>
          <p
            style={{
              color: 'black',
              opacity: 0.1
            }}
          >
            120420210247
          </p>
          <div style={{ flexDirection: 'row', alignItems: 'center', }}>
            <img src={iconA} style={{ height: 25, width: 25, marginRight: 20 }} alt="iconAndroid" />
            <a href="https://youtu.be/pbbf6HZcUCI" target="_blank" rel="noreferrer" style={{ color: 'white', fontSize: 18 }}>Tạo shortcut ngoài màn hình cho android</a>
          </div>
          <div style={{ flexDirection: 'row', alignItems: 'center' }}>
            <img src={iconI} style={{ height: 25, width: 25, marginRight: 20 }} alt="iconIos" />
            <a href="https://youtu.be/i8Cz1B-x5qA" target="_blank" rel="noreferrer" style={{ color: 'white', fontSize: 18 }}>Tạo shortcut ngoài màn hình cho iPhone/iPad</a>
          </div>

        </header>
      )}
      {screenState === 'play' && <Show {...state.selected.split(', ')} />}
    </div>
  );
};
