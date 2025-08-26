import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import React, { useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons
          name="grid-outline"
          size={32}
          color={COLORS.primaryLightGreyHex}
        />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Ionicons
          name="person-outline"
          size={32}
          color={COLORS.primaryLightGreyHex}
        />
      </TouchableOpacity>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>☕ Welcome to CoffeeSpot!</Text>
            <Text style={styles.message}>
              - Browse and order your favorite coffee and beans.{'\n\n'}- Add
              items to cart and place orders easily.{'\n\n'}- Manage your
              profile and preferences.{'\n\n'}- Enjoy a smooth and dark-themed
              UI 🌙
            </Text>

            <TouchableOpacity
              style={styles.okButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.okButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(129, 128, 128, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#1c1c1c',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    elevation: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primaryOrangeHex,
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#ddd',
    marginBottom: 25,
    textAlign: 'left',
    lineHeight: 22,
  },
  okButton: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  okButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
