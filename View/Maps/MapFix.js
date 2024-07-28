import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import MapView, { PROVIDER_DEFAULT, UrlTile, Marker, Callout, CalloutSubview } from 'react-native-maps';
import { UserLocationData } from '../../Component/RecoilData/Auth/AuthRecoil';
import { useRecoilValue } from 'recoil';
import { useNavigation } from '@react-navigation/native';
import Headers from '../../Component/Home/Headers';
import LoadingFix from '../../Component/Loading/Home/LoadingFix';
import haversineDistance from '../../Component/Map/CheckDistance';
import { showSnackbar } from '../../Component/Snackbar/SnackbarAlert';
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
  const mapViewRef = useRef(null);
  const markersRef = useRef({});

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
          'https://x8ki-letl-twmt.n7.xano.io/api:RM_LD_ra/service_location',
        );
        const data = response.data;
  
        // Create a map to track the latest entry for each usersign_id
        const latestTechnicians = data.reduce((acc, tech) => {
          const existingTech = acc[tech.usersign_id];
          // If the technician already exists in the map, check the created_at date
          if (!existingTech || new Date(tech.created_at) > new Date(existingTech.created_at)) {
            acc[tech.usersign_id] = tech;
          }
          return acc;
        }, {});
  
        // Convert the map back to an array
        const uniqueTechnicians = Object.values(latestTechnicians);
  
        setTechnicians(uniqueTechnicians);
      } catch (error) {
        // console.error('Error fetching technicians:', error);
        showSnackbar('Network unstable. Please check your connection and try again.', 4000);
      } finally {
        setLoading(false);
      }
    };
  
    fetchTechnicians();
  }, []);
  

  // useEffect(() => {
  //   const fetchTechnicians = async () => {
  //     try {
  //       // Replace with your API endpoint
  //       const response = await axios.get(
  //         'https://x8ki-letl-twmt.n7.xano.io/api:RM_LD_ra/service_location',
  //       );
  //       const data = response.data;

  //       // Remove duplicates based on usersign_id
  //       const uniqueTechnicians = Array.from(
  //         new Map(data.map(tech => [tech.usersign_id, tech])).values(),
  //       );

  //       setTechnicians(uniqueTechnicians);
  //     } catch (error) {
  //       // console.error('Error fetching technicians:', error);
  //       showSnackbar('Network unstable. Please check your connection and try again.', 4000)
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTechnicians();
  // }, []);

  if (loading) {
    return <LoadingFix />;
  }

  const handleTechnicianPress = technician => {
    console.log('Technician pressed:', technician);
    if (mapViewRef.current) {
      mapViewRef.current.animateToRegion({
        latitude: technician.latitude,
        longitude: technician.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000); // 1000ms for the animation duration
    }
    const markerRef = markersRef.current[technician.usersign_id];
    if (markerRef) {
      markerRef.showCallout();
    }
  };

  const handleNavigateToChat = technician => {
    navigation.navigate('Chats', { data: technician });
  };
  const focusOnUserLocation = () => {
    if (Location?.latitude && Location?.longitude) {
      mapViewRef.current.animateToRegion({
        latitude: Location.latitude,
        longitude: Location.longitude,
        latitudeDelta: 0.005, // Adjust zoom level as needed
        longitudeDelta: 0.005, // Adjust zoom level as needed
      }, 1000); // 1000ms for the animation duration
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Component */}
      <Headers />

      {/* Map View */}
      <View style={styles.mapContainer}>
      <MapView
        ref={mapViewRef} // Attach the reference to the MapView
        provider={PROVIDER_DEFAULT}
        style={styles.map}
        region={region}
      >
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
            ref={ref => {
              markersRef.current[tech.usersign_id] = ref;
            }}
            key={tech.serviceproviders_id} // Unique key for each marker
            coordinate={{ latitude: tech.latitude, longitude: tech.longitude }}
            title={tech.serviceproviders.usersign.name || 'unknown Technician'}
          >
            <Image
              source={require('../../Assets/Image/Home/Icons/avatar.png')}
              style={styles.markerImage}
            />
            <Callout onPress={() => handleNavigateToChat(tech)}>
              <View style={styles.callout}>
                <Text style={styles.calloutTitle}>{tech.serviceproviders.usersign.name || 'unknown Technician'}</Text>
                {/* <Text>Technician ID: {tech.usersign_id}</Text> */}
                <Text>Distance: {haversineDistance(Location, tech)} away</Text>
                <TouchableOpacity
                  style={styles.chatButton}
                  onPress={() => handleNavigateToChat(tech)}
                >
                  <Text style={styles.chatButtonText}>Click to Chat</Text>
                </TouchableOpacity>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      {/* <TouchableOpacity style={styles.focusButton} onPress={focusOnUserLocation}>
        <Text style={styles.focusButtonText}>My Location</Text>
      </TouchableOpacity> */}
      </View>

       {/* Focus User Location Button */}
       

      {/* Footer Component */}
      <View style={styles.technicianList}>
        <Text style={styles.listHeader}>Nearby Technicians:</Text>
        <FlatList
          data={technicians}
          keyExtractor={item => item.usersign_id.toString()}
          renderItem={({ item }) => (
            <>
              {item.serviceproviders.usersign.name ? (
                <TouchableOpacity onPress={() => handleTechnicianPress(item)}>
                  <View style={styles.rowContainer}>
                    <Image
                      source={require('../../Assets/Image/Home/Icons/avatar.png')}
                      style={styles.avatarIcon}
                    />
                    <View style={styles.rowItem}>
                      <Text style={styles.listItem}>{item.serviceproviders.usersign.name}</Text>
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
  mapContainer: {
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
    maxHeight: 200,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  listHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: 'black',
    marginBottom: 10,
  },
  listItem: {
    fontSize: 16,
    paddingVertical: 10,
    color: 'black',
  },
  markerImage: {
    width: 30, // Adjust width as needed
    height: 30,
  },
  avatarIcon: {
    width: 50, // Adjust width as needed
    height: 50,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the start
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  rowItem: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center', // Center items horizontally
    justifyContent: 'center', // Center items vertically
    paddingVertical: 0,
  },
  callout: {
    width: 150,
    padding: 10,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#5194DB',
    borderRadius: 5,
    alignItems: 'center',
  },
  chatButtonText: {
    color: 'white',
  },
  focusButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    padding: 10,
    backgroundColor: 'grey',
    borderRadius: 50,
    zIndex: 100,
  },
  focusButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MapScreen;
