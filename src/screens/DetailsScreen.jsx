import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { moderateScale } from 'react-native-size-matters';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../slices/favSlice';
import CustomAlert from '../components/CustomAlert';

const DetailsScreen = ({ route }) => {
  const { coffee, bean } = route.params;
  const item = coffee || bean;
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState(coffee.prices?.[0]);
  const navigation = useNavigation();

  const { favorites } = useSelector(state => state.fav);
  const isFavorite = favorites.some(fav => fav._id === item._id);

  const [cartAlert, setCartAlert] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        source={{ uri: coffee.imageUrl }}
        style={styles.img}
        resizeMode="cover"
      >
        <View style={styles.icons}>
          <TouchableOpacity
            style={styles.upperBtnStyle}
            onPress={() => navigation.goBack()}
          >
            <Ionicons
              name="play-back"
              size={moderateScale(18)}
              color={COLORS.primaryLightGreyHex}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.upperBtnStyle}
            onPress={() => {
              if (isFavorite) {
                dispatch(removeFromFavorites(item._id));
              } else {
                dispatch(addToFavorites(item));
              }
            }}
          >
            <Ionicons
              name={isFavorite ? 'heart' : 'heart-outline'}
              size={moderateScale(20)}
              color={COLORS.primaryRedHex}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: moderateScale(0),
            height: moderateScale(100),
            width: '100%',
            backgroundColor: 'rgba(0,0,0,0.4)',
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <Text style={styles.coffeeName}>{coffee.name}</Text>
          <Text style={styles.coffeeSpecial}>{coffee.special_ingredient}</Text>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 3,
              }}
            >
              <Ionicons name="star" size={15} color={COLORS.primaryOrangeHex} />
              <Text style={styles.coffeeRating}>
                {coffee.average_rating || 'No rating'}{' '}
              </Text>
            </View>
            <Text style={styles.coffeeCount}>
              ({coffee.ratings_count || '0'})
            </Text>
          </View>
        </View>
      </ImageBackground>

      <View style={styles.description}>
        <Text style={styles.descHeading}>Description</Text>
        <Text style={styles.desc}>{coffee.description}</Text>
      </View>

      <View style={styles.sizeContainer}>
        <Text style={styles.descHeading}>Size</Text>
        <View style={styles.sizeBox}>
          {coffee.prices?.map(priceObj => (
            <TouchableOpacity
              key={priceObj._id}
              style={[
                styles.sizeBtns,
                selectedSize?.size === priceObj.size && {
                  backgroundColor: COLORS.primaryOrangeHex,
                },
              ]}
              onPress={() => setSelectedSize(priceObj)}
            >
              <Text style={styles.size}>{priceObj.size}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.priceBox}>
          <Text style={styles.priceTxt}>Price</Text>
          <Text style={styles.price}>
            {selectedSize?.currency} {selectedSize?.price}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addToCart}
          onPress={() => {
            dispatch(
              addToCart({
                ...item,
                size: selectedSize.size,
                price: selectedSize.price,
                currency: selectedSize.currency,
              }),
            );
            setCartAlert(true);
          }}
        >
          <Text style={styles.addToCartTxt}>Add to cart</Text>
        </TouchableOpacity>
      </View>
      <CustomAlert
        visible={cartAlert}
        title="Added to Cart"
        message={`${item.name} (${selectedSize.size}) has been added to your cart.`}
        onClose={() => setCartAlert(false)}
        onConfirm={() => {
          setCartAlert(false);
        }}
      />
    </ScrollView>
  );
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  img: {
    flex: 1,
    width: '100%',
    height: 500,
    borderRadius: 16,
  },
  coffeeName: {
    marginTop: 15,
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
    marginHorizontal: 20,
  },
  coffeeSpecial: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 14,
    marginHorizontal: 20,
  },
  coffeeRating: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 16,
    fontWeight: '800',
  },
  coffeeCount: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 12,
  },

  description: {
    gap: 10,
    marginTop: 10,
  },
  desc: {
    color: COLORS.primaryWhiteHex,
    marginHorizontal: 20,
    fontFamily: FONTFAMILY.poppins_light,
  },
  descHeading: {
    color: COLORS.primaryWhiteHex,
    fontSize: 16,
    marginHorizontal: 20,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  bottomBar: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceBox: {
    alignItems: 'center',
  },
  priceTxt: {
    color: COLORS.primaryWhiteHex,
    marginHorizontal: 20,
    fontSize: 15,
  },
  price: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_extrabold,
    fontSize: moderateScale(22),
    marginHorizontal: moderateScale(20),
  },
  addToCart: {
    height: moderateScale(55),
    width: '60%',
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: moderateScale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartTxt: {
    color: COLORS.primaryWhiteHex,
    fontSize: moderateScale(17),
    fontWeight: '700',
    fontFamily: FONTFAMILY.poppins_medium,
  },
  sizeContainer: {
    marginVertical: moderateScale(15),
  },
  sizeBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: moderateScale(8),
  },
  sizeBtns: {
    height: moderateScale(40),
    width: moderateScale(100),
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  size: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(60),
    marginHorizontal: moderateScale(20),
  },
  upperBtnStyle: {
    width: moderateScale(35),
    height: moderateScale(35),
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
