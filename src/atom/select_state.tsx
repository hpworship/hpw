import { atom } from 'recoil';

export const selectingState = atom<SelectingState>({
  key: 'selectingState',
  default: { typing: '', selected: '' }
});

export type SelectingState = {
  typing: String;
  selected: String;
};
