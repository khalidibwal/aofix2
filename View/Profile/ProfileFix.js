import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Eye from 'react-native-vector-icons/Feather';
import EyeOff from 'react-native-vector-icons/Feather';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { UserNames } from '../../Component/RecoilData/Home/LocationRecoil';
import { UserCategory } from '../../Component/RecoilData/Home/CategoryRecoil';
import Headers from '../../Component/Home/Headers';
import { useNavigation } from '@react-navigation/native';
import MenuScreen from '../../Component/Menu/MenuScreen';

const { height } = Dimensions.get('window');

const ProfileFix = () => {
  const navigation = useNavigation();
  const getUserName = useRecoilValue(UserNames);
  const setUserCategory = useSetRecoilState(UserCategory);
  const [balances, setBalances] = useState(0);
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceVisible(!isBalanceVisible);
  };

  const nextPageDetail = (category) => {
    console.log(category, 'category');
    navigation.navigate('Detailfix');
    setUserCategory(category);
  };

  // Extract the first word of the userName
  const firstName = getUserName.split(' ')[0];

  return (
    <>
      <Headers />
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.rowContainer}>
            <Text style={styles.cardUserName}>Hi, {firstName}</Text>
            <Text style={styles.cardWelcome}>Welcome back</Text>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={styles.BalanceText}>Balance</Text>
            <View style={styles.BalanceRow}>
              <Text style={styles.IDRText}>
                {isBalanceVisible ? `IDR ${balances}` : 'IDR ***'}
              </Text>
              <TouchableOpacity onPress={toggleBalanceVisibility}>
                {isBalanceVisible ? (
                  <EyeOff name="eye-off" size={15} color="#000000" />
                ) : (
                  <Eye name="eye" size={15} color="#000000" />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.whiteCard}>
            <View style={styles.imagesRow}>
              {/* Image 1 */}
              <View style={styles.imageContainer}>
              <TouchableOpacity>
                <View style={styles.imageBox}>
                  <Image
                    source={require('../../Assets/Image/Profile/topup.png')} // Replace with your image URL
                    style={styles.image}
                  />
                </View>
                </TouchableOpacity>
                <Text style={styles.imageText}>Top up</Text>
              </View>
              {/* Image 2 */}
              <View style={styles.imageContainer}>
              <TouchableOpacity>
                <View style={styles.imageBox}>
                  <Image
                    source={require('../../Assets/Image/Profile/transfer.png')} // Replace with your image URL
                    style={styles.image}
                  />
                </View>
                </TouchableOpacity>
                <Text style={styles.imageText}>Transfer</Text>
              </View>
              {/* Image 3 */}
              <View style={styles.imageContainer}>
                <TouchableOpacity>
                <View style={styles.imageBox}>
                  <Image
                    source={require('../../Assets/Image/Profile/withdraw.png')} // Replace with your image URL
                    style={styles.image}
                  />
                </View>
                </TouchableOpacity>
                <Text style={styles.imageText}>Withdraw</Text>
              </View>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.historyText}>Transaction History</Text>
            <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.transactionCard}>
              <Text style={styles.cardUserName}>No Transaction History</Text>
          </View>
        </View>
        <View style={styles.avatarContainer}>
          <Image
            source={require('../../Assets/Image/Home/Icons/avatar.png')} // Replace with your image URL
            style={styles.avatar}
          />
        </View>
      </View>
      <MenuScreen />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  card: {
    height: '100%',
    backgroundColor: '#DCEAF8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  cardUserName: {
    textAlign: 'center',
    color: '#162550',
    fontSize: 16,
  },
  cardWelcome: {
    textAlign: 'center',
    color: 'black',
    fontSize: 14,
  },
  rowContainer: {
    flexDirection: 'column',
    top: 10,
  },
  BalanceText: {
    textAlign: 'center',
    color: '#162550',
    fontSize: 16,
  },
  BalanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  IDRText: {
    color: '#162550',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 15,
  },
  balanceContainer: {
    flexDirection: 'column',
    top: 10,
    marginTop: 30,
    textAlign: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'absolute',
    top: -20,
    right: 20,
    borderRadius: 50,
    padding: 5,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  whiteCard: {
    marginTop:20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor:'#fff',
    backgroundColor: 'white',
    width: 'auto',
    height: 'auto',
    justifyContent: 'center',
    alignSelf: 'center',
    padding:15
  },
  transactionCard:{
    marginTop:20,
    borderWidth: 1,
    borderRadius: 10,
    borderColor:'#fff',
    backgroundColor: 'white',
    width: '90%',
    height: 200,
    justifyContent: 'center',
    alignSelf: 'center',
    padding:15
  },
  imagesRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center', // Centers image and text
    marginHorizontal:15
  },
  imageBox: {
    borderWidth: 1,
    borderColor: 'grey',
    backgroundColor:'#F0F0F0',
    borderRadius: 10,
    padding: 5,
  },
  image: {
    width: 20,
    height: 20,
    borderRadius: 5,
    resizeMode:'contain'
  },
  imageText: {
    textAlign: 'center',
    marginTop: 5,
    fontSize: 12,
    color: '#333',
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    marginTop: 20,
  },
  historyText: {
    // textDecorationLine: 'underline',
    fontSize: 16,
    color: '#333',
    fontWeight:'bold'
  },
  seeAllText: {
    textDecorationLine: 'underline',
    fontSize: 14,
    color: '#333',
  },
});

export default ProfileFix;
