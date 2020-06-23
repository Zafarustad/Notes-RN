import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export const setAsyncStorageToken = async (token) => {
  try {
    const authToken = `Bearer ${token}`;
    await AsyncStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = authToken;
  } catch (err) {
    console.log(err);
  }
};

export const checkAsyncStorageToken = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      return false;
    }
    const authToken = `Bearer ${token}`;
    axios.defaults.headers.common['Authorization'] = authToken;
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const removeAsyncStorageToken = async () => {
  try {
    await AsyncStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  } catch (err) {
    console.log(err);
  }
};
