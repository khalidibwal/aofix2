import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from 'react-native';
import AuthModal from '../../Component/Auth/AuthModal';

const OpeningScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('register');

  const toggleModal = (tab) => {
    setActiveTab(tab);
    setModalVisible(!isModalVisible); // Toggle modal visibility
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.cloudContainer}>
        <Image
          source={require('./../../Assets/Image/Auth/cloud.png')}
          style={Styles.cloudImage}
        />
      </View>
      <View style={Styles.logoPos}>
        <Image
          source={require('./../../Assets/Image/Auth/icon-aofix.png')}
          style={Styles.logo}
        />
        <Text style={Styles.logoText}>AO FIX</Text>
        <Text style={Styles.logoDesc}>YOUR FIX BUDDY</Text>
      </View>
      <View style={Styles.logoPos}>
        <Text style={Styles.welcomeTxt}>Welcome</Text>
        <Text style={Styles.welcomeDesc}>
          Before Enjoying Our Maintenance & Services Please Register First
        </Text>
      </View>
      <View style={Styles.buttonContainer}>
        <TouchableOpacity style={Styles.button} onPress={() => toggleModal('register')}>
          <Text style={Styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.buttonlogin} onPress={() => toggleModal('login')}>
          <Text style={Styles.buttontxtLogin}>Login</Text>
        </TouchableOpacity>
        <View>
          <Text style={Styles.tnc}>
            By logging in or registering, you have agreed to the Terms and
            Conditions and Privacy Policy.
          </Text>
        </View>
      </View>
      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={closeModal}
      >
        <AuthModal onClose={closeModal} initialTab={activeTab} />
      </Modal>
    </View>

  );
};

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', // Center horizontally
    justifyContent: 'flex-start', // Align items at the top
  },
  logoPos: {
    alignItems: 'center', // Center horizontally
    marginTop: 50,
    top: 50,
  },
  logo: {
    width: 130,
    height: 130,
  },
  logoText: {
    color: '#5194DB',
    fontSize: 17,
    marginTop: 10,
  },
  logoDesc: {
    marginTop: 5,
    fontSize: 10,
    opacity: 0.5,
    color:'black'
  },
  welcomeTxt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
  welcomeDesc: {
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
    marginHorizontal: 20,
    color:'black'
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 60, // Adjust as needed to position from the bottom
    width: '100%',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#5194DB',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 10, // Space between the buttons
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttontxtLogin: {
    color: '#396DA8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonlogin: {
    backgroundColor: '#ACD0EB',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 10,
    marginTop: 10, // Space between the buttons
    width: '80%',
    alignItems: 'center',
  },
  cloudContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
    width: '35%', // Adjust width as needed
    height: '50%', // Adjust height as needed
  },
  cloudImage: {
    width: '100%',
    height: 100, // Adjust height as needed
    resizeMode: 'cover',
  },
  tnc: {
    fontSize: 10,
    textAlign: 'center',
    top: 10,
    maxWidth: 300,
  },
});

export default OpeningScreen;
