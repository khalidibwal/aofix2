import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import HeaderFix from './HeaderFix';
import FooterMenu from './FooterMenu';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';

const DanaMaster = () => {
  return (
    <React.Fragment>
      <HeaderFix />
      <View style={styles.container}>
        
        {/* Top Section - 30% DANA Color */}
        <View style={styles.topSection}>
          {/* First Row of Icons Above the Card */}
          <View style={styles.iconRow2}>
            <TouchableOpacity style={styles.iconItem}>
              <MaterialCommunityIcons name="line-scan" size={25} color="white" />
              <Text style={styles.iconText}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconItem}>
              <Feather name="plus-square" size={25} color="white" />
              <Text style={styles.iconText}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconItem}>
              <MaterialCommunityIcons name="qrcode-scan" size={25} color="white" />
              <Text style={styles.iconText}>Send</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconItem}>
              <Ionicon name="send-outline" size={25} color="white" />
              <Text style={styles.iconText}>Request</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Section - 70% White */}
        <View style={styles.bottomSection}>
          {/* Card Container with overlap effect */}
          <View style={styles.card}>
            <View style={styles.iconRow}>
              {/* First Row of Icons Inside the Card */}
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/Danadeals.png')} style={styles.iconImage}/>
                <Text style={styles.iconImageText}>Dana Deals</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/gplay.png')} style={styles.iconImage}/>
                <Text style={styles.iconImageText}>Google play</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/lazada3.png')} style={styles.iconImage}/>
                <Text style={styles.iconImageText}>Hemat s/d Rp 60rb</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/games.png')} style={styles.iconImage}/>
                <Text style={styles.iconImageText}>Games</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              {/* Second Row of Icons Inside the Card */}
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/electricity.png')} style={styles.iconImage}/>
                <Text style={styles.iconImageText}>Electricity</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/bpjs.png')} style={styles.iconImage}/>
                <Text style={styles.iconImageText}>Bpjs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/kominfo2.png')} style={styles.iconImage}/>
                <Text style={styles.iconImageText}>Kominfo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <MaterialCommunityIcons name="dots-grid" size={30} color="#000" />
                <Text style={styles.iconImageText}>All</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Second Card */}
          <View style={styles.card2}>
            <View style={styles.row}>
              <Image source={require('../../Assets/Image/Dana/Dana.png')} style={styles.iconImage2}/>
              <Text style={styles.card2Text}>Dana share some update</Text>
              <Text style={styles.card2Time}>11:00</Text>
            </View>
            <View style={styles.row}>
              <Image source={require('../../Assets/Image/Dana/Dana.png')} style={styles.iconImage2}/>
              <Text style={styles.card2Text}>Dana share some update</Text>
              <Text style={styles.card2Time}>19:30</Text>
            </View>
            <View style={styles.row}>
              <Image source={require('../../Assets/Image/Dana/Dana.png')} style={styles.iconImage2}/>
              <Text style={styles.card2Text}>Dana share some update</Text>
              <Text style={styles.card2Time}>15:00</Text>
            </View>
          </View>
        </View>
      </View>
      <FooterMenu />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  topSection: {
    height: '20%', 
    backgroundColor: '#0095D9', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomSection: {
    height: '70%', 
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    position: 'relative',
  },
  card: {
    width: '90%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: -80, 
    marginBottom: 20,
  },
  card2: {
    width: '90%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    width: '100%',
  },
  iconRow2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    top: -40,
    width: '90%',
  },
  iconItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 12,
    marginTop: 5,
    color: '#fff',
  },
  iconImage: {
    width: 30,
    height: 30,
  },
  iconImage2: {
    width: 30,
    height: 30,
    tintColor:'#0095D9'
  },
  iconImageText: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    width: '100%',
    flexWrap: 'wrap',
    fontWeight: '400',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card2Text: {
    flex: 1,
    fontSize: 12,
    color:'black'
    // textAlign: 'center',
  },
  card2Time: {
    fontSize: 13,
    color: 'gray',
  },
});

export default DanaMaster;
