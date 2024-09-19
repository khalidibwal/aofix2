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
  const UserEmail = atom({
    key: 'UserEmail',
    default: null
  })

export {
    UserCity,
    UserNames,
    UserEmail
}