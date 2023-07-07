import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@nestoHub/utils/screenNames';
import BrokerProfileScreen from '@nestoHub/modules/broker/profile/BrokerProfileScreen';
import BrokerPersonalDetailsScreen from '@nestoHub/modules/broker/profile/BrokerPersonalDetailsScreen';
import BrokerSupportScreen from '@nestoHub/modules/broker/profile/BrokerSupportScreen';
import BrokerPreferencesScreen from '@nestoHub/modules/broker/profile/BrokerPreferencesScreen';
import BrokerTutorialScreen from '@nestoHub/modules/broker/profile/BrokerTutorialScreen';
import BrokerRaiseQueryScreen from '@nestoHub/modules/broker/profile/BrokerRaiseQueryScreen';
import BrokerSupportCommunityDetailsScreen from '@nestoHub/modules/broker/profile/BrokerSupportCommunityDetailsScreen';
import BrokerSupportHistoryScreen from '@nestoHub/modules/broker/profile/BrokerSupportHistoryScreen';
import BrokerTermsAndConditionsScreen from '@nestoHub/modules/broker/profile/BrokerTermsAndConditionsScreen';
import BrokerNotificationScreen from '@nestoHub/modules/broker/home/BrokerNotificationScreen';

const Stack = createNativeStackNavigator()

export default function BrokerProfileNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={screenNames?.BROKER_PROFILE_SCREEN} component={BrokerProfileScreen} />
      <Stack.Screen name={screenNames?.BROKER_PERSONAL_DETAILS_SCREEN} component={BrokerPersonalDetailsScreen} />
      <Stack.Screen name={screenNames?.BROKER_PREFERENCES_SCREEN} component={BrokerPreferencesScreen} />
      <Stack.Screen name={screenNames?.BROKER_TUTORIAL_SCREEN} component={BrokerTutorialScreen} />
      <Stack.Screen name={screenNames?.BROKER_RAISE_QUERY_SCREEN} component={BrokerRaiseQueryScreen} />
      <Stack.Screen name={screenNames?.BROKER_SUPPORT_SCREEN} component={BrokerSupportScreen} />
      <Stack.Screen name={screenNames?.BROKER_SUPPORT_COMMUNITY_DETAILS_SCREEN} component={BrokerSupportCommunityDetailsScreen} />
      <Stack.Screen name={screenNames?.BROKER_SUPPORT_HISTORY_SCREEN} component={BrokerSupportHistoryScreen} />
      <Stack.Screen name={screenNames?.BROKER_TERMS_AND_CONDITIONS_SCREEN} component={BrokerTermsAndConditionsScreen} />
      <Stack.Screen name={screenNames?.BROKER_NOTIFICATION_SCREEN} component={BrokerNotificationScreen} />
    </Stack.Navigator>
  )
}