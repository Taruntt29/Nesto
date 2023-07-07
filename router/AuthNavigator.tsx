import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import screenNames from '@nestoHub/utils/screenNames';
import LoginScreen from '@nestoHub/modules/auth/LoginScreen';
import OtpScreen from '@nestoHub/modules/auth/OtpScreen';
import RegisterScreen from '@nestoHub/modules/auth/RegisterScreen';
import ListPropertyOrRequirementScreen from '@nestoHub/modules/auth/ListPropertyOrRequirementScreen';
import ModuleSelectionScreen from '@nestoHub/modules/welcome/ModuleSelectionScreen';

const Stack = createNativeStackNavigator()

export default function AuthNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={screenNames?.MODULE_SELECTION_SCREEN} component={ModuleSelectionScreen} />
            <Stack.Screen name={screenNames?.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={screenNames?.OTP_SCREEN} component={OtpScreen} />
            <Stack.Screen name={screenNames?.REGISTER_SCREEN} component={RegisterScreen} />
            <Stack.Screen name={screenNames?.LIST_PROPERTY_OR_REQUIREMENT_SCREEN} component={ListPropertyOrRequirementScreen} />
        </Stack.Navigator>
    )
}