import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InputOutline } from 'react-native-input-outline';

interface Props {}

const primary = 'blue';

const Showcase = ({}: Props) => {
  const [error1, setError1] = useState<string | undefined>(undefined);
  const [error2, setError2] = useState<string | undefined>(undefined);
  const [isHiddenPass, setIsHiddenPass] = useState(true);

  const handlePress = () => {
    setError1('Invalid Email Address');
    setError2('Password must contain at least 1 digit');
  };

  const handleHiddenPress = () => {
    setIsHiddenPass(!isHiddenPass);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.label}>Personal Information</Text>
        <InputOutline
          activeColor={primary}
          style={styles.input}
          placeholder="First name"
          autoCorrect={false}
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
          textContentType="oneTimeCode"
          autoCorrect={false}
          error={error1}
        />
        <InputOutline
          activeColor={primary}
          autoCorrect={false}
          style={styles.input}
          placeholder="Password"
          secureTextEntry={isHiddenPass}
          textContentType="oneTimeCode"
          trailingIcon={() => (
            <Ionicons
              name={isHiddenPass ? 'eye' : 'eye-off'}
              color="#000"
              size={20}
              onPress={handleHiddenPress}
            />
          )}
          error={error2}
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
    paddingTop: 75,
    backgroundColor: '#f3f3f3',
  },
  card: {
    height: 500,
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
