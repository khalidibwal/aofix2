
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_DEFAULT, UrlTile, Marker} from 'react-native-maps';
import {UserLocationData} from '../../Component/RecoilData/Auth/AuthRecoil';
import {useRecoilValue} from 'recoil';
import {useNavigation} from '@react-navigation/native';
import Headers from '../../Component/Home/Headers';
import LoadingFix from '../../Component/Loading/Home/LoadingFix';
import axios from 'axios';

const MapScreen = () => {
  const navigation = useNavigation();
  const Location = useRecoilValue(UserLocationData);
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.01, // Adjust as needed for zoom level
    longitudeDelta: 0.01, // Adjust as needed for zoom level
  });
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (Location?.latitude && Location?.longitude) {
      setRegion({
        latitude: Location.latitude,
        longitude: Location.longitude,
        latitudeDelta: 0.005, // Smaller value for more zoom
        longitudeDelta: 0.005, // Smaller value for more zoom
      });
    }
  }, [Location]);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        // Replace with your API endpoint
        const response = await axios.get(
          'https://x8ki-letl-twmt.n7.xano.io/api:RM_LD_ra/user_location',
        );
        const data = response.data;

        // Remove duplicates based on usersign_id
        const uniqueTechnicians = Array.from(
          new Map(data.map(tech => [tech.usersign_id, tech])).values(),
        );

        setTechnicians(uniqueTechnicians);
      } catch (error) {
        console.error('Error fetching technicians:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  if (loading) {
    return <LoadingFix />;
  }
  const handleTechnicianPress = technician => {
    console.log('Technician pressed:', technician);
    navigation.navigate('Chats',{data: technician});
    // Implement navigation or other actions here
  };

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Headers />

      {/* Map View */}
      <MapView provider={PROVIDER_DEFAULT} style={styles.map} region={region}>
        <UrlTile
          urlTemplate="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
        />
        {/* User Location Marker */}
        <Marker
          coordinate={{
            latitude: Location?.latitude || 37.78825,
            longitude: Location?.longitude || -122.4324,
          }}
          title="Your Location"
          description="This is where you are located."
        />
        {/* Technician Markers */}
        {technicians.map(tech => (
          <Marker
            // image={require('../../Assets/Image/Home/Icons/avatar.png')}
            key={tech.usersign_id} // Unique key for each marker
            coordinate={{latitude: tech.latitude, longitude: tech.longitude}}
            title={tech.usersign.name || 'unknown Technician'}
            description={`Technician ID: ${tech.usersign_id}`}>
            <Image
              source={require('../../Assets/Image/Home/Icons/avatar.png')}
              style={styles.markerImage}
            />
          </Marker>
        ))}
      </MapView>

      {/* Footer Component */}
      <View style={styles.technicianList}>
        <Text style={styles.listHeader}>Nearby Technicians:</Text>
        <FlatList
          data={technicians}
          keyExtractor={item => item.usersign_id.toString()}
          renderItem={({item}) => (
            <>
              {item.usersign.name ? (
                <TouchableOpacity onPress={() => handleTechnicianPress(item)}>
                  <View style={styles.rowContainer}>
                    <Image
                      source={require('../../Assets/Image/Home/Icons/avatar.png')}
                      style={styles.avatarIcon}
                    />
                    <View style={styles.rowItem}>
                    <Text style={styles.listItem}>{item.usersign.name}</Text>
                    <Text style={styles.listItem}>Tukang</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ) : (
                <Text>There Are no Technician Nearby</Text>
              )}
            </>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 15,
    backgroundColor: '#5194DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
  },
  footer: {
    padding: 15,
    backgroundColor: '#ACD0EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    fontSize: 16,
  },
  technicianList: {
    padding: 15,
    backgroundColor: '#fff',
    maxHeight:200
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '700',
    color:'black',
    marginBottom:10
  },
  listItem: {
    fontSize: 16,
    paddingVertical: 10,
    color:'black'
  },
  markerImage: {
    width: 30, // Adjust width as needed
    height: 30,
  },
  avatarIcon:{
    width: 50, // Adjust width as needed
    height: 50,
    right:30
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowItem:{
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
  }
});

export default MapScreen;
