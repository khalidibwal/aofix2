import React, { useCallback } from 'react';
import TicketCard from '../../Component/Card/TicketCard';
import { View, BackHandler, Alert } from 'react-native';
import Headers from '../../Component/Home/Headers';
import MenuTransaction from '../../Component/Menu/MenuTransaction';
import { useRoute, useFocusEffect } from '@react-navigation/native';

const Congrats = () => {
  const route = useRoute();
  const data = route.params?.data || null;

  const handleBackPress = useCallback(() => {
    // You can customize the behavior here
    Alert.alert(
      'Hold on!',
      'You cannot go back from this screen.',
      [
        {
          text: 'OK',
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
    return true; // Return true to prevent default back button behavior
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Add event listener for hardware back button press
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      // Clean up the event listener when the screen is unfocused
      return () =>
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    }, [handleBackPress])
  );

  return (
    <>
      <Headers />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <TicketCard />
      </View>
      <MenuTransaction data={data} />
    </>
  );
};

export default Congrats;
