import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@nestoHub/utils/screenNames';
import BuilderSubscriptionScreen from '@nestoHub/modules/builder/subscription/BuilderSubscriptionScreen';
import BuilderNotificationScreen from '@nestoHub/modules/builder/home/BuilderNotificationScreen';

const Stack = createNativeStackNavigator();

export default function BuilderSubscriptionNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screenNames?.BUILDER_SUBSCRIPTION_SCREEN}
        component={BuilderSubscriptionScreen}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_NOTIFICATION_SCREEN}
        component={BuilderNotificationScreen}
      />
    </Stack.Navigator>
  );
}
