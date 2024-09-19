import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { UserTransaction } from '../../Component/RecoilData/Transaction/CongratRecoil';
import { UserEmail, UserNames } from '../../Component/RecoilData/Home/LocationRecoil';
import { useNavigation } from '@react-navigation/native';
import LoadingDetail from '../../Component/Loading/Detail/LoadingDetail';

const PaymentScreen = () => {
  const price = 10000;
  const Email = useRecoilValue(UserEmail);
  const Names = useRecoilValue(UserNames);
  const SetTransaction = useSetRecoilState(UserTransaction)

  const [loading, setLoading] = useState(true);
  const [paymentModalVisible, setPaymentModalVisible] = useState(true);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [orderId, setOrderId] = useState('');
  const [error, setError] = useState(null);

  const navigation = useNavigation(); // Hook to access navigation

  const generateOrderId = () => {
    const timestamp = new Date().getTime(); // Current timestamp
    const randomNum = Math.floor(Math.random() * 1000); // Random number for extra uniqueness
    return `INV-${timestamp}-${randomNum}`;
  };

  const fetchPaymentUrl = async () => {
    const generatedOrderId = generateOrderId();
    setOrderId(generatedOrderId);
    try {
      const response = await axios.post(
        'https://x8ki-letl-twmt.n7.xano.io/api:RM_LD_ra/midtransaction',
        {
          amount: price,
          orderId: generatedOrderId,
          customerDetails: {
            name: Names,
            email: Email,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      const result = response.data.response;
      const Respond = result.result;

      console.log('Respond:', Respond);

      if (Respond.redirect_url) {
        console.log('Payment URL:', Respond.redirect_url);
        setPaymentUrl(Respond.redirect_url); // Set payment URL from the response
      } else {
        console.error('Payment URL not found in the response.');
        setError('Payment URL not available.');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setError('Payment initiation failed.');
    } finally {
      setLoading(false); // Hide loading indicator
    }
  };

  const fetchTransactionStatus = async (orderId) => {
    try {
      console.log('Checking transaction status for Order ID:', orderId);
      
      const response = await axios.get(`https://api.sandbox.midtrans.com/v2/${orderId}/status`, {
        headers: {
          'Authorization': 'Basic U0ItTWlkLXNlcnZlci0wUVNxVWhuY1kxMWtNVFZxY2t5N3FhLXE=',
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Transaction status response:', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching transaction status:', error.response ? error.response.data : error.message);
      return null;
    }
  };
  

  const handleNavigationChange = async (navState) => {
    const { url } = navState;
    console.log('Navigating to:', url); // Log the URL for debugging
  
    // Check if the URL includes the pattern you expect
    if (url.includes('/verifyPaymentPin') && url.includes('id=')) {
      // Extract transaction ID or other relevant details from the URL if needed
      const urlParams = new URLSearchParams(new URL(url).search);
      const transactionId = urlParams.get('id');
  
      if (transactionId) {
        console.log('Transaction ID:', transactionId);
        // Fetch transaction status using the extracted transaction ID
        const status = await fetchTransactionStatus(orderId);
        console.log('Transaction Status:', status);
  
        if (status && status.transaction_status === 'settlement' || status.transaction_status === 'pending') {
          SetTransaction({
            gross_amount: status.gross_amount,
            currency: status.currency,
            order_id: status.order_id,
            payment_type: status.payment_type,
            transaction_status: status.transaction_status,
            transaction_time: status.transaction_time
          })
          console.log('Transaction settled, navigating to HomeScreen');
          navigation.navigate('congrats'); // Navigate to HomeScreen
          setPaymentModalVisible(false); // Close the modal
        } else {
          console.error('Transaction not settled.', status);
        }
      } else {
        console.error('Transaction ID not found in URL.');
      }
    }
  };
  

  useEffect(() => {
    fetchPaymentUrl(); // Fetch payment URL on component mount
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <LoadingDetail/>
        </View>
      ) : (
        <Modal
          visible={paymentModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setPaymentModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            {paymentUrl ? (
              <WebView
                source={{ uri: paymentUrl }}
                style={{ flex: 1 }}
                onNavigationStateChange={handleNavigationChange}
                onError={(error) => console.error('WebView Error:', error)}
                onLoad={(syntheticEvent) => {
                  const { nativeEvent } = syntheticEvent;
                  console.log('WebView Load:', nativeEvent);
                }}
              />
            ) : (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error || 'Payment URL not available.'}</Text>
              </View>
            )}
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
    padding: 20,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default PaymentScreen;
