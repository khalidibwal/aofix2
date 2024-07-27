// authState.js (Add this effect to retrieve token on app start)
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';
import { authTokenState, UserLocationData } from './AuthRecoil';

export const useAuthEffect = () => {
  const setAuthToken = useSetRecoilState(authTokenState);
  // const setUserLocation = useSetRecoilState(UserLocationData)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          setAuthToken(token);
        }
      } catch (error) {
        console.error('Error retrieving token AuthState:', error);
      }
    };

    checkAuth();
  }, [setAuthToken]);
};
