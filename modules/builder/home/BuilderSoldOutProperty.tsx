import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '@nestoHub/utils/colors';
import { vw, vh, normalize } from '@nestoHub/utils/dimensions';
import { SearchView } from '@nestoHub/components/SearchView';
import fonts from '@nestoHub/utils/fonts';
import SoldOutPropertyComp from '@nestoHub/components/SoldOutPropertyComp';
import { useSelector } from 'react-redux';
import common from '@nestoHub/utils/common';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';

interface Props {
  title: string;
  onPressBack: any;
  navigation: any;
  route: any;
}

export default function BuilderSoldOutProperty(props: Props) {
  const [searchText, setSearchText] = useState<string>('');
  const { allBoughtProperties } = useSelector((state: any) => state?.builderHomeReducer)
  const onChangeText = (text: string) => setSearchText(text);

  return (
    <SafeAreaView style={styles.container}>
      {!props?.route?.params?.isPropertyTab ? <BrokerHeader title={'Sold Out Property'} navigation={props?.navigation} isBuilder showNotification /> : null}
      <ScrollView bounces={false} style={styles.mainContainer}>
        <SearchView searchText={searchText} filter onChangeText={onChangeText} textInputStyle={{ width: vw(225) }}/>
        {!props?.route?.params?.isPropertyTab ? <View style={styles.addedView}><Text style={styles.addedText}>Sold Out Property </Text></View> : null}

        {allBoughtProperties?.map((item: any) => {
          return (
            <SoldOutPropertyComp
              navigation={props.navigation}
              property={item?.propertyId}
              title={item?.propertyId?.name}
              subTitle={item?.propertyId?.location}
              images={item?.propertyId?.thumbnail ? item?.propertyId?.thumbnail : "https://images.unsplash.com/photo-1565402170291-8491f14678db?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1417&q=80"}
              unitType={item?.unitType}
              unitNumber={item?.unitNumber}
              sellingPrice={item?.sellingPrice}
              clientName={item?.customerId.clientName}
              brokerID={item?.brokerId?._id}
              sellingDate={common.formatUTCDate(item?.createdAt)}
            />
          );
        })}

      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    paddingHorizontal: vw(12.6),
  },
  addedView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(30),
    marginHorizontal: vw(15),
    alignItems: 'center',
  },
  addedText: {
    color: colors.black,
    fontSize: normalize(14),
    fontWeight: '700',
    lineHeight: vh(16),
    fontFamily: fonts.BAHNSCHRIFT
  },
  viewAllText: {
    color: colors.customRed,
    fontSize: normalize(10),
    fontWeight: '700',
    lineHeight: vh(14),
    fontFamily: fonts.BAHNSCHRIFT
  },
});