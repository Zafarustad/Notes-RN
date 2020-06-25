import React, {useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {setAuthentication, logoutUserAction} from '../Actions/dataAction';
import {checkAsyncStorageToken, removeAsyncStorageToken} from '../utils/utils';
import Signup from '../Components/Signup';
import Login from '../Components/Login';
import Home from '../Components/Home';
import Archive from '../Components/Archive';
import SplashScreen from '../Components/SplashScreen';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Octicons from 'react-native-vector-icons/Octicons';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Routes = (props) => {
  useEffect(() => {
    const {setAuthentication} = props;
    const checkToken = async () => {
      await setAuthentication(await checkAsyncStorageToken());
    };
    checkToken();
  }, []);

  const logoutUser = async (navigation) => {
    const {setAuthentication, logoutUserAction} = props;
    await removeAsyncStorageToken();
    logoutUserAction();
    navigation.closeDrawer();
    setAuthentication(false);
  };

  function CustomDrawerContent(props) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          icon={() => <SimpleLineIcons name="logout" color="#000" size={20} />}
          onPress={() => {
            logoutUser(props.navigation);
          }}
        />
      </DrawerContentScrollView>
    );
  }

  const {
    data: {authenticated, successMessage},
  } = props;

  if (successMessage) {
    showMessage({
      message: successMessage,
      type: successMessage === 'Note Deleted!' ? 'danger' : 'success',
    });
  }

  return (
    <>
      {authenticated === null ? (
        <Stack.Navigator headerMode="none">
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </Stack.Navigator>
      ) : authenticated === true ? (
        <>
          <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen
              options={{
                drawerIcon: ({focused}) => (
                  <SimpleLineIcons
                    name="home"
                    size={20}
                    color={focused ? '#2f89fc' : 'grey'}
                  />
                ),
              }}
              name="Home"
              component={Home}
            />
            <Drawer.Screen
              options={{
                drawerIcon: ({focused}) => (
                  <Octicons
                    name="archive"
                    size={20}
                    color={focused ? '#2f89fc' : 'grey'}
                  />
                ),
              }}
              name="Archive"
              component={Archive}
            />
          </Drawer.Navigator>
          <FlashMessage position="top" />
        </>
      ) : (
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
        </Stack.Navigator>
      )}
    </>
  );
};

const mapStateToProps = ({data}) => ({data});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAuthentication,
      logoutUserAction,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
