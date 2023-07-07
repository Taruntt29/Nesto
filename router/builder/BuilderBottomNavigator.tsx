import { StyleSheet, Text } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { vh, vw } from '@nestoHub/utils/dimensions';
import screenNames from '@nestoHub/utils/screenNames';
import BuilderHomeNavigator from './BuilderHomeNavigator';
import BuilderPropertyNavigator from './BuilderPropertyNavigator';
import BuilderBrokerageNavigator from './BuilderBrokerageNavigator';
import BuilderSubscriptionNavigator from './BuilderSubscriptionNavigator';
import BuilderProfileNavigator from './BuilderProfileNavigator';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import colors from '@nestoHub/utils/colors';
import fonts from '@nestoHub/utils/fonts';

const Tab = createBottomTabNavigator();

export default function BuilderBottomNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        lazy: true,
        tabBarAllowFontScaling: true,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { height: vh(65), paddingVertical: vh(15) }
      }}>
      <Tab.Screen
        name={screenNames?.BUILDER_HOME_NAVIGATOR}
        component={BuilderHomeNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={styles.focusedText}>{focused && 'Home'}</Text>,
          tabBarIcon: ({ focused }) => <FastImage source={focused ? localImages.HOME_SELECTED : localImages?.HOME_UNSELECTED} style={styles.icon} resizeMode='contain' />
        }}
      />
      <Tab.Screen
        name={screenNames?.BUILDER_PROPERTY_NAVIGATOR}
        component={BuilderPropertyNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={styles.focusedText}>{focused && 'Property'}</Text>,
          tabBarIcon: ({ focused }) => <FastImage source={focused ? localImages.PROPERTY_MANAGEMENT_SELECTED : localImages?.PROPERTY_MANAGEMENT_UNSELECTED} style={styles.icon} resizeMode='contain' />
        }}
      />
      <Tab.Screen
        name={screenNames?.BUILDER_BROKERAGE_NAVIGATOR}
        component={BuilderBrokerageNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={styles.focusedText}>{focused && 'Brokerage'}</Text>,
          tabBarIcon: ({ focused }) => <FastImage source={focused ? localImages.BROKERAGE_SELECTED : localImages?.BROKERAGE_UNSELECTED} style={styles.icon} resizeMode='contain' />
        }}
      />
      <Tab.Screen
        name={screenNames?.BUILDER_SUBSCRIPTION_NAVIGATOR}
        component={BuilderSubscriptionNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={styles.focusedText}>{focused && 'Subscription'}</Text>,
          tabBarIcon: ({ focused }) => <FastImage source={focused ? localImages.SUBSCRIPTION_SELECTED : localImages?.SUBSCRIPTION_UNSELECTED} style={styles.icon} resizeMode='contain' />
        }}
      />
      <Tab.Screen
        name={screenNames?.BUILDER_PROFILE_NAVIGATOR}
        component={BuilderProfileNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={styles.focusedText}>{focused && 'Profile'}</Text>,
          tabBarIcon: ({ focused }) => <FastImage source={focused ? localImages.PROFILE_SELECTED : localImages?.PROFILE_UNSELECTED} style={styles.icon} resizeMode='contain' />
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  focusedText: {
    fontSize: vw(12.5),
    fontWeight: '600',
    color: colors.customBlue,
    lineHeight: vh(15),
    fontFamily: fonts.BAHNSCHRIFT,
    marginBottom: vh(12)
  },
  icon: {
    width: vw(20),
    height: vh(20)
  }
});
