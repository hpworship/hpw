import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectingState } from '../../atom/select_state';
import { atomDevMode } from '../../component/button/button';
import './result.css';

export const Result = () => {
  const [state, setState] = useRecoilState(selectingState);

  function songNodes(names: string[]) {
    // let titles = names.join('  ');
    // titles = titles + titles;
    // titles = titles + titles;
    // titles = titles + titles;

    // return (
    //   <div className="songList">
    //     <p className="songTitles">{titles}</p>
    //   </div>
    // );

    return (
      <div className="songList">
        {names.map((i: string) => (
          <div
            className={i.includes('TC-') ? 'colorNodeTC' : 'colorNodeTVCHH'}
            key={Math.random()}
          >
            <p className="songTitle">{i}</p>
          </div>
        ))}
      </div>
    );
  }

  // const [devMode, setDevMode] = useRecoilState(atomDevMode);
  // const [clickCount, setClickCount] = useState(0);
  // useEffect(() => {
  //   if (clickCount % 7 === 0) {
  //     setDevMode(!devMode);
  //   }
  // }, [clickCount]);

  return (
    <div
      className="resultB"
      //  onClick={() => setClickCount(clickCount + 1)}
    >
      {state.selected.length > 0 && (
        <div className="selectedSong">
          {songNodes(state.selected.split(', '))}
        </div>
      )}
      {state.typing.length > 0 && (
        <div
          className="resultTyping"
          // onClick={() => setClickCount(clickCount + 1)}
        >
          <h6 className="typingText">{state.typing}</h6>
        </div>
      )}
    </div>
  );
};
