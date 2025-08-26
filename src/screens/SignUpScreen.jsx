import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { signupUser } from '../slices/authSlice';
import { COLORS } from '../theme/theme';
import { validateEmail, validatePassword } from '../utils/validators';
import CustomAlert from '../components/CustomAlert';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [focusedInput, setFocusedInput] = useState('');

  // 🔹 Fields
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Alert State
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [onAlertConfirm, setOnAlertConfirm] = useState(() => () => {});

  const showAlert = (title, message, onConfirm = () => {}) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setOnAlertConfirm(() => onConfirm);
    setAlertVisible(true);
  };

  const handleSignup = () => {
    if (!name || !email || !password) {
      showAlert('⚠️ Missing Fields', 'Name, Email & Password are required');
      return;
    }
    if (!validateEmail(email)) {
      showAlert('❌ Invalid Email', 'Please enter a valid email address');
      return;
    }
    if (!validatePassword(password)) {
      showAlert(
        '❌ Weak Password',
        'Password must be at least 6 characters, include a number and special character',
      );
      return;
    }
    // if (!phoneNumber) {
    //   showAlert('📱 Phone Required', 'Please provide your mobile number');
    //   return;
    // }

    setLoading(true);

    dispatch(
      signupUser({
        fullname: name,
        username,
        email,
        // phoneNumber,
        password,
      }),
    )
      .unwrap()
      .then(() => {
        setLoading(false);
        showAlert(
          '✅ Signup Successful',
          'Please verify your mobile number.',
          () => {
            setAlertVisible(false);
            navigation.replace('OtpVerificationScreen', { phoneNumber });
          },
        );
      })
      .catch(err => {
        setLoading(false);
        showAlert(
          '⚠️ Signup Failed',
          err || 'Something went wrong, try again.',
        );
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.top}>
          <Image
            source={require('../assets/imgs/logo.png')}
            style={styles.coffeeLogo}
          />
          <Text style={styles.welBack}>Join Us</Text>
          <Text style={styles.heading}>
            Create your account to start your coffee adventure
          </Text>
        </View>

        <View style={styles.inputsBox}>
          {/* Full Name */}
          <Text
            style={[
              styles.inputHeading,
              focusedInput === 'name' && styles.labelFocused,
            ]}
          >
            Full Name *
          </Text>
          <View style={styles.emailBox}>
            <TextInput
              placeholder="Enter your full name"
              style={[
                styles.input,
                focusedInput === 'name' && styles.inputFocused,
              ]}
              value={name}
              onChangeText={setName}
              onFocus={() => setFocusedInput('name')}
              onBlur={() => setFocusedInput('')}
            />
          </View>

          {/* Username */}
          <Text
            style={[
              styles.inputHeading,
              focusedInput === 'username' && styles.labelFocused,
            ]}
          >
            Username *
          </Text>
          <View style={styles.emailBox}>
            <TextInput
              placeholder="Choose a username"
              style={[
                styles.input,
                focusedInput === 'username' && styles.inputFocused,
              ]}
              value={username}
              onChangeText={setUsername}
              onFocus={() => setFocusedInput('username')}
              onBlur={() => setFocusedInput('')}
            />
          </View>

          {/* Email */}
          <Text
            style={[
              styles.inputHeading,
              focusedInput === 'email' && styles.labelFocused,
            ]}
          >
            Email Address *
          </Text>
          <View style={styles.emailBox}>
            <TextInput
              placeholder="Enter your email"
              style={[
                styles.input,
                focusedInput === 'email' && styles.inputFocused,
              ]}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              onFocus={() => setFocusedInput('email')}
              onBlur={() => setFocusedInput('')}
            />
          </View>

          {/* Phone Number */}
          {/* <Text
            style={[
              styles.inputHeading,
              focusedInput === 'phone' && styles.labelFocused,
            ]}
          >
            Mobile Number *
          </Text>
          <View style={styles.emailBox}>
            <TextInput
              placeholder="Enter your phone number"
              style={[
                styles.input,
                focusedInput === 'phone' && styles.inputFocused,
              ]}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType="phone-pad"
              onFocus={() => setFocusedInput('phone')}
              onBlur={() => setFocusedInput('')}
            />
          </View> */}

          {/* Password */}
          <Text
            style={[
              styles.inputHeading,
              focusedInput === 'password' && styles.labelFocused,
            ]}
          >
            Password *
          </Text>
          <View style={styles.emailBox}>
            <TextInput
              placeholder="Create a strong password"
              style={[
                styles.input,
                focusedInput === 'password' && styles.inputFocused,
              ]}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              onFocus={() => setFocusedInput('password')}
              onBlur={() => setFocusedInput('')}
            />
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <View style={styles.btnBox}>
          <TouchableOpacity
            style={[styles.btn, loading && { opacity: 0.7 }]}
            onPress={handleSignup}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnText}>Create Account</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Divider */}
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.line} />
      </View>

      {/* Bottom Bar */}
      <View style={styles.bottomBar}>
        <Text style={styles.bottomTxt}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.signUp}>Log in</Text>
        </TouchableOpacity>
      </View>

      {/* Custom Alert */}
      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onConfirm={() => {
          setAlertVisible(false);
          onAlertConfirm();
        }}
        confirmText="OK"
      />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
    marginTop: 60,
  },
  coffeeLogo: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  welBack: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
  },
  heading: {
    color: 'white',
    fontSize: 16,
  },
  inputHeading: {
    color: 'white',
    fontWeight: '900',
    fontSize: 15,
    marginHorizontal: 45,
  },
  input: {
    height: 55,
    backgroundColor: '#1c1e21',
    borderColor: 'white',
    borderWidth: 1,
    width: '80%',
    borderRadius: 12,
    paddingStart: 15,
    color: COLORS.primaryWhiteHex,
  },
  btnBox: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  btn: {
    height: 55,
    backgroundColor: '#e67e22',
    width: '80%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '900',
  },
  bottomBar: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  bottomTxt: {
    color: 'white',
    fontSize: 16,
  },
  signUp: {
    color: 'orange',
    fontSize: 16,
  },
  inputsBox: {
    gap: 3,
  },
  emailBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#1c1e21',
    borderRadius: 12,
    marginHorizontal: 40,
    marginBottom: 15,
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    height: 55,
    color: COLORS.primaryWhiteHex,
    paddingHorizontal: 10,
  },

  iconContainer: {
    padding: 5,
  },

  email: {
    marginHorizontal: 40,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    paddingHorizontal: 40,
  },
  dividerText: {
    color: 'white',
    marginHorizontal: 10,
    fontSize: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'white',
  },
  inputFocused: {
    borderColor: 'orange',
    shadowColor: 'orange',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  lebelFocused: {
    color: 'orange',
  },
});
