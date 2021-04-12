import './show.css';
import { allTCS, allTVS } from '../../const/name_list';
import React, { useEffect, useState } from 'react';
import {
  // RecoilRoot,
  atom,
  // selector,
  useRecoilState
  // useRecoilValue
} from 'recoil';
import left from '../../imgs/left.png';
import right from '../../imgs/right.png';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { atomCurrentScreenState } from '../../component/button/button';
import { iOS } from '../select/select';

const atomCurrentIndex = atom({
  key: 'cgi', // unique ID (with respect to other atoms/selectors)
  default: 0
});

type ControlProps = {
  onBack: () => void;
  onNext: () => void;
  songs: Array<string>;
};

const SongsNode = (controlProps: ControlProps) => {
  const songs = controlProps.songs;
  const [cgi, setCgi] = useRecoilState(atomCurrentIndex);

  console.log('cfmark cgi = ', cgi);

  const totalItems: Array<React.ReactNode> = [];
  const count = Object.keys(songs).length;
  for (let i = 0; i < count; i++) {
    totalItems.push(
      <div
        key={Math.random()}
        onClick={(): void => setCgi(i)}
        style={{
          display: 'flex',
          width: 75,
          minWidth: 75,
          height: 35,
          backgroundColor: songs[i].includes('TVCHH-') ? '#63ace5' : '#35a79c',
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 2,
          marginRight: 2,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          border: i === cgi ? '4px solid #fe8a71' : '4px solid transparent'
        }}
      >
        <h6 style={{ color: 'white' }}>{songs[i]}</h6>
      </div>
    );
  }

  return (
    <div className="bottomBar">
      {totalItems}
      {/* <div className="button" onClick={(): void => controlProps.onBack()}>
        <img src={left} alt="left" style={{ height: 30 }} />
      </div> */}
      {/* <Node {...controlProps.songs} /> */}
      {/* <div className="button" onClick={(): void => controlProps.onNext()}>
        <img src={right} alt="right" style={{ height: 30 }} />
      </div> */}
    </div>
  );
};

