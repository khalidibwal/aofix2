import React from 'react';
import { atom } from 'recoil';


 const HistoryApp = atom({
    key: 'HistoryApp',
    default: {
        gross_amount: 0,
        name: '',
        phone_number:'',
        date_time:'',
        trans_id:null
    }
  });

export {
    HistoryApp,
}