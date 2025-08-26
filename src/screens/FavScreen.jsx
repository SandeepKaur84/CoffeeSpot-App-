import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, FONTFAMILY } from '../theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { removeFromFavorites } from '../slices/favSlice';
import { useNavigation } from '@react-navigation/native';

const FavScreen = () => {
  const { favorites } = useSelector(state => state.fav);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>💔</Text>
        <Text style={styles.emptyTitle}>No Favorites Yet</Text>
        <Text style={styles.emptyMessage}>
          You haven’t saved any coffee or beans yet. Start exploring and add
          your favorites ❤️
        </Text>
        <TouchableOpacity
          style={styles.exploreBtn}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          <Text style={styles.exploreText}>Explore Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Favorites</Text>
        <Text style={styles.headerSubtitle}>Your saved coffees & beans 🍵</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {favorites.map(item => (
          <View key={item._id} style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />

            {/* Remove Favorite */}
            <TouchableOpacity
              style={styles.heartIcon}
              onPress={() => dispatch(removeFromFavorites(item._id))}
            >
              <Ionicons name="heart" size={22} color={COLORS.primaryRedHex} />
            </TouchableOpacity>

            {/* Text Info */}
            <View style={styles.textBox}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.subTitle}>{item.special_ingredient}</Text>

              {/* Extra Info */}
              <View style={styles.extraRow}>
                {item.prices && (
                  <Text style={styles.price}>
                    ${item.prices[0]?.price || '---'}
                  </Text>
                )}
                {item.average_rating && (
                  <View style={styles.ratingBox}>
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text style={styles.ratingText}>{item.average_rating}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={{ height: 100 }}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryDarkGreyHex,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryWhiteHex,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.primaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_regular,
    marginTop: 5,
  },
  card: {
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: COLORS.primaryDarkGreyHex,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    height: 200,
    width: '100%',
  },
  textBox: {
    padding: 12,
  },
  title: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 18,
  },
  subTitle: {
    color: COLORS.primaryLightGreyHex,
    fontFamily: FONTFAMILY.poppins_light,
    fontSize: 14,
    marginBottom: 8,
  },
  extraRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 16,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  heartIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: 20,
    padding: 6,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primaryBlackHex,
    padding: 20,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  emptyTitle: {
    color: COLORS.primaryWhiteHex,
    fontSize: 22,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginBottom: 6,
  },
  emptyMessage: {
    color: COLORS.primaryLightGreyHex,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  exploreBtn: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  exploreText: {
    color: COLORS.primaryWhiteHex,
    fontSize: 16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});

export default FavScreen;
