import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import colors from '@nestoHub/utils/colors'
import { screenWidth, vh, vw } from '@nestoHub/utils/dimensions'
import fonts from '@nestoHub/utils/fonts'
import screenNames from '@nestoHub/utils/screenNames'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BrokerEligibleClaimScreen from './BrokerEligibleClaimScreen'
import BrokerClaimHistoryScreen from './BrokerClaimHistoryScreen'
import BrokerLoanQueriesScreen from './BrokerLoanQueriesScreen'

interface Props {
  navigation: any,
  route: any;
}

const Tab: any = createMaterialTopTabNavigator();

export default function BrokerBrokerageScreen(props: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <BrokerHeader title={'Brokerage Management'} navigation={props?.navigation} showNotification />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.white,
          inactiveTintColor: colors.gray2,
          indicatorStyle: {
            bottom: '14%',
            width: vw(100),
            left: '2.5%',
            borderRadius: vw(100),
            backgroundColor: colors.customBlue,
            height: vh(40)
          },
          style: {
            alignSelf: "center",
            width: screenWidth - vw(30),
            borderRadius: vw(100),
            backgroundColor: colors.gray7,
            elevation: 2,
            shadowOpacity: .10,
            shadowRadius: 4,
            height: vh(56),
            marginVertical: vh(1),
            marginHorizontal: vw(1)
          },
          tabStyle: {
            borderRadius: vw(100),
          },
          pressColor: 'rgba(255, 255, 255, .4)',
        }}
        lazy={true}
        swipeEnabled={true}>
        <Tab.Screen
          name={screenNames?.BROKER_ELIGIBLE_CLAIMS_SCREEN}
          component={BrokerEligibleClaimScreen}
          options={{
            tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Eligible Claims</Text>)
          }}
        />
        <Tab.Screen
          name={screenNames?.BROKER_CLAIM_HISTORY_SCREEN}
          component={BrokerClaimHistoryScreen}
          options={{
            tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Claim History</Text>)
          }}
        />
        <Tab.Screen
          name={screenNames?.BROKER_LOAN_QUERIES_SCREEN}
          component={BrokerLoanQueriesScreen}
          options={{
            tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Loan Queries</Text>)
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  focusedText: {
    fontWeight: '600',
    fontSize: vw(12.5),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors?.white,
    marginTop: vh(2),
    textAlign: 'center',
    width: vw(100),
  },
  unfocusedText: {
    fontWeight: '500',
    fontSize: vw(12.5),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors?.gray2,
    marginTop: vh(2),
    textAlign: 'center',
    width: vw(100),
  },
})