import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { navigationRef } from '@nestoHub/utils/navigationService';
import screenNames from '@nestoHub/utils/screenNames';
import SplashScreen from '@nestoHub/modules/welcome/SplashScreen';
import OnboardingScreen from '@nestoHub/modules/welcome/OnboardingScreen';
import RootNavigator from './RootNavigator';

const Stack = createNativeStackNavigator()

export default function Router(linking: any) {
    return (
        <NavigationContainer linking={linking} ref={navigationRef}>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name={screenNames?.SPLASH_SCREEN} component={SplashScreen} />
                <Stack.Screen name={screenNames?.ONBOARDING_SCREEN} component={OnboardingScreen} />
                <Stack.Screen name={screenNames?.ROOT_NAVIGATOR} component={RootNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}