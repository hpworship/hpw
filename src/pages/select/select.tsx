// import { useFullScreenHandle, FullScreen } from 'react-full-screen';
import { Button } from '../../component/button/button';
import { Result } from '../select_result/result';
import './select.css';
export function iOS() {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}
export const Select = () => {
  return (
    <div className={iOS() ? 'baseModeiOS' : 'baseModeAll'}>
      <div className="result">
        <Result />
      </div>
      <div className="keyboard">
        <div key={Math.random()} className="row">
          {[Button('1'), Button('2'), Button('3'), Button('TC')]}
        </div>
        <div key={Math.random()} className="row">
          {[Button('4'), Button('5'), Button('6'), Button('TVCHH')]}
        </div>
        <div key={Math.random()} className="row">
          {[Button('7'), Button('8'), Button('9'), Button('X')]}
        </div>
        <div key={Math.random()} className="row">
          {[Button('_'), Button('0'), Button('NEW'), Button('GO')]}
        </div>
      </div>
    </div>
  );
};
