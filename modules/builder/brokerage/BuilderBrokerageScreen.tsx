import {
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import React from 'react';
import colors from '@nestoHub/utils/colors';
import { screenWidth, vh, vw } from '@nestoHub/utils/dimensions';
import screenNames from '@nestoHub/utils/screenNames';
import fonts from '@nestoHub/utils/fonts';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import PendingInvoicesScreen from './PendingInvoicesScreen';
import SettledInvoicesScreen from './SettledInvoicesScreen';

interface Props {
  navigation: any;
  route: any;
}
const Tab: any = createMaterialTopTabNavigator();

export default function BuilderBrokerageScreen(props: Props) {

  return (
    <SafeAreaView style={styles.container}>
      <BrokerHeader title={'Brokerage Management'} navigation={props?.navigation} showNotification isBuilder />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.white,
          inactiveTintColor: colors.gray2,
          indicatorStyle: {
            bottom: '14%',
            width: vw(156),
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
          component={PendingInvoicesScreen}
          options={{
            tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Pending Invoices</Text>)
          }}
        />
        <Tab.Screen
          name={screenNames?.BROKER_CLAIM_HISTORY_SCREEN}
          component={SettledInvoicesScreen}
          options={{
            tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Settled Invoices</Text>)
          }}
        />
      </Tab.Navigator>
      {/* <InvoiceModal isVisible setIsVisible={(val: any) => { }} /> */}
    </SafeAreaView>
  );
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
});
