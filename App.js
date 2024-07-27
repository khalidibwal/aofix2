import React from 'react';
import {Text, View} from 'react-native';
import MainStackNavigator from './Component/Navigation/MainStackNavigator';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { useAuthEffect } from './Component/RecoilData/Auth/AuthState';

const App = () => {
  return (
    <RecoilRoot>
      <MainStackNavigator />
    </RecoilRoot>
  );
};

export default App;