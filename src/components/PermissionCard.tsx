import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function PermissionCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        📷 Camera
      </Text>

      <Text style={styles.description}>
        Доступ до камери
      </Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>
          Allow access
        </Text>
      </TouchableOpacity>
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
    marginBottom: 18,
    color: '#555555',
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
});