import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@nestoHub/utils/screenNames';
import BuilderBrokerageScreen from '@nestoHub/modules/builder/brokerage/BuilderBrokerageScreen';
import PropertyClaim from '@nestoHub/modules/builder/brokerage/PropertyClaim';
import BuilderNotificationScreen from '@nestoHub/modules/builder/home/BuilderNotificationScreen';

const Stack = createNativeStackNavigator();

export default function BuilderBrokerageNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screenNames?.BUILDER_BROKERAGE_SCREEN}
        component={BuilderBrokerageScreen}
      />
      <Stack.Screen
        name={screenNames?.PROPERTY_CLAIM_SCREEN}
        component={PropertyClaim}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_NOTIFICATION_SCREEN}
        component={BuilderNotificationScreen}
      />
    </Stack.Navigator>
  );
}