export const Show = (texts: Array<string>) => {
  const [cgi, setCgi] = useRecoilState(atomCurrentIndex);
  const paths: string[] = [];
  const songNames: string[] = [];

  for (let k = 0; k < Object.keys(texts).length; k++) {
    const text = texts[k];
    const isTC = text.startsWith('TC-');
    const number = text.split('-')[1];
    let didAdd = 0;
    for (let i = 1; i < 10; i++) {
      const dsiplayName = isTC
        ? 'TC-' + number + '_' + i.toString()
        : 'TVCHH-' + number + '_' + i.toString();
      const name = isTC
        ? 'TC-' + number + '_' + i.toString() + '.png'
        : 'TVCHH-' + number + '_' + i.toString() + '.jpg';
      const path = isTC
        ? '/imgs/TC/' + 'TC-' + number + '_' + i.toString() + '.png'
        : '/imgs/TVCHH/' + 'TVCHH-' + number + '_' + i.toString() + '.jpg';
      if ((isTC && allTCS.includes(name)) || (!isTC && allTVS.includes(name))) {
        paths.push(path);
        songNames.push(dsiplayName);
        didAdd++;
      } else {
        break;
      }
    }
    if (didAdd === 0) {
      paths.push(
        isTC
          ? '/imgs/TC/' + 'TC-' + number + '.png'
          : '/imgs/TVCHH/' + 'TVCHH-' + number + '.jpg'
      );
      songNames.push(isTC ? 'TC-' + number : 'TVCHH-' + number);
    }
  }

  const onNext = (): void => {
    let n = cgi + 1;
    if (n >= Object.keys(paths).length) n = Object.keys(paths).length - 1;
    setCgi(n);
  };

  const onBack = (): void => {
    let n = cgi - 1;
    if (n <= 0) n = 0;
    setCgi(n);
  };

  const [, setScreenState] = useRecoilState(atomCurrentScreenState);
  const [leftOpacity, setleftOpacity] = useState(0.0);
  const [rightOpacity, setRightOpacity] = useState(0.0);
  const [view, setView] = useState(0);
  const [imgW, setImgW] = useState(1);
  const [imgH, setImgH] = useState(1);
  const [divW, setDivW] = useState(1);
  const [divH, setDivH] = useState(1);

  const handle = useFullScreenHandle();

  useEffect(() => {
    if (!iOS()) {
      handle.enter();
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setleftOpacity(0.2);
    }, 300);
    setTimeout(() => {
      setleftOpacity(0);
    }, 600);
    setTimeout(() => {
      setleftOpacity(0.2);
    }, 900);
    setTimeout(() => {
      setleftOpacity(0);
    }, 1200);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setRightOpacity(0);
    }, 300);
    setTimeout(() => {
      setRightOpacity(0.2);
    }, 600);
    setTimeout(() => {
      setRightOpacity(0);
    }, 900);
    setTimeout(() => {
      setRightOpacity(0.2);
    }, 1200);
    setTimeout(() => {
      setRightOpacity(0);
    }, 1500);
  }, []);

  let className = '';

  if ((divH * (iOS() ? 0.9 : 1)) / divW >= imgH / imgW) {
    className = 'imgMobile';
  } else {
    className = 'imgDesktop';
  }
  let forceClassName = '';
  if (view > 0) {
    if (view === 1) forceClassName = 'imgDesktop';
    if (view === 2) forceClassName = 'imgMobile';
  }

  const imgEl = React.createRef<HTMLImageElement>();
  const divRef = React.createRef<HTMLDivElement>();

  const mainContent = (
    <div>
      <div
        className={iOS() ? 'showiOS' : 'showAll'}
        ref={divRef}
        onLoad={() => {
          setDivW(Number(divRef?.current?.offsetWidth) ?? 1);
          setDivH(Number(divRef?.current?.offsetHeight) ?? 1);
        }}
      >
        {/* <div hidden={isLoading}>
    <CustomImage
      // className={'sheet ' + fitName}
      className={'sheet'}
      src={`${process.env.PUBLIC_URL}${paths[cgi]}`}
      alt={paths[cgi]}
      onState={(v: boolean): void => setIsLoading(v)}
    />
  </div> */}
        <div className="sheet">
          <img
            ref={imgEl}
            className={view === 0 ? className : forceClassName}
            src={`${process.env.PUBLIC_URL}${paths[cgi]}`}
            alt={paths[cgi]}
            loading="eager"
            onLoad={() => {
              setImgW(imgEl?.current?.naturalWidth ?? 1);
              setImgH(imgEl?.current?.naturalHeight ?? 1);
            }}
          />

          <div className="leftRightButton">
            <div
              onClick={() => onBack()}
              className="left"
              style={{
                opacity: leftOpacity
              }}
            >
              <img src={left} alt="left" style={{ height: 90 }} />
            </div>
            <div
              onClick={() => onNext()}
              className="right"
              style={{
                opacity: rightOpacity
              }}
            >
              <img src={right} alt="right" style={{ height: 90 }} />
            </div>
          </div>
        </div>

        <SongsNode onBack={onBack} onNext={onNext} songs={songNames} />
        <div>
          <div
            className="stopButtonView"
            onClick={() => setScreenState('select')}
          >
            <div className="stopButton"></div>
          </div>
        </div>

        <div>
          <div
            className="changeButtonView"
            onClick={() => {
              if (view === 0) setView(1);
              if (view === 1) setView(2);
              if (view === 2) setView(0);
            }}
          >
            <div className="changeButton">
              <h6>{view}</h6>
            </div>
          </div>
        </div>
        {/* {isLoading && (
    <div className="loading">
      <h1 className="loadingText">loading...</h1>
    </div>
  )} */}
        {/* <div className="showName">
    <h6>{`${imgW} - ${imgH}`}</h6>
  </div>
  <div className="showName2">
    <h6>{`${divW} - ${divH}`}</h6>
  </div> */}
      </div>
    </div>
  );

  if (!iOS()) {
    return <FullScreen handle={handle}>{mainContent}</FullScreen>;
  }
  return mainContent;
};
