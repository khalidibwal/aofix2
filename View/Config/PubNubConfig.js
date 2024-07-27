// PubNubConfig.js
import PubNub from 'pubnub';

const pubnub = new PubNub({
  publishKey: 'pub-c-f5c16a26-d07f-4201-a14d-f8f7b2aeadf5',
  subscribeKey: 'sub-c-47d4d09b-7557-4f99-8db5-7561583ed2c5',
  uuid: 'fixed-uuid-for-testing',
});

export default pubnub;
