import * as React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OpeningScreen from '../../View/Auth/OpeningScreen';
import HomeScreen from '../../View/Home/HomeScreen';
import DetailFix from '../../View/Home/Detail/DetailFix';
import ChatFix from '../../View/Chat/ChatFix';
import MapFix from '../../View/Maps/MapFix';
import { useAuthEffect } from '../RecoilData/Auth/AuthState';
import { useRecoilValue } from 'recoil';
import { authTokenState } from '../RecoilData/Auth/AuthRecoil';
import VerificationScreen from '../Auth/VerificationScreen';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const authToken = useRecoilValue(authTokenState);
  useAuthEffect(); // Ensure this is called to handle auth state
  
  // Conditional rendering based on authToken
  if (authToken === null) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="OpeningScreen" component={OpeningScreen} options={{ headerShown: false }} />
          <Stack.Screen name="verify" component={VerificationScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Detailfix" component={DetailFix} options={{ headerShown: false }} />
        <Stack.Screen name="Maps" component={MapFix} options={{ headerShown: false }} />
        <Stack.Screen name="Chats" component={ChatFix} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainStackNavigator;
