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
import { loginUser } from '../slices/authSlice';
import { COLORS } from '../theme/theme';
import { validateEmail, validatePassword } from '../utils/validators';
import CustomAlert from '../components/CustomAlert';
import Ionicons from 'react-native-vector-icons/Ionicons';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // 🔹 Alert state
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [onAlertConfirm, setOnAlertConfirm] = useState(() => () => {});

  const showAlert = (title, message, onConfirm = () => {}, cancel = false) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setOnAlertConfirm(() => onConfirm);
    setAlertVisible(true);
  };

  const handleLogin = () => {
    if (!email || !password) {
      showAlert('⚠️ Missing Fields', 'Please fill in all fields.');
      return;
    }
    if (!validateEmail(email)) {
      showAlert('❌ Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setLoading(true);

    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => {
        setLoading(false);
        showAlert('✅ Login Successful', 'Welcome back to CoffeeSpot!', () => {
          setAlertVisible(false);
          navigation.replace('BottomTab');
        });
      })
      .catch(err => {
        setLoading(false);
        showAlert('⚠️ Login Failed', err || 'Something went wrong, try again.');
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
          <Text style={styles.welBack}>Welcome Back!</Text>
          <Text style={styles.heading}>
            Sign in to continue your coffee journey
          </Text>
        </View>
        <View style={styles.inputsBox}>
          <View style={styles.email}>
            <Text style={styles.inputHeading}>Email</Text>
          </View>
          <View style={styles.emailBox}>
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            ></TextInput>
          </View>
          <View style={styles.email}>
            <Text style={styles.inputHeading}>Password</Text>
          </View>
          <View style={styles.emailBox}>
            <TextInput
              placeholder="Enter your password"
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
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
        <View style={styles.btnBox}>
          <TouchableOpacity
            style={[styles.btn, loading && { opacity: 0.7 }]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.btnText}>Sign in</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.dividerContainer}>
        <View style={styles.line} />
        <Text style={styles.dividerText}>or</Text>
        <View style={styles.line} />
      </View>

      <View style={styles.bottomBar}>
        <Text style={styles.bottomTxt}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
          <Text style={styles.signUp}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <CustomAlert
        visible={alertVisible}
        title={alertTitle}
        message={alertMessage}
        onConfirm={() => setAlertVisible(false)}
        onCancel={() => setAlertVisible(false)}
        // cancelText="Cancel"
        confirmText="OK"
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    gap: 25,
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 35,
    gap: 5,
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
    elevation: 8,
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
    marginTop: 20,
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
    gap: 5,
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
    // position: 'absolute',
    // bottom: 30,
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
});
