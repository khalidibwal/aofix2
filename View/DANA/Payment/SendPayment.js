import React, { useState } from "react";
import { StyleSheet, View, TextInput, Button, Text } from "react-native";
import Header from "./Header";
import { useSetRecoilState } from "recoil";
import { DanaApp } from "../../../Component/RecoilData/Dana/DanaApp";
import { useNavigation } from "@react-navigation/native";

const SendPayment = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const setDanatarget = useSetRecoilState(DanaApp)
  const navigation = useNavigation()
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Name:", name);
    console.log("Phone Number:", phoneNumber);
    setDanatarget({
        name: name,
        phone_number: phoneNumber
    })
    navigation.navigate('virtual')
  };

  return (
    <>
      <Header navigation={navigation}/>
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter name"
            value={name}
            onChangeText={setName}
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <Button title="Submit" onPress={handleSubmit} color="#0095D9" />
        </View>
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
    elevation: 3, // For Android shadow effect
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});

export default SendPayment;
