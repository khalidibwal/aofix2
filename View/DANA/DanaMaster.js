import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import HeaderFix from './HeaderFix';
import FooterMenu from './FooterMenu';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

const { width: viewportWidth } = Dimensions.get('window');

// Sample carousel items
const carouselItems = [
  {
    title: "Promo 1",
    image: require('../../Assets/Image/Dana/danapromo.png'),
  },
  {
    title: "Promo 2",
    image: require('../../Assets/Image/Dana/danapromo2.png'),
  },
  {
    title: "Promo 3",
    image: require('../../Assets/Image/Dana/danapromo3.png'),
  },
];

const DanaMaster = () => {
  const navigation = useNavigation()
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollViewRef = useRef(null); // Reference to the ScrollView

  useEffect(() => {
    // Auto scroll every second
    const intervalId = setInterval(() => {
      setActiveIndex(prevIndex => {
        const nextIndex = (prevIndex + 1) % carouselItems.length; // Calculate the next index
        scrollViewRef.current?.scrollTo({ x: nextIndex * viewportWidth, animated: true }); // Scroll to the next index
        return nextIndex;
      });
    }, 3000); // Every second (1000 ms)

    // Clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / viewportWidth);
    setActiveIndex(index);
  };

  const SendPay = () =>{
    navigation.navigate('sendpay')
  }

  return (
    <React.Fragment>
      <HeaderFix />
      <View style={styles.container}>       
        {/* Top Section - 30% DANA Color */}
        <View style={styles.topSection}>
          <View style={styles.iconRow2}>
            <TouchableOpacity style={styles.iconItem}>
              <MaterialCommunityIcons name="line-scan" size={25} color="white" />
              <Text style={styles.iconText}>Scan</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconItem}>
              <Feather name="plus-square" size={25} color="white" />
              <Text style={styles.iconText}>Top Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconItem} onPress={SendPay}>
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
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/Danadeals.png')} style={styles.iconImage} />
                <Text style={styles.iconImageText}>Dana Deals</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/gplay.png')} style={styles.iconImage} />
                <Text style={styles.iconImageText}>Google Play</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/lazada3.png')} style={styles.iconImage} />
                <Text style={styles.iconImageLazada}>Hemat s/d Rp 60rb</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/games.png')} style={styles.iconImage} />
                <Text style={styles.iconImageText}>Games</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.iconRow}>
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/electricity.png')} style={styles.iconImage} />
                <Text style={styles.iconImageText}>Electricity</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/bpjs.png')} style={styles.iconImage} />
                <Text style={styles.iconImageText}>Bpjs</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <Image source={require('../../Assets/Image/Dana/kominfo2.png')} style={styles.iconImage} />
                <Text style={styles.iconImageText}>Kominfo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconItem}>
                <MaterialCommunityIcons name="dots-grid" size={30} color="#000" />
                <Text style={styles.iconImageText}>All</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Custom Carousel */}
          

          {/* Second Card */}
          <View style={styles.card2}>
            <View style={styles.row}>
              <Image source={require('../../Assets/Image/Dana/Dana.png')} style={styles.iconImage2} />
              <Text style={styles.card2Text}>Dana share some update</Text>
              <Text style={styles.card2Time}>11:00</Text>
            </View>
            <View style={styles.row}>
              <Image source={require('../../Assets/Image/Dana/Dana.png')} style={styles.iconImage2} />
              <Text style={styles.card2Text}>Dana share some update</Text>
              <Text style={styles.card2Time}>19:30</Text>
            </View>
            <View style={styles.row}>
              <Image source={require('../../Assets/Image/Dana/Dana.png')} style={styles.iconImage2} />
              <Text style={styles.card2Text}>Dana share some update</Text>
              <Text style={styles.card2Time}>15:00</Text>
            </View>
          </View>
          <ScrollView
            ref={scrollViewRef} // Set the ref here
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.carouselContainer}
          >
            {carouselItems.map((item, index) => (
              <View key={index} style={styles.carouselCard}>
                <Image source={item.image} style={styles.carouselImage} />
              </View>
            ))}
          </ScrollView>

          {/* Dots for carousel navigation */}
          <View style={styles.dotsContainer}>
            {carouselItems.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  { backgroundColor: index === activeIndex ? '#0095D9' : '#ccc' },
                ]}
              />
            ))}
          </View>
          <View style={styles.cardNew}>
            {/* First row with icon and "Learn More" button */}
            <View style={styles.row}>
              {/* <Ionicon name="help-circle-outline" size={30} color="#0095D9" /> */}
              <Image source={require('../../Assets/Image/Dana/danapro.png')} style={styles.proImage}/>
              <TouchableOpacity style={styles.learnMoreButton}>
                <Text style={styles.learnMoreText}>Learn More</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.separator}/>
            {/* Second row with input field */}
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="DANA CS Offering help?"
                placeholderTextColor="gray"
              />
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
  proImage:{
    width: 120,
    height: 30,
  },
  iconImage2: {
    width: 30,
    height: 30,
    tintColor:'#0095D9',
  },
  iconImageText: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    width: '100%',
    flexWrap: 'wrap',
    fontWeight: '400',
  },
  iconImageLazada: {
    fontSize: 13,
    color: 'black',
    textAlign: 'center',
    width: '100%',
    flexWrap: 'wrap',
    fontWeight: '400',
    top:10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  card2Text: {
    flex: 1,
    fontSize: 12,
    color: 'black',
  },
  card2Time: {
    fontSize: 13,
    color: 'gray',
  },
  carouselContainer: {
    width: '100%',
    marginVertical: 0,
    bottom:10
  },
  carouselCard: {
    width: viewportWidth,
    justifyContent: 'center',
    alignItems: 'center',
    // height:90
  },
  carouselImage: {
    width: viewportWidth * 0.90,
    height: 120,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  carouselText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    bottom:60
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  cardNew: {
    width: '90%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 40,
  },
  learnMoreText: {
    color: '#0095D9',
    fontSize: 14,
    // fontWeight: 'bold',
  },
  learnMoreButton: {
    backgroundColor: 'white',    // White background inside the button
    padding: 5,
    borderRadius: 5,
    borderWidth: 2,              // Border width
    borderColor: '#0095D9',      // Blue border color
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  
});

export default DanaMaster;
