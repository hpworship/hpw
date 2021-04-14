import './button.css';
import iconClear from '../../imgs/iconClear.png';
import iconPlay from '../../imgs/iconPlay.png';
import { atom, useRecoilState } from 'recoil';
import { selectingState } from '../../atom/select_state';
import { isMobile } from 'react-device-detect';

const MAX_TC_SONG_NUMBER = 903;
const MAX_TVCHH_SONG_NUMBER = 387;

export const atomDevMode = atom({
  key: 'devModeState',
  default: false
});

export const atomCurrentScreenState = atom({
  key: 'screenState',
  default: 'select'
});

export const viewModeState = atom({
  key: 'viewMode',
  default: 0
});

export const Button = (t: string) => {
  const [, setScreenState] = useRecoilState(atomCurrentScreenState);
  const [state, setState] = useRecoilState(selectingState);
  let fs = 25;
  let color = '#4d648d';
  let title = t;

  // color & font size
  if (t === 'TC') color = '#35a79c';
  if (t === 'TVCHH') {
    color = '#63ace5';
    fs = 18;
  }
  if (t === 'X' || t === 'NEW') {
    color = '#ff8b94';
  }
  if (t === 'GO') {
    color = '#88d8b0';
  }

  // title
  if (t === '_') {
    title = '';
  }

  let center = (
    <h6
      className="t"
      style={{
        fontSize: fs
      }}
    >
      {title}
    </h6>
  );

  // icon
  if (t === 'X') {
    center = <img src={iconClear} alt="clear" style={{ height: 30 }} />;
  }
  if (t === 'GO') {
    center = <img src={iconPlay} alt="play" style={{ height: 30 }} />;
  }

  function handleClick(s: string): void {
    console.log('cfmark Number(state.typing) aa = ', Number(state.typing));
    console.log('cfmark s = ', s);
    console.log('cfmark Number(s) = ', Number(s));
    if (s === 'GO' && state.selected.length > 0) {
      console.log('cfmark screenState = ');
      setState({ ...state, typing: '' });
      setScreenState('play');
      return;
    }
    if (!isNaN(Number(s))) {
      if (state.typing.length === 0) {
        setState({ ...state, typing: s });
      } else {
        const newTyping = state.typing + s;
        if (Number(newTyping) <= MAX_TC_SONG_NUMBER) {
          setState({ ...state, typing: newTyping });
        }
      }
      return;
    }
    console.log('cfmark Number(state.typing) bb = ', Number(state.typing));
    if (s === 'TC' && !isNaN(Number(state.typing)) && state.typing.length > 0) {
      if (Number(state.typing) <= MAX_TC_SONG_NUMBER) {
        setState({
          typing: '',
          selected:
            state.selected +
            ((state.selected === '' ? '' : ', ') + 'TC-' + Number(state.typing))
        });
      }

      return;
    }
    if (
      s === 'TVCHH' &&
      !isNaN(Number(state.typing)) &&
      state.typing.length > 0
    ) {
      if (Number(state.typing) <= MAX_TVCHH_SONG_NUMBER) {
        setState({
          typing: '',
          selected:
            state.selected +
            ((state.selected === '' ? '' : ', ') +
              'TVCHH-' +
              Number(state.typing))
        });
      }

      return;
    }
    if (s === 'X') {
      setState({ ...state, typing: '' });
      return;
    }

    if (s === 'NEW') {
      setState({ selected: '', typing: '' });
      return;
    }
    console.log('');
  }

  return (
    <div
      key={Math.random()}
      onClick={(): void => handleClick(t)}
      className={isMobile ? 'buttonMobile' : 'buttonDesktop'}
      style={{ backgroundColor: color }}
    >
      {center}
    </div>
  );
};
