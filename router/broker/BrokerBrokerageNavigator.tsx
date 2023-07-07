import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@nestoHub/utils/screenNames';
import BrokerBrokerageScreen from '@nestoHub/modules/broker/brokerage/BrokerBrokerageScreen';
import BrokerBrokerageClaimScreen from '@nestoHub/modules/broker/brokerage/BrokerBrokerageClaimScreen';
import BrokerTermsAndConditionsScreen from '@nestoHub/modules/broker/profile/BrokerTermsAndConditionsScreen';
import BrokerLoanQueriesScreen from '@nestoHub/modules/broker/brokerage/BrokerLoanQueriesScreen';
import BrokerClaimHistoryScreen from '@nestoHub/modules/broker/brokerage/BrokerClaimHistoryScreen';
import BrokerEligibleClaimScreen from '@nestoHub/modules/broker/brokerage/BrokerEligibleClaimScreen';

const Stack = createNativeStackNavigator()

export default function BrokerBrokerageNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames?.BROKER_BROKERAGE_SCREEN} component={BrokerBrokerageScreen} />
      <Stack.Screen name={screenNames?.BROKER_ELIGIBLE_CLAIMS_SCREEN} component={BrokerEligibleClaimScreen} />
      <Stack.Screen name={screenNames?.BROKER_CLAIM_HISTORY_SCREEN} component={BrokerClaimHistoryScreen} />
      <Stack.Screen name={screenNames?.BROKER_LOAN_QUERIES_SCREEN} component={BrokerLoanQueriesScreen} />
      <Stack.Screen name={screenNames?.BROKER_BROKERAGE_CLAIM_SCREEN} component={BrokerBrokerageClaimScreen} />
      <Stack.Screen name={screenNames?.BROKER_TERMS_AND_CONDITIONS_SCREEN} component={BrokerTermsAndConditionsScreen} />
    </Stack.Navigator>
  )
}