import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCoffees } from '../slices/coffeeSlice';
import { fetchBeans } from '../slices/beanSlice';
import CoffeeCard from '../components/CoffeeCard';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { coffeeList, loading } = useSelector(state => state.coffee);
  const { beansList } = useSelector(state => state.beans);

  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    dispatch(fetchCoffees());
    dispatch(fetchBeans());
  }, [dispatch]);

  const filteredCoffees = (coffeeList || []).filter(item =>
    item.name?.toLowerCase().includes(searchText.toLowerCase()),
  );

  const filteredBeans = (beansList || []).filter(item =>
    item.name?.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header />
      <View style={styles.headingBox}>
        <Text style={styles.heading}>Find the best {'\n'}coffee for you</Text>
      </View>

      {/* 🔹 Pass state to SearchBar */}
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <View style={styles.rowBetween}>
        <Text style={styles.beansHeading}>Coffees</Text>
        <Text style={styles.arrow}>→</Text>
      </View>

      {/* Coffees */}
      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primaryWhiteHex} />
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={true}
          data={filteredCoffees}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('DetailsScreen', { coffee: item })
              }
            >
              <CoffeeCard coffee={item} />
            </TouchableOpacity>
          )}
        />
      )}

      {/* Beans */}
      <View>
        <Text style={styles.beansHeading}>Coffee Beans</Text>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.primaryWhiteHex} />
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={true}
            data={filteredBeans}
            keyExtractor={item => item._id}
            ListEmptyComponent={
              searchText.length > 0 ? (
                <Text style={styles.noData}>No beans found</Text>
              ) : null
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('DetailsScreen', { coffee: item })
                }
              >
                <CoffeeCard coffee={item} />
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      <View style={{ height: 100 }}></View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    padding: 15,
  },
  headingBox: {
    padding: 10,
  },
  heading: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: 32,
  },
  beansHeading: {
    color: COLORS.primaryOrangeHex,
    padding: 10,
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: FONTFAMILY.poppins_medium,
    marginTop: 10,
    // alignSelf: 'center',
  },
  noData: {
    color: COLORS.primaryLightGreyHex,
    fontSize: 14,
    padding: 10,
  },
  scrollHint: {
    color: COLORS.primaryLightGreyHex,
    fontSize: 12,
    fontStyle: 'italic',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  arrow: {
    color: COLORS.primaryLightGreyHex,
    fontSize: 22,
    fontWeight: 'bold',
  },
});
