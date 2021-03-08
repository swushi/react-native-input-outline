import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InputOutline } from 'react-native-input-outline';

interface Props {}

const primary = 'lightblue';
const lightBackground = '#e4e4e4';
const darkBackground = '#1e1e1e';
// const lightForeground = '#fff';
const darkForeground = '#2b2b2b';

const Showcase = ({}: Props) => {
  const [error1, setError1] = useState<string | undefined>(undefined);

  const handlePress = () => {
    setError1('Invalid Email Address');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Personal Information</Text>
        <InputOutline
          activeColor={primary}
          inactiveColor={lightBackground}
          style={styles.input}
          placeholder="First name"
          autoCorrect={false}
          keyboardAppearance="dark"
          backgroundColor={darkForeground}
          fontColor={lightBackground}
        />
        <InputOutline
          activeColor={primary}
          inactiveColor={lightBackground}
          style={styles.input}
          placeholder="Last name"
          autoCorrect={false}
          keyboardAppearance="dark"
          fontColor={lightBackground}
          backgroundColor={darkForeground}
        />
        <InputOutline
          activeColor={primary}
          inactiveColor={lightBackground}
          style={styles.input}
          placeholder="Email"
          textContentType="oneTimeCode"
          autoCorrect={false}
          backgroundColor={darkForeground}
          fontColor={lightBackground}
          keyboardAppearance="dark"
          error={error1}
          trailingIcon={() => (
            <Ionicons name="mail" size={25} color={lightBackground} />
          )}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Save Information</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    paddingTop: 75,
    backgroundColor: darkBackground,
  },
  card: {
    height: 400,
    borderRadius: 12,
    backgroundColor: darkForeground,
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
  input: {},
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
