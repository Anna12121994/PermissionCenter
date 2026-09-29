import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from 'react-native';

import Contacts from 'react-native-contacts';

export default function ContactsPermission() {
  const [status, setStatus] = useState('Not requested');
  const [contacts, setContacts] = useState<string[]>([]);

  const requestContactsPermission = async () => {
    if (Platform.OS !== 'android') {
      setStatus('Android only');
      return;
    }

    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Доступ до контактів',
          message:
            'Застосунку потрібен доступ до контактів.',
          buttonPositive: 'Дозволити',
          buttonNegative: 'Відхилити',
        }
      );

      if (result === PermissionsAndroid.RESULTS.GRANTED) {
        setStatus('Permission granted');

        const allContacts = await Contacts.getAll();

        const firstContacts = allContacts
          .slice(0, 5)
          .map(contact => contact.displayName ?? 'Без імені');

        setContacts(firstContacts);
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
      <Text style={styles.title}>👤 Contacts</Text>

      <Text style={styles.description}>
        Доступ до контактів
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={requestContactsPermission}
      >
        <Text style={styles.buttonText}>
          Allow Contacts
        </Text>
      </TouchableOpacity>

      <Text style={styles.status}>
        Status: {status}
      </Text>

      {contacts.length > 0 && (
        <View style={styles.contactsList}>
          <Text style={styles.contactsTitle}>
            Контакти:
          </Text>

          {contacts.map((contact, index) => (
            <Text
              key={index}
              style={styles.contact}
            >
              {contact}
            </Text>
          ))}
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

  contactsList: {
    marginTop: 12,
  },

  contactsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  contact: {
    fontSize: 15,
    marginTop: 4,
  },
});