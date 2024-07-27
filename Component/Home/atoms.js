// atoms.js
import React from 'react';
import { atom } from 'recoil';

 const counterState = atom({
  key: 'counterState', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (if the atom has no value yet)
});

 const testArr = atom({
    key:'testArr',
    default:[]
})

export {
    counterState,
    testArr
}
