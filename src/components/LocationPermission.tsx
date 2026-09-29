import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';

export default function LocationPermission() {
  const [status, setStatus] = useState('Not requested');
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const requestLocationPermission = async () => {
    if (Platform.OS !== 'android') {
      setStatus('Android only');
      return;
    }

    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Доступ до геолокації',
          message:
            'Застосунку потрібен доступ до геолокації, щоб отримати поточні координати.',
          buttonPositive: 'Дозволити',
          buttonNegative: 'Відхилити',
        }
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        setStatus('Permission granted');

        Geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },

          error => {
            console.log(error);
            setStatus('Location error');
          },

          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          }
        );
      } else if (
        result === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      ) {
        setStatus('Never ask again');
      } else {
        setStatus('Permission denied');
      }
    } catch (error) {
      console.log(error);
      setStatus('Error');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📍 Location</Text>

      <Text style={styles.description}>
        Доступ до геолокації
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={requestLocationPermission}
      >
        <Text style={styles.buttonText}>
          Allow Location
        </Text>
      </TouchableOpacity>

      <Text style={styles.status}>
        Status: {status}
      </Text>

      {latitude !== null && longitude !== null && (
        <View style={styles.coordinates}>
          <Text style={styles.coordinateText}>
            Latitude: {latitude}
          </Text>

          <Text style={styles.coordinateText}>
            Longitude: {longitude}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 14,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },

  description: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 18,
  },

  button: {
    backgroundColor: '#208AEF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },

  status: {
    fontSize: 15,
    marginTop: 15,
  },

  coordinates: {
    marginTop: 10,
  },

  coordinateText: {
    fontSize: 15,
    marginTop: 4,
  },
});