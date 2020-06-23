import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Drawer = ({navigation}) => {
  return (
    <>
      <View style={styles.drawerContainer}>
        <Icon
          name="ios-menu"
          color="#fff"
          size={35}
          style={styles.menuIcon}
          onPress={() => navigation.toggleDrawer()}
        />
      </View>
    </>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  drawerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 5,
    backgroundColor: '#2f89fc'
  },
  menuIcon: {
    marginLeft: 25,
  },
});
