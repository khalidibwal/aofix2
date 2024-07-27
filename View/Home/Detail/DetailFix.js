import React from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useRecoilValue } from 'recoil';
import { UserCity } from '../../../Component/RecoilData/Home/LocationRecoil';
import { useNavigation } from '@react-navigation/native';
import Headers from '../../../Component/Home/Headers';
import MenuScreen from '../../../Component/Menu/MenuScreen';

const DetailFix = () => {
  const city = useRecoilValue(UserCity);
  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Headers />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {city ? (
          <View style={styles.headerLocation}>
            <Image
              source={require('../../../Assets/Image/Home/Icons/maps.png')}
              style={[styles.mapLogo, { tintColor: '#5194DB' }]}
            />
            <Text style={styles.locationText}>{city}</Text>
          </View>
        ) : (
          <Text style={styles.locationText}>Fetching location...</Text>
        )}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.buttonMenu} onPress={() => navigation.navigate('Maps')}>
            <Image source={require('../../../Assets/Image/Menu/Icons/detailmap.png')} style={styles.hammerIcon} />
            <Text style={styles.textDesc}>Panggil Sekarang</Text>
            <Text style={styles.subTextDesc}>Panggil Sekarang Terdekat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonMenu}>
            <Image source={require('../../../Assets/Image/Home/Icons/booking.png')} style={styles.hammerIcon} />
            <Text style={styles.textDesc}>Booking Tanggal</Text>
            <Text style={styles.subTextDesc}>Panggil Sesuai Tanggal</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <MenuScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 60, // Ensure space for the bottom menu
  },
  headerLocation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  locationText: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
    maxWidth: 200,
  },
  mapLogo: {
    width: 12,
    height: 15,
    right: 10,
  },
  inputContainer: {
    width: '80%', // Adjust the width as needed
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10, // Makes the corners rounded
    backgroundColor: '#E6E7E9', // Grey background
    paddingHorizontal: 10, // Padding inside the text input
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 100,
    width: '80%', // Adjust to fit buttons
  },
  buttonMenu: {
    flex: 1,
    backgroundColor: '#5194DB', // Blue color
    borderRadius: 5,
    marginHorizontal: 5, // Spacing between buttons
    paddingVertical: 30, // Vertical padding
    alignItems: 'center',
    justifyContent: 'center',
  },
  hammerIcon: {
    width: 60, // Adjusted size to fit better
    height: 70, // Adjusted size to fit better
    tintColor: 'white',
  },
  textDesc: {
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  subTextDesc: {
    fontSize: 10,
    color: 'black',
  },
});

export default DetailFix;
