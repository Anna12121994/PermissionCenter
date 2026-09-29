import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Permission Center</Text>

      <Text style={styles.subtitle}>
        Керування дозволами пристрою
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
    backgroundColor: '#208AEF',
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },

  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 6,
  },
});