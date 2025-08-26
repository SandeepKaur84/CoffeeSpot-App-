import { StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/theme';

const SearchBar = ({ searchText, setSearchText }) => {
  return (
    <View style={styles.searchBar}>
      <Ionicons
        name="search"
        size={20}
        color={
          searchText.length > 0
            ? COLORS.primaryOrangeHex
            : COLORS.primaryLightGreyHex
        }
      />
      <TextInput
        placeholder="Find your Coffee..."
        placeholderTextColor={COLORS.primaryLightGreyHex}
        style={styles.searchTxt}
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: 14,
    marginHorizontal: 15,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: 14,
  },
  searchTxt: {
    flex: 1,
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
    fontSize: 16,
  },
});
