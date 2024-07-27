import React from 'react';
import { atom } from 'recoil';

const UserState = atom({
    key:'UserState',
    default: null
})

 const authTokenState = atom({
    key: 'authTokenState',
    default: null,
  });
  
  const UserLocationData = atom({
    key: 'UserLocationData',
    default: {
      latitude: null,
      longitude: null,
    },
  })

export {
    UserState,
    authTokenState,
    UserLocationData
}