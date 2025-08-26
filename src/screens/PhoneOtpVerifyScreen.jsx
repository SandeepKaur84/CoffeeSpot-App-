import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import api from "../api/api";

const PhoneOtpVerifyScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { fullname, email, username, phone, password } = route.params;
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      const res = await api.post("/auth/verify-otp", { phone, otp });
      if (res.data.success) {
        // 👉 After OTP verified, register user
        await api.post("/auth/signup", { fullname, email, username, phone, password });
        alert("Signup Successful!");
        navigation.replace("BottomTab");
      } else {
        alert("Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      alert("Error verifying OTP");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Number</Text>
      <Text style={styles.subtitle}>OTP sent to {phone}</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter OTP"
        placeholderTextColor="#888"
        keyboardType="numeric"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
      />

      <TouchableOpacity style={styles.verifyBtn} onPress={verifyOtp}>
        <Text style={styles.btnText}>Verify OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PhoneOtpVerifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d0d0d",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    color: "#bbb",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    padding: 12,
    color: "#fff",
    marginBottom: 15,
    backgroundColor: "#1a1a1a",
  },
  verifyBtn: {
    backgroundColor: "#27ae60",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
