import { Alert, BackHandler, StyleSheet, Text } from 'react-native'
import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import screenNames from '@nestoHub/utils/screenNames';
import BrokerHomeNavigator from './BrokerHomeNavigator';
import { vh, vw } from '@nestoHub/utils/dimensions';
import FastImage from 'react-native-fast-image'
import BrokerClientNavigator from './BrokerClientNavigator';
import localImages from '@nestoHub/utils/localImages';
import colors from '@nestoHub/utils/colors';
import fonts from '@nestoHub/utils/fonts';
import BrokerProfileNavigator from './BrokerProfileNavigator';
import BrokerEarningsNavigator from './BrokerEarningsNavigator';
import BrokerBrokerageNavigator from './BrokerBrokerageNavigator';
import RNExitApp from 'react-native-exit-app';

const Tab = createBottomTabNavigator();

export default function BrokerBottomNavigator() {

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
        name={screenNames?.BROKER_HOME_NAVIGATOR}
        component={BrokerHomeNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={styles.focusedText}>{focused && 'Home'}</Text>,
          tabBarIcon: ({ focused }) => <FastImage source={focused ? localImages.HOME_SELECTED : localImages?.HOME_UNSELECTED} style={styles.icon} resizeMode='contain' />
        }}
      />
      <Tab.Screen
        name={screenNames?.BROKER_CLIENT_NAVIGATOR}
        component={BrokerClientNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={styles.focusedText}>{focused && 'Client'}</Text>,
          tabBarIcon: ({ focused }) => <FastImage source={focused ? localImages.CLIENT_SELECTED : localImages?.CLIENT_UNSELECTED} style={styles.icon} resizeMode='contain' />
        }}
      />
      <Tab.Screen
        name={screenNames?.BROKER_BROKERAGE_NAVIGATOR}
        component={BrokerBrokerageNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={styles.focusedText}>{focused && 'Brokerage'}</Text>,
          tabBarIcon: ({ focused }) => <FastImage source={focused ? localImages.BROKERAGE_SELECTED : localImages?.BROKERAGE_UNSELECTED} style={styles.icon} resizeMode='contain' />
        }}
      />
      <Tab.Screen
        name={screenNames?.BROKER_EARNINGS_NAVIGATOR}
        component={BrokerEarningsNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={styles.focusedText}>{focused && 'Earnings'}</Text>,
          tabBarIcon: ({ focused }) => <FastImage source={focused ? localImages.EARNINGS_SELECTED : localImages?.EARNINGS_UNSELECTED} style={styles.icon} resizeMode='contain' />
        }}
      />
      <Tab.Screen
        name={screenNames?.BROKER_PROFILE_NAVIGATOR}
        component={BrokerProfileNavigator}
        options={{
          tabBarLabel: ({ focused }) => <Text style={styles.focusedText}>{focused && 'Profile'}</Text>,
          tabBarIcon: ({ focused }) => <FastImage source={focused ? localImages.PROFILE_SELECTED : localImages?.PROFILE_UNSELECTED} style={styles.icon} resizeMode='contain' />
        }}
      />
    </Tab.Navigator >
  )
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
})