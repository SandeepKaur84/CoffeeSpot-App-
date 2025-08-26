import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import CustomAlert from './CustomAlert';

const CoffeeCard = ({ coffee }) => {
  const price = parseFloat(coffee.prices?.[0]?.price) || 0;
  const rating = coffee.average_rating || 0;

  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleAddToCart = item => {
    if (!item.prices || item.prices.length === 0) {
      console.warn('No prices found for item:', item.name);
      return;
    }

    const defaultPriceObj = item.prices[0];

    dispatch(
      addToCart({
        ...item,
        size: defaultPriceObj.size,
        price: parseFloat(defaultPriceObj.price),
        currency: defaultPriceObj.currency,
        quantity: 1,
      }),
    );

    setAlertMessage(
      `${item.name} (${defaultPriceObj.size}) has been added to your cart.`,
    );
    setAlertVisible(true);
  };

  return (
    <View style={styles.card}>
      <ImageBackground
        source={{ uri: coffee.imageUrl }}
        style={styles.image}
        imageStyle={{ borderRadius: 20 }}
      >
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={14} color="#fff" />
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </ImageBackground>

      <View style={styles.info}>
        <Text style={styles.name}>{coffee.name}</Text>
        <Text style={styles.ingredient}>
          {coffee.special_ingredient || 'With love'}
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.price}>$ {price.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => handleAddToCart(coffee)}
        >
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Custom Alert */}
      <CustomAlert
        title="Added"
        visible={alertVisible}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
      />
    </View>
  );
};

export default CoffeeCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: 25,
    paddingHorizontal: 10,
    paddingVertical: 20,
    marginRight: 20,
    width: 160,
    height: 250,
  },
  image: {
    height: 120,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    padding: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryOrangeHex || '#D17842',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  info: {
    marginTop: 10,
  },
  name: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.poppins_bold,
  },
  ingredient: {
    color: COLORS.primaryLightGreyHex || '#BFBFBF',
    fontSize: 12,
    marginTop: 2,
    fontFamily: FONTFAMILY.poppins_light,
  },
  footer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: FONTFAMILY.poppins_medium,
  },
  addButton: {
    backgroundColor: COLORS.primaryOrangeHex || '#D17842',
    padding: 6,
    borderRadius: 10,
  },
});
