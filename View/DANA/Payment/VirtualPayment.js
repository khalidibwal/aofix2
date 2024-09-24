import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text, Image, TouchableOpacity, Alert } from "react-native";
import Header from "./Header";
import { useRecoilValue } from "recoil";
import { DanaApp } from "../../../Component/RecoilData/Dana/DanaApp";
import { useNavigation } from "@react-navigation/native";
import MCI from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

// Helper function to format the number into Indonesian Rupiah format
const formatToRupiah = (number) => {
  return `Rp ${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}`;
};
const maskPhoneNumber = (phoneNumber) => {
    if (phoneNumber.length < 5) {
      return <Text>{phoneNumber}</Text>; // Return as is if too short
    }
  
    const visiblePart = phoneNumber.slice(-2); // Last two digits
    const maskedPart = phoneNumber.slice(9, -2); // Masking part
  
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.phoneNumber}>{phoneNumber.slice(0, 4)}</Text>
        {maskedPart.split('').map((_, index) => (
          <MCI key={index} name='dots-horizontal' size={20} color="black" style={{ marginHorizontal: 1 }} />
        ))}
        <Text style={styles.phoneNumber}>{visiblePart}</Text>
      </View>
    );
  };
  

const VirtualPayment = () => {
  const [gross, setGrossAmount] = useState(""); // Keep it as a string to handle formatting
  const allData = useRecoilValue(DanaApp);
  const navigation = useNavigation();

  const handleGrossAmountChange = (value) => {
    // Remove non-digit characters, format the remaining digits, and set the state
    const numericValue = value.replace(/\D/g, ""); 
    setGrossAmount(formatToRupiah(numericValue));
  };

  const handleContinue = () => {
    if (!gross) {
      Alert.alert("Validation Error", "Please enter a valid amount."); // Alert if gross is empty
      return;
    }
    
    // Continue to the next screen or perform the next action
    // navigation.navigate("NextScreen"); // Replace "NextScreen" with your actual screen name
  };

  return (
    <>
      <Header navigation={navigation} />
      <View style={styles.container}>
        {/* Card Section */}
        <View style={styles.card}>
          {/* Avatar, Name, and Phone Number Row */}
          <View style={styles.row}>
            <Image
              source={require('../../../Assets/Image/Dana/Dana.png')} // Placeholder for avatar
              style={styles.avatar}
            />
            <View style={styles.namePhoneContainer}>
              <Text style={styles.name}>{allData.name}</Text>
              <Text style={styles.phoneNumber}>{maskPhoneNumber(allData.phone_number)}</Text>
            </View>
          </View>

          {/* Horizontal Separator */}
          <View style={styles.separator} />

          {/* Input Section */}
          <Text style={styles.label}>Send Amount</Text>
          <TextInput
            style={styles.input}
            placeholder="Rp 0"
            keyboardType="number-pad"
            value={gross}
            onChangeText={handleGrossAmountChange} // Format input
          />

          <View style={styles.notesContainer}>
            <MCI name='message-bulleted' size={15} style={styles.icon} />
            <TextInput
              placeholder="Write a note for Lunch"
              style={styles.notes}
            />
            <Feather name='smile' size={15} style={styles.icon2} color='black'/>
          </View>

          <View style={styles.cardTransfer}>
            <Text>Last Transfer: 24 Sep 2024</Text>
          </View>
        </View>

        <View style={styles.card2}>
          {/* Avatar, Name, and Phone Number Row */}
          <View style={styles.row}>
            <View style={styles.namePhoneContainer}>
              <Text style={styles.name}>Share to Feed Activity</Text>
            </View>
          </View>

          {/* Horizontal Separator */}
          <View style={styles.separator} />
          <View style={styles.row}>
            <Image
              source={require('../../../Assets/Image/Home/Icons/avatar.png')} // Placeholder for avatar
              style={styles.avatar2}
            />
            <View style={styles.namePhoneContainer}>
              <Text style={styles.name}>You</Text>
              <Text style={styles.phoneNumber}>Send Money to Friend</Text>
            </View>
          </View>
          <View style={styles.row}>
            <Text style={styles.sensi}>We won't share sensitive information such as send amount and receiver name to protect your privacy</Text>
          </View>
        </View>
      </View>

      {/* Fixed Bottom Menu */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // For Android shadow effect,
    bottom:20
  },
  card2: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3, // For Android shadow effect
    // bottom: 120,
    top: 0,
  },
  cardTransfer: {
    backgroundColor: "#D3D3D3", // Light grey color
    padding: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    tintColor: "#0095D9",
  },
  avatar2: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
    tintColor: "grey",
  },
  namePhoneContainer: {
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  phoneNumber: {
    fontSize: 18,
    color: "black",
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: -10,
    fontWeight: "400",
  },
  input: {
    height: 90,
    fontSize: 30,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  notes: {
    height: 40,
    fontSize: 15,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
  },
  notesContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  notes: {
    flex: 1, // Allow the notes input to take remaining space
    height: 40,
    fontSize: 15,
    borderRadius: 5,
    paddingVertical: 0, // Remove vertical padding to align text properly
  },
  icon: {
    marginRight: 10, // Space between icon and input
    color: '#555', // Icon color
  },
  icon2: {
    marginRight: 90, // Space between icon and input
    color: '#555', // Icon color
  },
  sensi: {
    fontSize: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
    alignItems: "center",
  },
  continueButton: {
    backgroundColor: "#0095D9", // Color for the button
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    width:'100%'
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign:'center'
  },
});

export default VirtualPayment;
