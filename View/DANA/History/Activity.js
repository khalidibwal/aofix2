import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Text, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSetRecoilState } from 'recoil';
// import { HistoryApp } from './atoms'; // Adjust the path as necessary
import { HistoryApp } from "../../../Component/RecoilData/Dana/HistoryApp";
import Header from "./Header";

const Activity = () => {
    const navigation = useNavigation();
    const setHistory = useSetRecoilState(HistoryApp);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:Tj15l4jN/dana_history");
                const result = await response.json();
                
                // Sort data in descending order based on created_at
                const sortedData = result.sort((a, b) => b.created_at - a.created_at);
                setData(sortedData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (timestamp) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(timestamp).toLocaleString('en-GB', options).replace(',', ''); // Remove the comma
    };

    const handleItemPress = (item) => {
        // Set the Recoil state with the clicked item's data
        setHistory({
            gross_amount: item.money,
            name: item.name,
            phone_number: item.phone,
            date_time: formatDate(item.created_at),
            trans_id: item.trans_id,
        });
        
        // Navigate to the details page
        navigation.navigate('history'); // Adjust the name of the page as necessary
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item)} style={styles.itemContainer}>
            <View style={styles.row}>
                <View style={styles.cardIcon}>
                    <Image source={require('../../../Assets/Image/Dana/usersend.png')} style={styles.icon} />
                </View>
                <View style={styles.middleContainer}>
                    <Text style={styles.sendMoney}>Send Money</Text>
                    <Text style={styles.date}>{formatDate(item.created_at)}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Text style={styles.money}>-{new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.money)}</Text>
                    <Image source={require('../../../Assets/Image/Dana/danablue.png')} style={styles.moneyIcon} />
                </View>
            </View>
            <View style={styles.separator} />
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            {loading ? (
                <ActivityIndicator size="large" color="#0095D9" />
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 15,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: 30,
        height: 30,
        paddingRight: 10,
    },
    middleContainer: {
        flex: 1,
        left: 10,
    },
    sendMoney: {
        fontSize: 16,
        paddingBottom: 10,
        color: 'black',
    },
    date: {
        fontSize: 14,
        color: '#666',
    },
    rightContainer: {
        alignItems: 'flex-end',
    },
    money: {
        fontSize: 15,
        color: 'black',
    },
    moneyIcon: {
        width: 20,
        height: 20,
        marginTop: 5,
    },
    separator: {
        height: 1,
        backgroundColor: '#ccc',
        marginVertical: 10,
    },
    cardIcon: {
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: '#D3D3D3',
    },
});

export default Activity;
