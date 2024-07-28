import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator
} from 'react-native';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { authTokenState } from '../RecoilData/Auth/AuthRecoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { showSnackbar } from '../Snackbar/SnackbarAlert';

const RegisterForm = () => {
  const [regisName, setRegisName] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const [loading, setLoading] = useState(false); // Loading state
  const navigation = useNavigation()

  const handleRegis = async() => {
    // const nameLowerCase = regisName.toLowerCase()
    const emailLowerCase = loginEmail.toLowerCase()
    const passwordLowerCase = loginPassword.toLowerCase()
    setLoading(true);
    try {
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:RM_LD_ra/auth/signup',
        {
          name: regisName,
          username: null,
          password:passwordLowerCase,
          email: emailLowerCase,
          isTechnician: true //must change to false if not technician only for temporary
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      console.log(response, 'response login');
      
      // Extract the token from the response
      const token = response.data.authToken; // Ensure the path to the token matches the response structure
  
      // Store the token in AsyncStorage and update Recoil state
      await AsyncStorage.setItem('userToken', token);
      setAuthToken(token);
  
      // Navigate to the next screen upon successful login
      navigation.navigate('HomeScreen');
    } catch (error) {
      // console.error('Login error:', error.response ? error.response.data : error.message);
      showSnackbar('Registration failed. Please check your details and try again',4000)
      // Handle login error (e.g., show error message)
    } finally{
      setLoading(false);
    }
  };
  return (
    <View style={styles.tabContent}>
      <Text style={styles.title}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={regisName}
        onChangeText={setRegisName}
        placeholderTextColor={'#000000'}
      />
      <Text style={styles.title}>Email Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Eg namaemail@emailkamu.com"
        value={loginEmail}
        onChangeText={setLoginEmail}
        placeholderTextColor={'#000000'}
      />
      <Text style={styles.title}>Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={loginPassword}
        onChangeText={setLoginPassword}
        placeholderTextColor={'#000000'}
      />
      <TouchableOpacity style={styles.button} onPress={handleRegis}>
      {loading ? (
          <ActivityIndicator size="small" color="#ffffff" /> // Show loading spinner
        ) : (
          <Text style={styles.buttonText}>Registration</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGoogle} onPress={handleRegis}>
        <View style={styles.spacingImage}>
          <Image
            source={require('../../Assets/Image/Home/Icons/google-icon.png')}
            style={styles.googleIcon}
          />
          <Text style={styles.buttonGoogleText}>Sign up with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabItem: {
    paddingBottom: 10,
  },
  tabText: {
    color: '#5194DB',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Underline text
  },
  tabContent: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    color:'black'
  },
  button: {
    width: '80%',
    backgroundColor: '#5BABE8',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonGoogle: {
    width: '80%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGoogleText: {
    color: 'black',
    fontSize: 14,
    marginLeft: 15, // Space between icon and text
  },
  googleIcon: {
    width: 20, // Adjust width of the icon
    height: 20, // Adjust height of the icon
  },
  title: {
    fontWeight: 'bold',
    left: 5,
    bottom: 5,
    color:'black'
  },
  forgotTxt: {
    textAlign: 'center',
    color: '#5BABE8',
  },
  spacingImage: {
    flexDirection: 'row',
  },
});

export default RegisterForm;
