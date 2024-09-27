import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRecoilValue } from 'recoil';
import { HistoryApp } from '../../../../Component/RecoilData/Dana/HistoryApp';
import Header from './Header';
import { useNavigation } from '@react-navigation/native';
import FontA from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'

const Transaction = () => {
  const allData = useRecoilValue(HistoryApp);
  const navigation = useNavigation();

  // Function to format the current date and time
  const formatDateTime = () => {
    const now = new Date();
    const options = { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    return now.toLocaleString('en-GB', options).replace(',', ' -');
  };

  // Function to format the gross amount into IDR
  const formatIDR = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <Header navigation={navigation} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.card}>
          <View style={styles.logoContainer}>
            <Image source={require('../../../../Assets/Image/Dana/Danafull.png')} style={styles.logo} />
          </View>
          <View style={styles.row}>
            <Text>{allData.date_time}</Text>
            <Text>DANA ID</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.rowNoSpace}>
            <FontA name='check-circle' color='green' size={15} />
            <Text style={styles.successText}>Transaction Success !</Text>
          </View>
          <View style={styles.rowNoSpace}>
            <Text style={styles.sendMoneytxt}>
              Send Money {formatIDR(allData.gross_amount)} to {allData.name} - {allData.phone_number}
            </Text>
          </View>
          <View style={styles.sendBorder}>
            <Text style={styles.sendText}>Send Money</Text>
          </View>
          <View style={styles.TotalBorder}>
            <Text style={styles.Totalpay}>Total Payment</Text>
            <Text style={styles.TotalAmount}>{formatIDR(allData.gross_amount)}</Text>
          </View>
          <View style={styles.row}>
            <Text>Payment Method</Text>
            <Text>DANA Balance</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.row}>
            <Text style={styles.Totalpay}>Receiver Detail</Text>
          </View>
          <View style={styles.row}>
            <Text>Name</Text>
            <Text style={styles.Totalpay}>{allData.name}</Text>
          </View>
          <View style={styles.row}>
            <Text>DANA Account</Text>
            <Text style={styles.Totalpay}>{allData.phone_number}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.Totalpay}>Transaction Detail</Text>
          </View>
          <View style={styles.row}>
            <Text>Transaction ID</Text>
            <View style={styles.copyIcon}>
            <Feather name='copy'/>
            </View>
            <Text style={styles.Totalpay}>{allData.trans_id}</Text>
          </View>
          <View style={styles.row}>
            <Text>Merchant ID</Text>   
            <Text style={styles.Totalpay}>2024{allData.phone_number}</Text>
          </View>
          <View style={styles.row}>
            {/* <Text>Merchant ID</Text>   
            <Text style={styles.Totalpay}>2024{allData.phone_number}</Text> */}
          </View>
          <View style={styles.separator} />
          <View style={styles.frow2}>
            <Text style={styles.PPN}>*PPN Included</Text>  
          </View>
          <View style={styles.row2}>
            <Text style={styles.PPN}>PT.Espay Debit Indonesia Koe</Text>  
          </View>
          <View style={styles.row2}>
            <Text style={styles.PPN}>NPWP: 073.210.332.0-617.000</Text>  
          </View>
          <View style={styles.row2}>
            <Text style={styles.PPN}>Capital Place Lt: 18, Jl. Jend Gatot Subroto kav. 18</Text>  
          </View>
          <View style={styles.row2}>
            <Text style={styles.PPN}>Kuningan Barat, Mampang Prapatan</Text>  
          </View>
          <View style={styles.row2}>
            <Text style={styles.PPN}>Jakarta selatan DKI Jakarta - 12710</Text>  
          </View>
          <View style={styles.tearsContainer}>
            <View style={styles.tear} />
            <View style={styles.tear} />
            <View style={styles.tear} />
            <View style={styles.tear} />
            <View style={styles.tear} />
            <View style={styles.tear} />
            <View style={styles.tear} />
            <View style={styles.tear} />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    marginVertical: 5,
    width: '90%',
    alignSelf: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    tintColor: '#0095D9',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
  },
  frow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: 10,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    // paddingVertical: 10,
  },
  rowNoSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  sendBorder: {
    borderWidth: 1,
    borderColor: 'rgba(204, 204, 204, 1)',
    backgroundColor: 'rgba(220, 220, 220, 0.5)',
    padding: 5,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginVertical: 5,
  },
  TotalBorder: {
    borderWidth: 1,
    borderColor: 'rgba(204, 204, 204, 1)',
    backgroundColor: '#E0F7FA',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  sendText: {
    fontSize: 14,
    color: '#333',
  },
  successText: {
    marginLeft: 5,
    fontSize: 12,
    color: '#333',
  },
  sendMoneytxt: {
    marginLeft: 5,
    fontSize: 13,
    color: '#333',
    fontWeight: 'bold',
  },
  Totalpay: {
    marginLeft: 5,
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  TotalAmount: {
    fontSize: 15,
    color: '#333',
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  tearsContainer: {
    position: 'absolute',
    bottom: -5,
    left: 10,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tear: {
    width: 30,
    height: 15,
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 30,
    borderBottomWidth: 3,
    borderBottomColor: '#fff',
    position: 'relative',
  },
  copyIcon:{
    right:10
  },
  PPN:{
    fontSize:13,
    color:'#E0E0E0'
  }
});

export default Transaction;
