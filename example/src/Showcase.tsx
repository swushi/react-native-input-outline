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
    setError1("Yikes! That's a warning!");
  };

  const clearError = () => {
    setError1(undefined);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>react-native-input-outline</Text>
        <InputOutline
          activeColor={primary}
          inactiveColor={lightBackground}
          style={styles.input}
          placeholder="Customizable"
          autoCorrect={false}
          fontSize={30}
          keyboardAppearance="dark"
          autoCapitalize="words"
          backgroundColor={darkForeground}
          fontColor={lightBackground}
          assistiveText="Well Documented Reusable Component"
        />
        <InputOutline
          activeColor={primary}
          inactiveColor={lightBackground}
          style={styles.input}
          placeholder="Fast"
          fontSize={25}
          characterCount={14}
          trailingIcon={() => (
            <Ionicons name="rocket" size={25} color={lightBackground} />
          )}
          autoCorrect={false}
          keyboardAppearance="dark"
          autoCapitalize="words"
          fontColor={lightBackground}
          backgroundColor={darkForeground}
        />
        <InputOutline
          activeColor={primary}
          inactiveColor={lightBackground}
          style={styles.input}
          placeholder="Icon Support"
          characterCount={25}
          textContentType="oneTimeCode"
          onChangeText={clearError}
          autoCorrect={false}
          backgroundColor={darkForeground}
          fontColor={lightBackground}
          keyboardAppearance="dark"
          assistiveText="Help your users through confusing Inputs!"
          error={error1}
          autoCapitalize="words"
          trailingIcon={() => (
            <Ionicons
              name="mail"
              size={20}
              color={error1 ? 'red' : lightBackground}
            />
          )}
        />
        <InputOutline
          activeColor={primary}
          inactiveColor={lightBackground}
          style={styles.input}
          placeholder="TypeScript Enabled"
          characterCount={5}
          textContentType="oneTimeCode"
          onChangeText={clearError}
          autoCorrect={false}
          backgroundColor={darkForeground}
          fontColor={lightBackground}
          keyboardAppearance="dark"
          assistiveText="Help your users through confusing Inputs!"
          error={error1}
          autoCapitalize="words"
          trailingIcon={() => (
            <Ionicons
              name="terminal"
              size={20}
              color={error1 ? 'red' : lightBackground}
            />
          )}
        />
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text style={styles.buttonText}>Let's Get Started!</Text>
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
  input: {
    marginTop: 30,
  },
  button: {
    marginTop: 30,
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
