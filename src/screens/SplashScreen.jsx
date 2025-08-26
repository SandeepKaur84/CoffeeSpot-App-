import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/imgs/logo.png')} style={styles.logo} />
      <Text style={styles.title}>CoffeeSpot ☕</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 170,
    width: 170,
  },
  title: {
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryWhiteHex,
    fontSize: 18,
  },
});
