import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  authTokenState,
  UserLocationData,
  UserState,
} from '../../Component/RecoilData/Auth/AuthRecoil';
import {UserCity} from '../../Component/RecoilData/Home/LocationRecoil';
import {UserNames, UserEmail} from '../../Component/RecoilData/Home/LocationRecoil';
import {UserCategory} from '../../Component/RecoilData/Home/CategoryRecoil';
import Headers from '../../Component/Home/Headers';
import {useNavigation} from '@react-navigation/native';
import LoadingFix from '../../Component/Loading/Home/LoadingFix';
import MenuScreen from '../../Component/Menu/MenuScreen';

const HomeScreen = () => {
  const navigation = useNavigation();
  const authToken = useRecoilValue(authTokenState);
  const setRecoilLocation = useSetRecoilState(UserLocationData);
  const setUserCity = useSetRecoilState(UserCity);
  const setUserID = useSetRecoilState(UserState);
  const setUserName = useSetRecoilState(UserNames);
  const setUserEmail = useSetRecoilState(UserEmail)
  const setUserCategory = useSetRecoilState(UserCategory);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState({latitude: null, longitude: null});
  const [cityName, setCityName] = useState('');
  const [usersignId, setUsersignId] = useState(null);
  const [loading, setLoading] = useState(false);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else {
      return true;
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        'https://x8ki-letl-twmt.n7.xano.io/api:RM_LD_ra/auth/me',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      setData(response.data);
      setUsersignId(response.data.id);
      setUserID(response.data.id);
      setUserName(response.data.name);
      setUserEmail(response.data.email);
    } catch (err) {
      setError(err.message);
    }
  };

  const sendLocationData = async () => {
    try {
      await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:RM_LD_ra/user_location',
        {
          latitude: location.latitude,
          longitude: location.longitude,
          usersign_id: usersignId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const sendServiceProviderData = async () => {
    try {
      await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:RM_LD_ra/serviceproviders',
        {
          usersign_id: usersignId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const sendServiceLocationData = async () => {
    try {
      await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:RM_LD_ra/service_location',
        {
          latitude: location.latitude,
          longitude: location.longitude,
          usersign_id: usersignId,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchCityName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse`,
        {
          params: {
            lat: latitude,
            lon: longitude,
            format: 'json',
            addressdetails: 1,
          },
        },
      );
      const address = response.data;
      const city = address.display_name;
      setCityName(city);
      setUserCity(city);
      console.log('fetch city address', JSON.stringify(response));
    } catch (err) {
      setError('Failed to fetch city name');
    }
  };

  useEffect(() => {
    setLoading(true);
    const fetchLocationAndData = async () => {
      const hasPermission = await requestLocationPermission();
      if (hasPermission) {
        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            setLocation({latitude, longitude});
            setRecoilLocation({latitude, longitude});
            fetchCityName(latitude, longitude);
          },
          error => {
            setError(error.message);
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );

        await fetchUserData();
      } else {
        setError('Location permission denied');
      }
    };

    fetchLocationAndData();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude && usersignId) {
      setLoading(false);
      sendLocationData();
      console.log('data homescreen', data);
      if (data && data.isTechnician) {
        sendServiceLocationData();
        sendServiceProviderData();
      }
    }
  }, [location, usersignId]);

  const nextPageDetail = category => {
    console.log(category, 'category');
    navigation.navigate('Detailfix');
    setUserCategory(category);
  };

  if (loading) {
    return <LoadingFix />;
  }

  return (
    <>
      <Headers />
      <View style={styles.container}>
        {cityName ? (
          <View style={styles.headerLocation}>
            <Image
              source={require('./../../Assets/Image/Home/Icons/maps.png')}
              style={[styles.mapLogo, {tintColor: '#5194DB'}]}
            />
            <Text style={styles.locationText}>{cityName}</Text>
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
        <View style={styles.rowContainer}>
          <View style={styles.colomContainer}>
            <Text style={styles.leftText}>Our Available Services</Text>
            <Text style={styles.leftTextDesc}>
              Check our latest service list update
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.rightText}>{`See All >`}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => nextPageDetail(1)}>
            <Image
              source={require('../../Assets/Image/Home/Icons/tukang.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nextPageDetail(2)}>
            <Image
              source={require('../../Assets/Image/Home/Icons/tanaman2.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => nextPageDetail(3)}>
            <Image
              source={require('../../Assets/Image/Home/Icons/elektronik2.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => nextPageDetail(4)}>
            <Image
              source={require('../../Assets/Image/Home/Icons/listrik2.png')}
              style={styles.buttonImage}
            />
          </TouchableOpacity>
        </View>
        <MenuScreen />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center', // Center content horizontally
    justifyContent: 'flex-start',
    paddingBottom: 80,
  },
  headerLocation: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  colomContainer: {
    flexDirection: 'column',
    top: 5,
  },
  leftText: {
    textAlign: 'left',
    fontSize: 14,
    fontWeight: '800',
    right: 10,
    color: 'black',
  },
  leftTextDesc: {
    textAlign: 'left',
    fontSize: 13,
    fontWeight: '800',
    right: 10,
    color: 'rgba(128, 128, 128, 0.5)',
  },
  rightText: {
    textAlign: 'right',
    fontSize: 13,
    color: 'gray',
    left: 10,
    top: 10,
  },
  mapLogo: {
    width: 12,
    height: 15,
    right: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  locationText: {
    marginTop: 10,
    fontSize: 12,
    color: 'gray',
    maxWidth: 200,
  },
  inputContainer: {
    width: '80%', // Adjust the width as needed
    marginTop: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10, // Makes the corners rounded
    backgroundColor: '#E6E7E9', // Grey background
    paddingHorizontal: 10, // Padding inside the text input
    color: 'black',
  },
  error: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    marginTop: 10,
  },
  menuContainer: {},
  buttonImage:{
    height:140,
    width:150,
    resizeMode:'cover',
    top:10   
  },
  button: {
    width: '100%', // Adjust width to fit two buttons per row
    padding: 15,
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
