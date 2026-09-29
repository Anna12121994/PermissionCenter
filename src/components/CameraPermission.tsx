import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';

export default function CameraPermission() {
  const [status, setStatus] = useState('Not requested');

  const requestCameraPermission = async () => {
    if (Platform.OS !== 'android') {
      setStatus('Android only');
      return;
    }

    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'Доступ до камери',
          message: 'Застосунку потрібен доступ до камери',
          buttonPositive: 'Дозволити',
          buttonNegative: 'Відхилити',
        }
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        setStatus('Permission granted');
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
      <Text style={styles.title}>📷 Camera</Text>

      <Text style={styles.description}>
        Доступ до камери
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={requestCameraPermission}
      >
        <Text style={styles.buttonText}>
          Allow Camera
        </Text>
      </TouchableOpacity>

      <Text style={styles.status}>
        Status: {status}
      </Text>
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
});