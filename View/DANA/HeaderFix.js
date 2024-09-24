import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, LayoutAnimation, Platform, UIManager } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';


// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const HeaderFix = () => {
  const [showAmount, setShowAmount] = useState(true); // State to toggle amount visibility
  const [myMoney, setMoney] = useState(15200000)

  const toggleShowAmount = () => {
    // Animate the layout transition when toggling
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowAmount(!showAmount); // Toggle visibility
  };
  const formatToRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      currency: 'IDR',
      minimumFractionDigits: 0, // Omit decimals, but you can adjust this as needed
    }).format(number);
  };

  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../../Assets/Image/Dana/Dana.png')} // Dana logo
        style={styles.logo}
      />
      <Text style={styles.RpText}>Rp</Text>
      <Text style={styles.amountText}>
        {showAmount ? formatToRupiah(myMoney) : <MCI name='dots-horizontal' size={30} color='white'/>}
      </Text>
      <TouchableOpacity onPress={toggleShowAmount} style={styles.iconContainer}>
        <MaterialIcons
          name={showAmount ? 'visibility-off' : 'visibility'}
          size={15}
          color="#fff"
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row', // Arrange logo and text in a row
    justifyContent: 'flex-start', // Align items to the left
    alignItems: 'center', // Center vertically
    backgroundColor: '#0095D9', // Blue Dana background color
    paddingHorizontal: 5, // Padding on the sides for space
    paddingVertical: 10, // Padding on top and bottom
    height: 60, // Set a fixed height for the header
  },
  logo: {
    width: 50, // Adjust logo size
    height: 30,
    resizeMode: 'contain', // Ensure the logo maintains aspect ratio
    marginRight: 5, // Add a small margin to the right of the logo
  },
  amountText: {
    fontSize: 18, // Font size for the amount
    fontWeight: 'bold', // Bold text for emphasis
    color: '#fff', // White text color to contrast with blue background
  },
  RpText: {
    fontSize: 10, // Font size for the Rp text
    fontWeight: 'bold', // Bold text for emphasis
    color: '#F0F0F0',
    paddingRight: 3,
    right: 5,
  },
  iconContainer: {
    marginLeft: 5, // Add space between the amount and the eye icon
  },
});

export default HeaderFix;
