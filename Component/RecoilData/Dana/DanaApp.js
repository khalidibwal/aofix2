import React from 'react';
import { atom } from 'recoil';


 const DanaApp = atom({
    key: 'DanaApp',
    default: {
        gross_amount: 0,
        name: '',
        phone_number:''
    }
  });

export {
    DanaApp,
}