import React from 'react';
import { atom } from 'recoil';


 const UserCategory = atom({
    key: 'UserCategory',
    default: 0,
  });

export {
    UserCategory,
}