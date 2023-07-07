import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@nestoHub/utils/screenNames';
import BrokerEarningsScreen from '@nestoHub/modules/broker/earnings/BrokerEarningsScreen';
import BrokerEarningsDetailScreen from '@nestoHub/modules/broker/earnings/BrokerEarningsDetailScreen';

const Stack = createNativeStackNavigator()

export default function BrokerEarningsNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames?.BROKER_EARNINGS_SCREEN} component={BrokerEarningsScreen} />
      <Stack.Screen name={screenNames?.BORKER_EARNINGS_DETAIL_SCREEN} component={BrokerEarningsDetailScreen} />
    </Stack.Navigator>
  )
}