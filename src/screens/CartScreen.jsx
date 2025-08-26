import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../components/Header';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { useSelector, useDispatch } from 'react-redux';
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from '../slices/cartSlice';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { cartItems } = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <View style={styles.container}>
      <Header />

      <Text style={styles.cartText}>Cart</Text>

      {cartItems.length === 0 ? (
        <Text style={{ color: COLORS.primaryWhiteHex, marginTop: 20 }}>
          Your cart is empty
        </Text>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          {cartItems.map(item => (
            <View key={`${item._id}-${item.size}`} style={styles.items}>
              <Image source={{ uri: item.imageUrl }} style={styles.img} />

              <View style={styles.details}>
                {/* Coffee Details */}
                <View style={styles.coffeeDetails}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.ingredients}>
                    {item.special_ingredient}
                  </Text>
                </View>

                {/* Price + Size */}
                <View style={styles.priceDetails}>
                  <TouchableOpacity style={styles.coffeeSze}>
                    <Text style={styles.sizeTxt}>{item.size}</Text>
                  </TouchableOpacity>
                  <Text style={styles.coffeePrice}>
                    {item.currency} {item.price}
                  </Text>
                </View>

                {/* Quantity Controls */}
                <View style={styles.quantityDetails}>
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                      item.quantity > 1
                        ? dispatch(
                            decreaseQuantity({
                              _id: item._id,
                              size: item.size,
                            }),
                          )
                        : dispatch(
                            removeFromCart({ _id: item._id, size: item.size }),
                          )
                    }
                  >
                    <Text style={styles.btnText}>-</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.Quantitybtn}>
                    <Text style={styles.btnText}>{item.quantity}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() =>
                      dispatch(
                        increaseQuantity({ _id: item._id, size: item.size }),
                      )
                    }
                  >
                    <Text style={styles.btnText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}

          {/* Total Price */}
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalPrice}>$ {totalPrice.toFixed(2)}</Text>
          </View>

          {/* Checkout Button */}
          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() =>
              navigation.navigate('PaymentScreen', { total: totalPrice })
            }
          >
            <Text style={styles.checkoutTxt}>Proceed to Checkout</Text>
          </TouchableOpacity>
          <View style={{ height: 80 }} />
        </ScrollView>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    padding: 15,
  },
  cartText: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 22,
    marginVertical: 10,
  },
  img: {
    height: 100,
    width: 100,
    borderRadius: 14,
  },
  items: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: 14,
    padding: 14,
    marginBottom: 15,
    alignItems: 'center',
  },
  details: {
    padding: 10,
    marginHorizontal: 10,
    flex: 1,
  },
  coffeeDetails: {
    marginBottom: 5,
  },
  priceDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 5,
  },
  quantityDetails: {
    flexDirection: 'row',
    gap: 8,
  },
  btn: {
    height: 40,
    width: 40,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Quantitybtn: {
    height: 40,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primaryOrangeHex,
    borderWidth: 1,
    borderRadius: 14,
  },
  btnText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 18,
  },
  coffeeSze: {
    height: 40,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryBlackHex,
    borderWidth: 1,
    borderRadius: 14,
  },
  sizeTxt: {
    color: COLORS.primaryWhiteHex,
  },
  coffeePrice: {
    color: COLORS.primaryWhiteHex,
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  name: {
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    fontSize: 18,
  },
  ingredients: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.primaryWhiteHex,
    fontSize: 12,
  },
  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderColor: COLORS.primaryGreyHex,
  },
  totalText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 18,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  totalPrice: {
    color: COLORS.primaryOrangeHex,
    fontSize: 20,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutTxt: {
    color: COLORS.primaryWhiteHex,
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_medium,
  },
});
