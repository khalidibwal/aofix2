import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Animated, Easing, Image } from 'react-native';
import { useRecoilValue } from 'recoil';
import Icon from 'react-native-vector-icons/FontAwesome' // Import FontAwesome for the check-circle icon
import { UserTransaction } from '../RecoilData/Transaction/CongratRecoil';

const TicketCard = () => {
  const Transaction = useRecoilValue(UserTransaction);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5, // Increase size
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Return to original size
          duration: 500,
          easing: Easing.ease,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Animated check-circle icon */}
        <Animated.View style={[styles.iconContainer, { transform: [{ scale: scaleAnim }] }]}>
          <Icon name="check-circle" size={50} color="#11C59A" />
        </Animated.View>
        <View style={styles.cutoutLeft} />
        <View style={styles.content}>
          <Text style={styles.title}>Payment Successful Invoice</Text>
          <Text style={styles.details}>Below is your admin fee summary</Text>
          <View style={styles.separator} />
          <View style={styles.feeRow}>
            <Text style={styles.adminFee}>admin fee</Text>
            <Text style={styles.adminFee}>{Transaction.currency} {formatNumber(Transaction.gross_amount)}</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.feeRow}>
            <Text style={styles.adminFee}>Service fee</Text>
            <Text style={styles.adminFee}>On Site</Text>
          </View>
          <View style={styles.feeRow}>
            <Text style={styles.adminFee}>Type of payment :</Text>
            {/* <Text style={styles.adminFee}>On Site</Text> */}
          </View>
          <View style={styles.paymentCard}>
            <Text style={styles.titleTransfer}>{Transaction.payment_type}</Text>
            <Text style={styles.titleDate}>{Transaction.transaction_time}</Text>
          </View>
        </View>
        <View style={styles.cutoutRight} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    height: '70%',
    width: Dimensions.get('window').width - 60,
    backgroundColor: '#5194DB',
    borderRadius: 40,
    elevation: 5, // For shadow on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    position: 'relative',
    paddingTop: 20, // Ensure content starts below this padding
  },
  iconContainer: {
    position: 'absolute',
    top: -40, // Adjust the vertical position
    left: '45%', // Center horizontally
    transform: [{ translateX: -50 }] // Center the icon horizontally
  },
  content: {
    flex: 1,
    justifyContent: 'flex-start', // Aligns content to the top of the card
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10, // Adds some space between the title and separator
  },
  titleTransfer: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left', // Adds some space between the title and separator
    marginHorizontal: 30,
  },
  titleDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'left',
    marginBottom: 10, // Adds some space between the title and separator
    marginHorizontal: 30,
  },
  details: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
  separator: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    borderStyle: 'dashed',
    marginVertical: 20, // Adds space around the separator
    marginTop: '40%',
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5, // Space between separator and admin fee row
  },
  adminFee: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  cutoutLeft: {
    width: 20,
    height: 40,
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    left: -5,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  cutoutRight: {
    width: 20,
    height: 40,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    position: 'absolute',
    right: -5,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  line: {
    borderBottomWidth: 1, // Thickness of the line
    borderBottomColor: '#0000001A', // Color of the line
    // marginVertical: 15, // Space above and below the line
    marginTop: 10,
  },
  paymentCard: {
    // borderWidth:1,
    borderRadius: 10,
    backgroundColor: '#FFD150',
    marginTop: 10,
    height: 60,
  },
});

export default TicketCard;
