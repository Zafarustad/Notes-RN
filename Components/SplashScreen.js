import React from 'react';
import {View, Text, Dimensions, Image, StyleSheet} from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../utils/notes-logo.png')} />
      <Text style={styles.text}>Notes</Text>
    </View>
  );
};
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: Dimensions.get('window').height,
    backgroundColor: '#2f89fc',
  },
  image: {
    width: 250,
    height: 100,
  },
  text: {
    color: '#fff',
    fontSize: 50,
    marginBottom: 30,
  },
});
