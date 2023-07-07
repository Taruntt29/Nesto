import { StyleSheet, Text, SafeAreaView } from 'react-native';
import React from 'react';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import fonts from '@nestoHub/utils/fonts';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import screenNames from '@nestoHub/utils/screenNames';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BuilderSupportTabScreen } from './BuilderSupportTabScreen';
import { BuilderFAQTabScreen } from './BuilderFAQTabScreen';


interface Props {
  navigation: any;
}

const Tab: any = createMaterialTopTabNavigator();

const BuilderSupport = (props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <BrokerHeader title={'Support'} navigation={props?.navigation} isBuilder showNotification />
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.white,
          inactiveTintColor: colors.gray2,
          indicatorStyle: {
            bottom: '14%',
            width: '30%',
            left: '8.5%',
            borderRadius: vw(100),
            backgroundColor: colors.customBlue,
            height: vh(40)
          },
          style: {
            alignSelf: "center",
            width: '90%',
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
        swipeEnabled={true}>
        <Tab.Screen
          name={screenNames?.BROKER_SUPPORT_TAB_SCREEN}
          component={BuilderSupportTabScreen}
          options={{
            tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Support</Text>)
          }}
        />
        <Tab.Screen
          name={screenNames?.BROKER_FAQ_TAB_SCREEN}
          component={BuilderFAQTabScreen}
          options={{
            tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>FAQs</Text>)
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BuilderSupport;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  focusedText: {
    fontWeight: '700',
    fontSize: vw(15),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors?.white,
    marginTop: vh(1),
    textAlign: 'center',
    width: vw(60),
  },
  unfocusedText: {
    fontWeight: '300',
    fontSize: vw(15),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors?.gray2,
    marginTop: vh(1),
    textAlign: 'center',
    width: vw(60),
  }
});
