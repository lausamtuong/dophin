import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
const textState = atom({
    key: 'modalState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
  });