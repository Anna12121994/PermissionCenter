import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import Header from '../components/Header';
import PermissionCard from '../components/PermissionCard';
import CameraPermission from '../components/CameraPermission';
import LocationPermission from '../components/LocationPermission';
import ContactsPermission from '../components/ContactsPermission';
import GalleryPermission from '../components/GalleryPermission';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header />

      <View style={styles.content}>
        <PermissionCard />

        <CameraPermission />

        <LocationPermission />

        <ContactsPermission />

        <GalleryPermission />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
  },

  content: {
    padding: 16,
  },
});