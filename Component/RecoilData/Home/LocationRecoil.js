import React from 'react';
import { atom } from 'recoil';


 const UserCity = atom({
    key: 'UserCity',
    default: null,
  });
  const UserNames = atom({
    key: 'UserNames',
    default: null
  })

export {
    UserCity,
    UserNames
}