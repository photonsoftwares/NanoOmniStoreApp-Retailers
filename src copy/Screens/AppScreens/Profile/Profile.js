import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { moderateScale } from '../../../styles/responsiveSize';
import { useTheme } from '@react-navigation/native';
import ImagePath from '../../../constants/ImagePath';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearAuth, logoutSuccess } from '../../../ReduxToolkit/features/authSlice';
import { clearProducts } from '../../../ReduxToolkit/features/productSlice';
import { clearUserDetails } from '../../../ReduxToolkit/features/userProfileSlice';
import { clearLoadingState } from '../../../ReduxToolkit/features/loadingSlice';
import { clearOrders } from '../../../ReduxToolkit/features/orderSlice';
import { clearBookedOrders } from '../../../ReduxToolkit/features/customerSlice';
import { clearRecommended } from '../../../ReduxToolkit/features/recommendedSlice';
import { clearCategoryData } from '../../../ReduxToolkit/features/categoriesSlice';
import { clearCategoryItemPages } from '../../../ReduxToolkit/features/categoryItemsSlice';
import { clearCartt } from '../../../ReduxToolkit/features/cartSlice';
import { clearSalesReport } from '../../../ReduxToolkit/features/salesReport';
import { clearSalesSummary } from '../../../ReduxToolkit/features/salesSummary';
import { clearSearch } from '../../../ReduxToolkit/features/searchSlice';
import { clearExtraDeliveryCharges } from '../../../ReduxToolkit/features/extraChargesSlice';

const Profile = () => {
  // const { userId, storeId, saasId,email, mobilephoneNo, name } = useSelector((state) => state?.authReducer?.user?.user_data)
  const {
    storeId,
    saasId, email,
    phoneNo,
    storeName,
    city,
    country,
    state,
    address

  } = useSelector((state) => state?.authReducer?.user?.store_data)
  const colors = useTheme().colors;

  const userData = useSelector((state) => state?.authReducer?.user);

  console.log("userData",phoneNo)

  const handleUserLogout = async () => {
    try {
      // Clear AsyncStorage data
      await AsyncStorage.clear();
      // Perform other logout actions (e.g., navigate to login screen)
      // For example:
      // navigation.navigate('Login');
      dispatch(logoutSuccess())
      dispatch(clearRecommended())
      dispatch(clearOrders())

    } catch (error) {
      console.error('Error clearing AsyncStorage:', error);
    }
  };



  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({
    // name: 'John Doe',
    // email: 'john.doe@example.com',
    // phoneNo: '123-456-7890',
    // address: '123 Main St, Cityville, State, 12345',
    // storeId: 'A123',
    // saasId: 'S456',
    storeName: storeName,
    email: email,
    phoneNo: phoneNo,
    // address: ' Main St, Cityville, State, 12345',
    address: `${city}, ${state}, ${country}`,
    storeId: storeId,
    saasId: saasId,
  });

  const handleLogout = () => {
    // You can navigate to the login screen or perform any other logout actions

    dispatch(clearAuth())
    dispatch(clearProducts())
    dispatch(clearUserDetails())
    dispatch(clearLoadingState())
    dispatch(clearOrders())
    dispatch(clearBookedOrders())
    dispatch(clearRecommended())
    dispatch(clearCategoryData())
    dispatch(clearCategoryItemPages())
    dispatch(clearCartt())
    dispatch(clearSearch())
    dispatch(clearSalesReport())
    dispatch(clearExtraDeliveryCharges())
    dispatch(clearSalesSummary())




  };

  const handleEditPress = () => {
    if (isEditing) {
      // Save the edited information
      console.log('Saving changes...');
      console.log('Edited User:', editedUser);
    }
    setIsEditing(!isEditing);
  };

  const handleChange = (field, value) => {
    setEditedUser((prevUser) => ({ ...prevUser, [field]: value }));
  };

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: colors.commonWhite, flexGrow: 1 }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            {/* Add your avatar image here */}
            {/* <Text style={[styles.avatarText, { color: colors.grey900 }]}>{editedUser.storeName[0]}</Text> */}
            <Image
              source={ImagePath.avtar}
              style={[{ width: '100%', height: '100%', borderColor: '#ECE447', borderWidth: 1, borderRadius: 300 }]}
              resizeMode='cover'
            />
          </View>
          <Text style={[styles.title, { color: colors.grey900 }]}>{editedUser.storeName}</Text>
          <Text style={[styles.subheading, { color: colors.grey900 }]}>{editedUser.email}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <MaterialIcons name="phone" size={24} color="#333" />
            <Text style={[styles.infoText, { color: colors.grey900 }]}>{editedUser.phoneNo}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="store" size={24} color="#333" />
            <Text style={[styles.infoText, { color: colors.grey900 }]}>{editedUser.storeId}</Text>
          </View>
          <View style={styles.infoRow}>
            <MaterialIcons name="fingerprint" size={24} color="#333" />
            <Text style={[styles.infoText, { color: colors.grey900 }]}>{editedUser.saasId}</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.addressContainer}>
          <Text style={[styles.addressTitle, { color: colors.grey900 }]} numberOfLines={1}>Address</Text>
          {isEditing ? (
            <>
              <TextInput
                style={styles.editInput}
                placeholder="Edit storeName"
                value={editedUser.storeName}
                onChangeText={(value) => handleChange('storeName', value)}
              />
              <TextInput
                style={styles.editInput}
                placeholder="Edit Email"
                value={editedUser.email}
                onChangeText={(value) => handleChange('email', value)}
              />
              <TextInput
                style={styles.editInput}
                placeholder="Edit Phone phoneNo"
                value={editedUser.phoneNo}
                onChangeText={(value) => handleChange('phoneNo', value)}
              />
              <TextInput
                style={styles.editInput}
                placeholder="Edit Address"
                value={editedUser.address}
                onChangeText={(value) => handleChange('address', value)}
              />
            </>
          ) : (
            <>
              {/* {/* <Text style={[styles.addressText, { color: colors.grey900 }]}>{editedUser.address}</Text> */}
              <Text style={[styles.addressText, { color: colors.grey900 }]} >{address}</Text>
            </>
          )}
        </View>

        {/* <TouchableOpacity style={styles.editButton} onPress={handleEditPress}>
          <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit'}</Text>
        </TouchableOpacity> */}

        {/* <Text>Address Update Feature is not Included Currenty</Text> */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#fff',
    // top:moderateScale(32)


  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarContainer: {
    backgroundColor: '#ECE447',
    // width: 40,
    // height: 40,
    width: 130,
    height: 130,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    // fontSize: 36,
    // fontWeight: 'bold',
    borderRadius: 500,
    borderWidth: 1,
    borderColor: 'grey'
  },
  title: {
    marginTop: 8,
    fontSize: 24,
    fontWeight: 'bold',
  },
  subheading: {
    marginTop: 4,
    fontSize: 16,
  },
  divider: {
    marginVertical: 16,
    borderWidth: 0.5,
    borderColor: '#888',
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,

  },
  addressContainer: {
    marginBottom: 16,
  },
  addressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  addressText: {
    fontSize: 16,
  },
  editInput: {
    borderBottomWidth: 1,
    marginBottom: 8,
    fontSize: 16,
  },
  editButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#ECE447',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  logoutButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },

  editInput: {
    borderBottomWidth: 1,
    marginBottom: 8,
    fontSize: 16,
  },

  editInput: {
    borderBottomWidth: 1,
    marginBottom: 8,
    fontSize: 16,
  },
});


export default Profile

