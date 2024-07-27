import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
} from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthModal = ({ onClose, initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab); // State to manage active tab

  const closeModal = () => {
    onClose(); // Call the onClose prop to close the modal
  };

  const handleModalContentPress = (event) => {
    // Prevent modal from closing when tapping inside the modal content
    event.stopPropagation();
  };

  return (
      <TouchableWithoutFeedback onPress={closeModal}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={handleModalContentPress}>
            <View style={styles.modalContent}>
              {/* Tabs */}
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  style={[
                    styles.tabItem,
                    activeTab === 'register' && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab('register')}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === 'register' && styles.activeTabText,
                    ]}>
                    Create Account
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.tabItem,
                    activeTab === 'login' && styles.activeTab,
                  ]}
                  onPress={() => setActiveTab('login')}>
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === 'login' && styles.activeTabText,
                    ]}>
                    Login
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Content based on active tab */}
              {activeTab === 'login' && <LoginForm />}
              {activeTab === 'register' && <RegisterForm />}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end', // Align at the bottom of the screen
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    backgroundColor: 'white',
    height: '80%',
    borderTopLeftRadius: 20, // Rounded top-left corner
    borderTopRightRadius: 20, // Rounded top-right corner
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tabItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  activeTab: {
    borderBottomColor: '#5194DB',
    borderBottomWidth: 2,
  },
  activeTabText: {
    color: '#5194DB', // Change text color for active tab
  },
  tabText: {
    color: 'black',
    fontWeight: 'bold',
  },
  tabContent: {
    marginTop: 20,
  },
  closeButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#5194DB',
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default AuthModal;
