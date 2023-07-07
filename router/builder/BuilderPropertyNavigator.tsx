import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@nestoHub/utils/screenNames';
import BuilderPropertyScreen from '@nestoHub/modules/builder/property/BuilderPropertyScreen';
import BuilderHomePropertyDescriptionScreen from '@nestoHub/modules/builder/home/BuilderHomePropertyDescriptionScreen';
import BuilderVisitDetails from '@nestoHub/modules/builder/home/BuilderVisitDetails';
import BuilderPropertyEditRequestScreen from '@nestoHub/modules/builder/home/BuilderPropertyEditRequestScreen';
import BuilderNotificationScreen from '@nestoHub/modules/builder/home/BuilderNotificationScreen';

const Stack = createNativeStackNavigator();

export default function BuilderPropertyNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screenNames?.BUILDER_PROPERTY_SCREEN}
        component={BuilderPropertyScreen}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_PROPERTY_DESCRIPTION_SCREEN}
        component={BuilderHomePropertyDescriptionScreen}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_VISIT_DETAILS_SCREEN}
        component={BuilderVisitDetails}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_PROPERTY_EDIT_REQUEST}
        component={BuilderPropertyEditRequestScreen}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_NOTIFICATION_SCREEN}
        component={BuilderNotificationScreen}
      />
    </Stack.Navigator>
  );
}
