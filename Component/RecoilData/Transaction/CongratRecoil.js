import React from 'react';
import { atom } from 'recoil';


 const UserTransaction = atom({
    key: 'UserTransaction',
    default: {
        gross_amount: 0,
        currency: '',
        order_id: '',
        payment_type: '',
        transaction_status:'',
        transaction_time:''
    }
  });

export {
    UserTransaction,
}