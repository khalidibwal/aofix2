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
import { DanaApps } from '../RecoilData/Dana/DanaApp';
import VerificationScreen from '../Auth/VerificationScreen';
import ProfileScreen from '../../View/Profile/Profile';
import ProfileFix from '../../View/Profile/ProfileFix';
import Bookings from '../../View/Home/Detail/Book/Bookings';
import PaymentScreen from '../../View/Transaction/Payment';
import Congrats from '../../View/Transaction/Congrats';
import PaymentOnsite from '../../View/Transaction/PaymentOnsite';
import LoadingScreen from '../Loading/Dana/DanaLoading';
import HeaderFix from '../../View/DANA/HeaderFix';
import DanaMaster from '../../View/DANA/DanaMaster';

const Stack = createNativeStackNavigator();

const MainStackNavigator = () => {
  const authToken = useRecoilValue(authTokenState);
  const Dana = useRecoilValue(DanaApps)
  useAuthEffect(); // Ensure this is called to handle auth state
  
  // Conditional rendering based on authToken
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="loads" component={LoadingScreen} options={{ headerShown: false }} />
          <Stack.Screen name="master" component={DanaMaster} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    );

  // return (
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //     {/* <Stack.Screen name="OpeningScreen" component={OpeningScreen} options={{ headerShown: false }} /> */}
  //       <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
  //       <Stack.Screen name="Detailfix" component={DetailFix} options={{ headerShown: false }} />
  //       <Stack.Screen name="Maps" component={MapFix} options={{ headerShown: false }} />
  //       <Stack.Screen name="Chats" component={ChatFix} options={{ headerShown: false }} />
  //       <Stack.Screen name="Profile" component={ProfileFix} options={{ headerShown: false }} />
  //       <Stack.Screen name="book" component={Bookings} options={{ headerShown: false }} />
  //       <Stack.Screen name="payment" component={PaymentScreen} options={{ headerShown: false }} />
  //       <Stack.Screen name="congrats" component={Congrats} options={{ headerShown: false }} />
  //       <Stack.Screen name="onsite" component={PaymentOnsite} options={{ headerShown: false }} />
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // );
}

export default MainStackNavigator;
