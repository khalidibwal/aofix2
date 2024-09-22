import React from 'react';
import { atom } from 'recoil';


 const DanaApps = atom({
    key: 'DanaApps',
    default: "Dana",
  });

export {
    DanaApps
}