import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import MaterialComunity from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

const FooterMenu = () => {
  return (
    <View style={styles.footerContainer}>
      {/* Home Icon and Text */}
      <TouchableOpacity style={styles.iconContainer}>
        <View style={styles.menuItem}>
          <Image
            source={require('../../Assets/Image/Dana/Dana.png')} // Home logo
            style={styles.icon}
          />
          <Text style={styles.menuText}>Home</Text>
        </View>
      </TouchableOpacity>

      {/* Activity Icon and Text */}
      <TouchableOpacity style={styles.spacedIconContainer}>
        <View style={styles.menuItem2}>
        <Ionicon name='receipt-outline' size={25} />
          <Text style={styles.menuText}>Activity</Text>
        </View>
      </TouchableOpacity>

      {/* Pay Icon - Central and larger */}
      <TouchableOpacity style={styles.payButton}>
        <MaterialComunity name='qrcode' size={30} color='white' />
        <Text style={styles.payStyle}>PAY</Text>
      </TouchableOpacity>

      {/* Wallet Icon and Text */}
      <TouchableOpacity style={styles.spacedIconContainer}>
        <View style={styles.menuItem3}>
          <Ionicon name='wallet-outline' size={25} />
          <Text style={styles.menuText}>Wallet</Text>
        </View>
      </TouchableOpacity>

      {/* Me Icon and Text */}
      <TouchableOpacity style={styles.iconContainer}>
        <View style={styles.menuItem}>
        <Ionicon name='person-circle-outline' size={25} />
          <Text style={styles.menuText}>Me</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 70,
    backgroundColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: '#d9d9d9',
    paddingHorizontal: 10,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  spacedIconContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
    marginHorizontal: 25, // Adds space around Activity and Wallet icons
  },
  menuItem: {
    alignItems: 'center',
  },
  menuItem2: {
    alignItems: 'center',
    paddingRight:25
  },
  menuItem3: {
    alignItems: 'center',
    paddingLeft:20
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: 'black',
  },
  activityIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  menuText: {
    fontSize: 10,
    color: 'black',
    marginTop: 4,
    fontWeight:'400'
  },
  payButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#0095D9', //DANA Color
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 5,
    left: '52%',
    transform: [{ translateX: -32.5 }],
  },
  payStyle: {
    color: '#fff',
    fontSize: 12,
  },
});

export default FooterMenu;
