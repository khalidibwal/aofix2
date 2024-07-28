import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import pubnub from '../Config/PubNubConfig';
import Headers from '../../Component/Home/Headers';
import LoadingDetail from '../../Component/Loading/Detail/LoadingDetail';

const ChatFix = () => {
  const route = useRoute();
  const technician = route.params?.data;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Setup PubNub listeners and subscribe
    pubnub.addListener({
      message: event => {
        // Update messages state with new messages
        setMessages(prevMessages => [...prevMessages, event.message]);
      },
    });

    pubnub.subscribe({ channels: ['chat'] });

    // Simulate loading completion after setup
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 2000); 

    return () => {
      pubnub.unsubscribe({ channels: ['chat'] });
    };
  }, []);

  const sendMessage = () => {
    if (message.trim().length > 0) {
      // Publish the message to PubNub
      pubnub.publish({
        channel: 'chat',
        message: { text: message, sender: 'user' },
      });
      setMessage('');
    }
  };

  if (loading) {
    return <LoadingDetail />;
  }

  return (
    <View style={styles.container}>
      <Headers />
      <View style={styles.rowContainer}>
        <Image
          source={require('../../Assets/Image/Home/Icons/avatar.png')}
          style={styles.avatarIcon}
        />
        <View style={styles.rowItem}>
          <Text style={styles.listItem}>{technician.serviceproviders.usersign.name}</Text>
          <Text style={styles.listItem}>Tukang</Text>
        </View>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === 'user'
                ? styles.userMessage
                : styles.senderMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Wow, Let’s type something!"
            placeholderTextColor={'#000000'}
          />
          <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
            <Image source={require('../../Assets/Image/Home/Icons/Send.png')} />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Order</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancel}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
    padding: 8,
    borderRadius: 20,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    color: 'black',
  },
  sendButton: {
    backgroundColor: '#5194DB',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  messageContainer: {
    right: 10,
    padding: 10,
    borderRadius: 5,
    marginVertical: 4,
    maxWidth: '85%', // Adjust max width as needed
  },
  userMessage: {
    backgroundColor: '#5194DB', // Light blue for user messages
    alignSelf: 'flex-end', // Align to the right
  },
  senderMessage: {
    backgroundColor: '#e1ffc7', // Light green for sender messages
    alignSelf: 'flex-start', // Align to the left
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#5194DB',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center',
    maxWidth: 100,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: '#EB4132',
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 15,
    alignItems: 'center',
    maxWidth: 100,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  avatarIcon: {
    width: 30, // Adjust width as needed
    height: 30,
    right: 30,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowItem: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  },
  listItem: {
    color: 'black',
  },
});

export default ChatFix;
