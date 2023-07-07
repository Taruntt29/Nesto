import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@nestoHub/utils/screenNames';
import BuilderProfileScreen from '@nestoHub/modules/builder/profile/BuilderProfileScreen';
import BuilderPersonalDetails from '@nestoHub/modules/builder/profile/BuilderPersonalDetails';
import BuilderTransactions from '@nestoHub/modules/builder/profile/BuilderTransactions';
import BuilderManageRoles from '@nestoHub/modules/builder/profile/BuilderManageRoles';
import BuilderPastProperties from '@nestoHub/modules/builder/profile/BuilderPastProperties';
import BuilderTandC from '@nestoHub/modules/builder/profile/BuilderTandC';
import BuilderSupport from '@nestoHub/modules/builder/profile/BuilderSupport';
import BuilderRaiseQuery from '@nestoHub/modules/builder/profile/BuilderRaiseQuery';
import BuilderHomePropertyDescriptionScreen from '@nestoHub/modules/builder/home/BuilderHomePropertyDescriptionScreen';
import BuilderVisitDetails from '@nestoHub/modules/builder/home/BuilderVisitDetails';
import BuilderPropertyEditRequestScreen from '@nestoHub/modules/builder/home/BuilderPropertyEditRequestScreen';
import BuilderNotificationScreen from '@nestoHub/modules/builder/home/BuilderNotificationScreen';
import BuilderListOfManager from '@nestoHub/modules/builder/profile/BuilderListOfManager';

const Stack = createNativeStackNavigator();

export default function BuilderProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name={screenNames?.BUILDER_PROFILE_SCREEN}
        component={BuilderProfileScreen}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_PERSONAL_DETAILS}
        component={BuilderPersonalDetails}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_TRANSACTIONS}
        component={BuilderTransactions}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_MANAGE_ROLES}
        component={BuilderManageRoles}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_PAST_PROPERTIES}
        component={BuilderPastProperties}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_T_AND_C}
        component={BuilderTandC}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_SUPPORT}
        component={BuilderSupport}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_RAISE_QUERY}
        component={BuilderRaiseQuery}
      />
      <Stack.Screen
        name={screenNames?.BUILDER_LIST_OF_MANAGER}
        component={BuilderListOfManager}
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
