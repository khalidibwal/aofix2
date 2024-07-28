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



const LoginForm = () => {
    const navigation = useNavigation();
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [authToken, setAuthToken] = useRecoilState(authTokenState);
  const [loading, setLoading] = useState(false); // Loading state

  const handleLogin = async () => {
    const emailLowerCase = loginEmail.toLowerCase();
    const passwordLowerCase = loginPassword.toLowerCase();
    setLoading(true); // Set loading to true when login starts
    try {
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:RM_LD_ra/auth/login',
        {
          email: emailLowerCase,
          password: passwordLowerCase,
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
      showSnackbar('Login failed. Please check your details and try again', 4000)
      // console.error('Login error:', error.response ? error.response.data : error.message);
      // Handle login error (e.g., show error message)
    }finally {
      setLoading(false); // Set loading to false after login attempt
    }
  };
  
  return (
    <View style={styles.tabContent}>
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
      <View>
        <TouchableOpacity>
          <Text style={styles.forgotTxt}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
      {loading ? (
          <ActivityIndicator size="small" color="#ffffff" /> // Show loading spinner
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonGoogle}>
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
    marginTop: 50,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  buttonGoogle: {
    width: '80%',
    backgroundColor: '#F4F4F4',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
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
  spacingImage: {
    flexDirection: 'row',
  },
});

export default LoginForm;
