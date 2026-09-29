import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  Image,
} from 'react-native';

import * as ImagePicker from 'react-native-image-picker';

export default function GalleryPermission() {
  const [status, setStatus] = useState('Not requested');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const requestGalleryPermission = async () => {
    if (Platform.OS !== 'android') {
      setStatus('Android only');
      return;
    }

    try {
      const permission =
        Platform.Version >= 33
          ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
          : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

      const result = await PermissionsAndroid.request(
        permission,
        {
          title: 'Доступ до галереї',
          message:
            'Застосунку потрібен доступ до фотографій.',
          buttonPositive: 'Дозволити',
          buttonNegative: 'Відхилити',
        }
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        setStatus('Permission granted');

        const pickerResult =
          await ImagePicker.launchImageLibrary({
            mediaType: 'photo',
            selectionLimit: 1,
            includeBase64: false,
          });

        if (
          !pickerResult.didCancel &&
          pickerResult.assets &&
          pickerResult.assets.length > 0
        ) {
          setImageUri(
            pickerResult.assets[0].uri ?? null
          );
        }
      } else if (
        result ===
        PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
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
      <Text style={styles.title}>
        🖼️ Gallery
      </Text>

      <Text style={styles.description}>
        Доступ до галереї
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={requestGalleryPermission}
      >
        <Text style={styles.buttonText}>
          Open Gallery
        </Text>
      </TouchableOpacity>

      <Text style={styles.status}>
        Status: {status}
      </Text>

      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={styles.image}
        />
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

  image: {
    width: '100%',
    height: 220,
    marginTop: 15,
    borderRadius: 10,
  },
});