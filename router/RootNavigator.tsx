import React from 'react'
import { useSelector } from 'react-redux'
import AuthNavigator from './AuthNavigator'
import BrokerBottomNavigator from './broker/BrokerBottomNavigator'
import BuilderBottomNavigator from './builder/BuilderBottomNavigator'

export default function RootNavigator() {
    const { isLoggedIn, loggedInModule } = useSelector((state: any) => state?.authReducer)
    return (isLoggedIn ?? false) ? (loggedInModule === 'builder') ? <BuilderBottomNavigator /> : <BrokerBottomNavigator /> : <AuthNavigator />
}
