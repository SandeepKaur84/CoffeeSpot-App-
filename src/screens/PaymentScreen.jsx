import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/theme';
import CustomAlert from '../components/CustomAlert';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { total } = route.params || { total: 0 };

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);

  const handlePlaceOrder = () => {
    if (!selectedMethod) {
      setAlertVisible(true);
      return;
    }
    setAlertVisible(true);
  };

  const confirmOrder = () => {
    setAlertVisible(false);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigation.replace('OrderSuccess');
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.title}>Choose Payment Method</Text>

      {/* Wallet */}
      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === 'Wallet' && styles.selectedOption,
        ]}
        onPress={() => setSelectedMethod('Wallet')}
      >
        <Text style={styles.icon}>👛</Text>
        <Text style={styles.optionText}>Wallet</Text>
      </TouchableOpacity>

      {/* Google Pay */}
      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === 'Google Pay' && styles.selectedOption,
        ]}
        onPress={() => setSelectedMethod('Google Pay')}
      >
        <Image
          source={{
            uri: 'https://img.icons8.com/color/48/google-pay-india.png',
          }}
          style={styles.logo}
        />
        <Text style={styles.optionText}>Google Pay</Text>
      </TouchableOpacity>

      {/* Apple Pay */}
      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === 'Apple Pay' && styles.selectedOption,
        ]}
        onPress={() => setSelectedMethod('Apple Pay')}
      >
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRILMZlnaEgjKNjgJqIm2xOWPw9fmWOz0aHfJ0gZHU0F0c-FyJoUTD-y9hPsQZhchqLCSk&usqp=CAU',
          }}
          style={styles.logo}
        />
        <Text style={styles.optionText}>Apple Pay</Text>
      </TouchableOpacity>

      {/* Amazon Pay */}
      <TouchableOpacity
        style={[
          styles.option,
          selectedMethod === 'Amazon Pay' && styles.selectedOption,
        ]}
        onPress={() => setSelectedMethod('Amazon Pay')}
      >
        <Image
          source={{ uri: 'https://img.icons8.com/color/48/amazon.png' }}
          style={styles.logo}
        />
        <Text style={styles.optionText}>Amazon Pay</Text>
      </TouchableOpacity>

      {/* Total Bill */}
      <View style={styles.billContainer}>
        <Text style={styles.billText}>Total Bill: ${total.toFixed(2)}</Text>
      </View>

      {/* Place Order Button */}
      <TouchableOpacity
        style={styles.placeOrderBtn}
        onPress={handlePlaceOrder}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text style={styles.placeOrderText}>Place Order</Text>
        )}
      </TouchableOpacity>

      {/* ✅ Custom Alert */}
      <CustomAlert
        visible={alertVisible}
        title={!selectedMethod ? 'Select Method' : 'Confirm Order'}
        message={
          !selectedMethod
            ? 'Please choose a payment method before proceeding.'
            : `Pay with ${selectedMethod}?`
        }
        onCancel={() => setAlertVisible(false)}
        onConfirm={selectedMethod ? confirmOrder : () => setAlertVisible(false)}
      />
    </View>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d0d',
    padding: 20,
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 10,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
    padding: 15,
    borderRadius: 14,
    marginBottom: 15,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedOption: {
    borderColor: COLORS.primaryOrangeHex,
  },
  optionText: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
    marginLeft: 12,
  },
  logo: {
    height: 28,
    width: 28,
    borderRadius: 10,
  },
  icon: {
    fontSize: 24,
    color: '#fff',
  },
  billContainer: {
    marginTop: 20,
    padding: 15,
    borderRadius: 12,
    backgroundColor: COLORS.primaryLightGreyHex,
    alignItems: 'center',
  },
  billText: {
    fontSize: 18,
    color: COLORS.primaryOrangeHex,
    fontWeight: 'bold',
  },
  placeOrderBtn: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
  },
  placeOrderText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
