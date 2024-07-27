import React from 'react';
import { atom } from 'recoil';


 const UserCity = atom({
    key: 'UserCity',
    default: null,
  });

export {
    UserCity
}