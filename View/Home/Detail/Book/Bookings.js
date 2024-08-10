import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Headers from '../../../../Component/Home/Headers';
import MenuScreen from '../../../../Component/Menu/MenuScreen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { showSnackbar } from '../../../../Component/Snackbar/SnackbarAlert';

const Bookings = () => {
  const navigation = useNavigation();
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');
  const [location, setLocation] = useState('');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
    setFormattedDate(formatDate(currentDate));
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(Platform.OS === 'ios');
    setTime(currentTime);
  };

  const showDatePickerModal = () => {
    setShowDatePicker(true);
  };

  const formatDate = (date) => {
    return `${new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date)} - ${new Intl.DateTimeFormat('en-US', { day: '2-digit', month: 'short', year: 'numeric' }).format(date)}`;
  };

  const showTimepicker = () => {
    setShowTimePicker(true);
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSubmit = () => {
    if (!formattedDate || !formatTime(time) || !location) {
      showSnackbar('Semua Kolom harus terisi', 4000);
    } else {
      // Handle the submission logic here
      Alert.alert('Success', 'Booking submitted successfully!');
    }
  };

  return (
    <>
      <Headers />
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.contentContainer}>
          <Text style={styles.textDesc}>Fixbuddy service</Text>
          <View style={styles.bookingContainer}>
            <Image
              source={require('../../../../Assets/Image/Detail/Icons/booking.png')}
              style={styles.bookingIcon}
            />
            <View style={styles.bookingTextContainer}>
              <Text style={styles.bookingText}>Booking</Text>
              <Text style={styles.bookingText}>Tanggal</Text>
            </View>
          </View>
          <View style={styles.cardText}>
            <Text style={styles.cardtitle}>
              Pilih tanggal dan jam sesuai pekerjaan dimulai! Scroll kebawah dan isi
            </Text>
          </View>
          <Text style={styles.inputTitle}>Tanggal mulai Bekerja</Text>
          <TouchableOpacity onPress={showDatePickerModal} style={styles.inputContainer}>
            <MaterialIcons name="date-range" size={20} color="#000000" />
            <TextInput
              style={styles.input}
              placeholder="Pilih Tanggal"
              placeholderTextColor={'#000000'}
              value={formattedDate}
              editable={false} // Prevent manual editing
            />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onChange}
            />
          )}
          <Text style={styles.inputTitle}>Jam mulai Bekerja</Text>
          <TouchableOpacity style={styles.inputContainer} onPress={showTimepicker}>
            <Ionicons name="time-outline" size={20} color="#000000" />
            <TextInput
              style={styles.input}
              placeholder="Jam mulai Bekerja"
              placeholderTextColor={'#000000'}
              value={formatTime(time)}
              editable={false}
            />
          </TouchableOpacity>
          {showTimePicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              onChange={onChangeTime}
            />
          )}
          <Text style={[styles.inputTitle, styles.lastInput]}>Lokasi</Text>
          <View style={styles.inputContainer}>
            <MaterialIcons name="location-pin" size={20} color="#000000" />
            <TextInput
              style={styles.input}
              placeholder="Lokasi"
              placeholderTextColor={'#000000'}
              value={location}
              onChangeText={setLocation}
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <MenuScreen />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  icon: {
    position: 'absolute',
    left: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 50,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  contentContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  textDesc: {
    fontWeight: 'bold',
    marginTop: 20,
    color: '#191970',
  },
  bookingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  bookingIcon: {
    width: '40%',
    height: 150,
    marginRight: 40,
    resizeMode: 'contain',
  },
  bookingTextContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  bookingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#191970',
  },
  cardText: {
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.1)',
    padding: 15,
    marginTop: 10,
    width: 300,
  },
  inputTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#191970',
    marginTop: 20,
    textAlign: 'left',
    width: '80%',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    padding: 10,
    marginTop: 10,
    width: '80%',
    paddingBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 10,
  },
  lastInput: {
    marginBottom: 0,
  },
  submitButton: {
    backgroundColor: '#191970',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom:25,
    alignItems: 'center',
    width: '80%',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Bookings;
