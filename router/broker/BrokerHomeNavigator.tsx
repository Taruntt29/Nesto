import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@nestoHub/utils/screenNames';
import BrokerHomeScreen from '@nestoHub/modules/broker/home/BrokerHomeScreen';
import BrokerPropertyDescriptionScreen from '@nestoHub/modules/broker/home/BrokerPropertyDescriptionScreen';
import BrokerNotificationScreen from '@nestoHub/modules/broker/home/BrokerNotificationScreen';
import BrokerAboutTheScreen from '@nestoHub/modules/broker/home/BrokerAboutTheScreen';
import BrokerTermsAndConditionsScreen from '@nestoHub/modules/broker/profile/BrokerTermsAndConditionsScreen';
import BrokerRatingsScreen from '@nestoHub/modules/broker/home/BrokerRatingsScreen';
import BrokerFloorPlanDetailScreen from '@nestoHub/modules/broker/home/BrokerFloorPlanDetailScreen';
import BrokerPromotedPropertyScreen from '@nestoHub/modules/broker/home/BrokerViewAllPropertyScreen';
import { BrokerFloatingActionButton } from '@nestoHub/components/BrokerFloatingActionButton';
import BrokerAddEditClientScreen from '@nestoHub/modules/broker/client/BrokerAddEditClientScreen';
import BrokerBookVisitOtpScreen from '@nestoHub/components/BrokerBookVisitOtpScreen';
import { Loader } from '@nestoHub/components/Loader';
import { BrokerVisitAlertModal } from '@nestoHub/components/BrokerVisitAlertModal';

interface Props {
  navigation: any
}

const Stack = createNativeStackNavigator()

export default function BrokerHomeNavigator(props: Props) {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={screenNames?.BROKER_HOME_SCREEN} component={BrokerHomeScreen} />
        <Stack.Screen name={screenNames?.BROKER_PROPERTY_DESCRIPTION_SCREEN} component={BrokerPropertyDescriptionScreen} />
        <Stack.Screen name={screenNames?.BROKER_ABOUT_THE_SCREEN} component={BrokerAboutTheScreen} />
        <Stack.Screen name={screenNames?.BROKER_TERMS_AND_CONDITIONS_SCREEN} component={BrokerTermsAndConditionsScreen} />
        <Stack.Screen name={screenNames?.BROKER_RATINGS_SCREEN} component={BrokerRatingsScreen} />
        <Stack.Screen name={screenNames?.BROKER_FLOOR_PLAN_DETAIL_SCREEN} component={BrokerFloorPlanDetailScreen} />
        <Stack.Screen name={screenNames?.BROKER_VIEW_ALL_PROPERTY_SCREEN} component={BrokerPromotedPropertyScreen} />
        <Stack.Screen name={screenNames?.BROKER_ADD_EDIT_CLIENT_SCREEN} component={BrokerAddEditClientScreen} />
        <Stack.Screen name={screenNames?.BROKER_NOTIFICATION_SCREEN} component={BrokerNotificationScreen} />
        <Stack.Screen name={screenNames?.BROKER_BOOK_VISIT_OTP_SCREEN} component={BrokerBookVisitOtpScreen} />
      </Stack.Navigator>
      <BrokerFloatingActionButton navigation={props?.navigation} />
      <Loader/>
      {/* <BrokerVisitAlertModal/> */}
    </>
  )
}