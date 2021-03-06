import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InputOutline } from 'react-native-input-outline';

interface Props {}

const primary = 'blue';

const Showcase = ({}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Personal Information</Text>
        <InputOutline
          activeColor={primary}
          style={styles.input}
          placeholder="First name"
        />
        <InputOutline
          activeColor={primary}
          style={styles.input}
          placeholder="Last name"
          autoCorrect={false}
        />
        <InputOutline
          activeColor={primary}
          style={styles.input}
          placeholder="Email"
          autoCorrect={false}
        />
        <InputOutline
          activeColor={primary}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          trailingIcon={() => <Ionicons name="eye" color="#000" size={20} />}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Save Information</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 100,
    backgroundColor: '#e3e3e3',
  },
  card: {
    height: 400,
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: 'space-around',
  },
  label: {
    color: primary,
    fontSize: 30,
    fontWeight: '500',
  },
  input: {
    marginTop: 10,
  },
  button: {
    marginTop: 10,
    backgroundColor: primary,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '500',
  },
});

export default Showcase;
