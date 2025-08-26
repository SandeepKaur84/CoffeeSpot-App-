import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateUser, updateAvatar } from '../slices/authSlice';
import { COLORS } from '../theme/theme';
import Icon from 'react-native-vector-icons/Ionicons';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomAlert from '../components/CustomAlert';

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [avatar, setAvatar] = useState(
    user?.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
  );

  const [isEditing, setIsEditing] = useState(false);
  const [fullname, setFullname] = useState(user?.fullname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [username, setUsername] = useState(user?.username || '');

  const [logoutAlert, setLogoutAlert] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigation.replace('LoginScreen');
    });
  };

  const handleChangePicture = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.7 }, response => {
      if (response.assets && response.assets.length > 0) {
        const selectedUri = response.assets[0].uri;
        setAvatar(selectedUri);
        dispatch(updateAvatar(selectedUri));
      }
    });
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.noUser}>No user data found</Text>
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setLogoutAlert(true)}
        >
          <Text style={styles.logoutTxt}>Logout</Text>
        </TouchableOpacity>

        <CustomAlert
          visible={logoutAlert}
          title="Logout"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          cancelText="Cancel"
          onCancel={() => setLogoutAlert(false)}
          onConfirm={() => {
            handleLogout();
            setLogoutAlert(false);
          }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Arrow */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={28} color={COLORS.primaryWhiteHex} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={{ width: 28 }} />
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 80 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          {isEditing && (
            <TouchableOpacity
              style={styles.changePicBtn}
              onPress={handleChangePicture}
            >
              <Text style={styles.changePicText}>Change Picture</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Info Section */}
        {!isEditing ? (
          <>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Full Name</Text>
              <Text style={styles.value}>{fullname || 'N/A'}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{email}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Phone</Text>
              <Text style={styles.value}>{phone || 'N/A'}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Username</Text>
              <Text style={styles.value}>{username || 'N/A'}</Text>
            </View>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={fullname}
              onChangeText={setFullname}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              value={phone}
              onChangeText={setPhone}
              placeholderTextColor="#999"
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              placeholderTextColor="#999"
            />
          </>
        )}

        {/* Action Buttons */}
        {!isEditing ? (
          <TouchableOpacity
            style={styles.editBtn}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editBtnText}>Edit Profile</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => {
              dispatch(
                updateUser({
                  fullname,
                  email,
                  phoneNumber: phone,
                  username,
                }),
              );
              setIsEditing(false);
            }}
          >
            <Text style={styles.saveBtnText}>Save Changes</Text>
          </TouchableOpacity>
        )}

        {/* Logout Btn */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => setLogoutAlert(true)}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

        <CustomAlert
          visible={logoutAlert}
          title="Logout"
          message="Are you sure you want to logout?"
          confirmText="Logout"
          cancelText="Cancel"
          onCancel={() => setLogoutAlert(false)}
          onConfirm={() => {
            handleLogout();
            setLogoutAlert(false);
          }}
        />
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    color: COLORS.primaryWhiteHex,
    fontWeight: 'bold',
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: COLORS.primaryWhiteHex,
  },
  changePicBtn: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  changePicText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  infoBox: {
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
  },
  input: {
    backgroundColor: COLORS.primaryGreyHex,
    color: COLORS.primaryWhiteHex,
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
  },
  editBtn: {
    backgroundColor: COLORS.primaryOrangeHex,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  editBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveBtn: {
    backgroundColor: '#2e7d32',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutBtn: {
    backgroundColor: 'red',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noUser: {
    color: '#aaa',
    fontSize: 18,
    textAlign: 'center',
  },
});
