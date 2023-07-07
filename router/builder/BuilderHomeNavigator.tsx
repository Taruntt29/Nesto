import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@nestoHub/utils/screenNames';
import BuilderHomeScreen from '@nestoHub/modules/builder/home/BuilderHomeScreen';
import BuilderHomePropertyDescriptionScreen from '@nestoHub/modules/builder/home/BuilderHomePropertyDescriptionScreen';
import BuilderAboutTheScreen from '@nestoHub/modules/builder/home/BuilderAboutTheScreen';
import BuilderPropertyEditRequestScreen from '@nestoHub/modules/builder/home/BuilderPropertyEditRequestScreen';
import BuilderVisitDetails from '@nestoHub/modules/builder/home/BuilderVisitDetails';
import BuilderRecentlyAddedScreen from '@nestoHub/modules/builder/home/BuilderRecentlyAddedScreen';
import BuilderSoldOutProperty from '@nestoHub/modules/builder/home/BuilderSoldOutProperty';
import BuilderSubscriptionScreen from '@nestoHub/modules/builder/subscription/BuilderSubscriptionScreen';
import BuilderNotificationScreen from '@nestoHub/modules/builder/home/BuilderNotificationScreen';
import BuilderPropertyClaim from '@nestoHub/modules/builder/home/BuilderPropertyClaim';
import ListPropertyOrRequirementScreen from '@nestoHub/modules/auth/ListPropertyOrRequirementScreen';

const Stack = createNativeStackNavigator();

export default function BuilderHomeNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screenNames?.BUILDER_HOME_SCREEN}
        component={BuilderHomeScreen}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_PROPERTY_DESCRIPTION_SCREEN}
        component={BuilderHomePropertyDescriptionScreen}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_ABOUT_THE_SCREEN}
        component={BuilderAboutTheScreen}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_PROPERTY_EDIT_REQUEST}
        component={BuilderPropertyEditRequestScreen}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_VISIT_DETAILS_SCREEN}
        component={BuilderVisitDetails}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_RECENTLY_ADDED_SCREEN}
        component={BuilderRecentlyAddedScreen}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_SOLDOUT_PROPERTY_SCREEN}
        component={BuilderSoldOutProperty}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_SUBSCRIPTION_SCREEN}
        component={BuilderSubscriptionScreen}
      />
      <Stack.Screen name={screenNames?.BUILDER_NOTIFICATION_SCREEN} component={BuilderNotificationScreen} />
      <Stack.Screen name={screenNames?.BUILDER_PROPERTY_CLAIM} component={BuilderPropertyClaim} />
      <Stack.Screen name={screenNames?.LIST_PROPERTY_OR_REQUIREMENT_SCREEN} component={ListPropertyOrRequirementScreen} />
    </Stack.Navigator>
  );
}
