import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { moderateScale } from 'react-native-size-matters';

const CustomAlert = ({
  visible,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'OK',
  cancelText,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.buttonRow}>
            {cancelText && (
              <TouchableOpacity style={styles.cancelBtn} onPress={onCancel}>
                <Text style={styles.cancelTxt}>{cancelText}</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.okBtn} onPress={onConfirm}>
              <Text style={styles.okTxt}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(156, 155, 155, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  alertBox: {
    width: '80%', 
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: moderateScale(20),
    padding: moderateScale(20),
    alignItems: 'center',
    elevation: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  title: {
    fontSize: moderateScale(20),
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.primaryWhiteHex,
    marginBottom: moderateScale(10),
    textAlign: 'center',
  },
  message: {
    fontSize: moderateScale(15),
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
    marginBottom: moderateScale(25),
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    backgroundColor: COLORS.primaryLightGreyHex,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(10),
    marginRight: moderateScale(10),
    alignItems: 'center',
  },
  cancelTxt: {
    fontSize: moderateScale(14),
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryBlackHex,
  },
  okBtn: {
    flex: 1,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: moderateScale(12),
    paddingVertical: moderateScale(12),
    alignItems: 'center',
  },
  okTxt: {
    fontSize: moderateScale(15),
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
  },
});

export default CustomAlert;
