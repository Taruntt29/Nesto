import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@nestoHub/utils/screenNames';
import BrokerClientScreen from '@nestoHub/modules/broker/client/BrokerClientScreen';
import BrokerAddEditClientScreen from '@nestoHub/modules/broker/client/BrokerAddEditClientScreen';
import BrokerVisitSummaryScreen from '@nestoHub/modules/broker/client/BrokerVisitSummaryScreen';
import BrokerRequirementDetailScreen from '@nestoHub/modules/broker/client/BrokerRequirementDetailScreen';
import BrokerVisitDetailsScreen from '@nestoHub/modules/broker/client/BrokerVisitDetailsScreen';
import { BrokerFloatingActionButton } from '@nestoHub/components/BrokerFloatingActionButton';
import BrokerAddNewRequirementScreen from '@nestoHub/modules/broker/client/BrokerAddNewRequirementScreen';
import BrokerBoughtScreen from '@nestoHub/modules/broker/client/BrokerBoughtScreen';

interface Props {
  navigation: any
}

const Stack = createNativeStackNavigator()

export default function BrokerClientNavigator(props: Props) {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={screenNames?.BROKER_CLIENT_SCREEN} component={BrokerClientScreen} />
        <Stack.Screen name={screenNames?.BROKER_ADD_EDIT_CLIENT_SCREEN} component={BrokerAddEditClientScreen} />
        <Stack.Screen name={screenNames?.BROKER_VISIT_SUMMARY_SCREEN} component={BrokerVisitSummaryScreen} />
        <Stack.Screen name={screenNames?.BROKER_REQUIREMENT_DETAIL_SCREEN} component={BrokerRequirementDetailScreen} />
        <Stack.Screen name={screenNames?.BROKER_VISIT_DETAILS_SCREEN} component={BrokerVisitDetailsScreen} />
        <Stack.Screen name={screenNames?.BROKER_ADD_NEW_REQUIREMENT_SCREEN} component={BrokerAddNewRequirementScreen} />
        <Stack.Screen name={screenNames?.BROKER_BOUGHT_SCREEN} component={BrokerBoughtScreen} />
      </Stack.Navigator>
    </>
  )
}