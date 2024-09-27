import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ION from 'react-native-vector-icons/Ionicons';

const Header = ({ navigation }) => {
    const backToHome = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.headerContainer}>
            <View style={styles.topRow}>
                <TouchableOpacity style={styles.backIconContainer} onPress={backToHome}>
                    <ION name='chevron-back' size={20} color='white' />
                </TouchableOpacity>
                <Text style={styles.friend}>Transaction</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#0095D9',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    topRow: {
        flexDirection: 'row', // Keep the back button and text in a row
        alignItems: 'center',
        marginBottom:10
    },
    backIconContainer: {
        marginRight: 10, // Space between back button and text
    },
    friend: {
        fontSize:18,
        color: 'white',
        fontWeight: '500',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        paddingHorizontal: 10,
        backgroundColor: 'white',
    },
});

export default Header;
