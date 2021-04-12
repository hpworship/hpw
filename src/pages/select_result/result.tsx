import { useRecoilState } from 'recoil';
import { selectingState } from '../../atom/select_state';
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

  return (
    <div className="resultB">
      {state.selected.length > 0 && (
        <div className="selectedSong">
          {songNodes(state.selected.split(', '))}
        </div>
      )}
      {state.typing.length > 0 && (
        <div className="resultTyping">
          <h6 className="typingText">{state.typing}</h6>
        </div>
      )}
    </div>
  );
};
