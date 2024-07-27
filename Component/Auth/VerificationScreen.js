import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const VerificationScreen = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const navigation = useNavigation();

  const handleVerifyCode = async () => {
    setLoading(true); // Set loading to true when verification starts

    try {
      // Send verification code to the server
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:RM_LD_ra/auth/verify-code',
        {
          code: verificationCode,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response, 'response verify code');

      // Navigate to the home screen or other authenticated areas
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Verification error:', error.response ? error.response.data : error.message);
      Alert.alert('Verification Failed', 'The verification code is incorrect.');
    } finally {
      setLoading(false); // Set loading to false after verification attempt
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <TextInput
        style={styles.input}
        placeholder="Verification Code"
        value={verificationCode}
        onChangeText={setVerificationCode}
        placeholderTextColor={'#000000'}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerifyCode}>
        {loading ? (
          <ActivityIndicator size="small" color="#ffffff" /> // Show loading spinner
        ) : (
          <Text style={styles.buttonText}>Verify</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 20,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    width: '100%',
    color: 'black',
  },
  button: {
    width: '80%',
    backgroundColor: '#5BABE8',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default VerificationScreen;
