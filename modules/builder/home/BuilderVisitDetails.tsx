import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  TextInput,
} from 'react-native';
import React, { memo, useCallback, useEffect, useState } from 'react';
import colors from '@nestoHub/utils/colors';
import { normalize, screenWidth, vh, vw } from '@nestoHub/utils/dimensions';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import { SearchView } from '@nestoHub/components/SearchView';
import InvoiceComp from '@nestoHub/components/InvoiceComp';
import screenNames from '@nestoHub/utils/screenNames';
import fonts from '@nestoHub/utils/fonts';
import { FlashList } from '@shopify/flash-list';
import { BuilderStats } from '@nestoHub/components/BuilderStats';
import { CustomButton } from '@nestoHub/components/CustomButton';
import localImages from '@nestoHub/utils/localImages';
import FastImage from 'react-native-fast-image';
import { CustomActivityModal } from '@nestoHub/components/CustomActivityModal';
import { CustomDropdown } from '@nestoHub/components/CustomDropdown';
import { BrokerFloatingActionButton } from '@nestoHub/components/BrokerFloatingActionButton';

import { getVisitsByPropertyId } from '@nestoHub/actions';
import { useDispatch, useSelector } from 'react-redux';
import common from '@nestoHub/utils/common';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import BuilderAllVisitScreen from './BuilderAllVisitScreen';
import BuilderPromotedVisitsScreen from './BuilderPromotedVisitsScreen';

interface Props {
  navigation: any;
  route: any
}

const Tab: any = createMaterialTopTabNavigator();

const BuilderVisitDetails = (props: Props) => {

  // useEffect(() => {
  //   if (props?.route?.params?.propertyId) {
  //     let payload = {
  //       propertyId: props?.route?.params?.propertyId
  //     }
  //     dispatch(getVisitsByPropertyId(payload, (data: any) => {
  //     }))
  //   }
  // }, [])

  function generateArrayOfObjects(visits) {
    let outputVisitsArray = [];
    visits.forEach((obj: any) => {
      let new_obj = {};
      new_obj['visitId'] = obj['_id'];
      new_obj['brokerName'] = obj['brokerId'];
      new_obj['visitDate'] = common.formatUTCDate(obj['createdAt']);
      new_obj['status'] = obj['visitStatus']
      new_obj['clientName'] = obj['clientName']
      outputVisitsArray.push(new_obj);
    });
    return outputVisitsArray;
  }

  return (
    <SafeAreaView style={styles.container}>
      <BrokerHeader title={'Visit Details'} navigation={props?.navigation} showNotification />
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
        swipeEnabled={false}>
        <Tab.Screen
          name={screenNames?.BROKER_PERSONAL_INFO_SCREEN}
          component={BuilderAllVisitScreen}
          initialParams={{ propertyId: props?.route?.params?.propertyId }}
          options={{
            tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>All Visits</Text>)
          }}
        />
        <Tab.Screen
          name={screenNames?.BROKER_BANK_INFO_SCREEN}
          component={BuilderPromotedVisitsScreen}
          initialParams={{ propertyId: props?.route?.params?.propertyId }}
          options={{
            tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Promoted Visit</Text>)
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default BuilderVisitDetails;

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
    width: vw(100)
  },
  unfocusedText: {
    fontWeight: '300',
    fontSize: vw(15),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors?.gray2,
    marginTop: vh(1),
    textAlign: 'center',
    width: vw(100)
  }
});
