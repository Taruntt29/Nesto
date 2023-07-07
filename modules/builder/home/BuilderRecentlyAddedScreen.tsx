import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import colors from '@nestoHub/utils/colors';
import { vw, vh, normalize } from '@nestoHub/utils/dimensions';
import { SearchView } from '@nestoHub/components/SearchView';
import PropertyCardDataComp from '@nestoHub/components/PropertyCardDataComp';
import fonts from '@nestoHub/utils/fonts';
import { useSelector } from 'react-redux';
import common from '@nestoHub/utils/common';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';


interface Props {
  title: string;
  onPressBack: any;
  navigation: any;
  route: any
}

export default function BuilderRecentlyAddedScreen(props: Props) {
  const { allProperties } = useSelector((state: any) => state?.builderHomeReducer)
  const [searchText, setSearchText] = useState<string>('');

  const onChangeText = (text: string) => setSearchText(text);
  return (
    <SafeAreaView style={styles.container}>
      {!props?.route?.params?.isPropertyTab ? <BrokerHeader title={"Recently Added"} navigation={props?.navigation} isBuilder showNotification /> : null}
      <ScrollView bounces={false} style={styles.mainContainer}>
        <SearchView searchText={searchText} filter onChangeText={onChangeText} textInputStyle={{ width: vw(225) }}/>
        {!props?.route?.params?.isPropertyTab ? <View style={styles.addedView}><Text style={styles.addedText}>Recently Added</Text></View> : null}
        {allProperties?.map((item: any) => {
          return (
            <PropertyCardDataComp
              property={item}
              navigation={props.navigation}
              listingDate={common.formatUTCDate(item?.createdAt)}
              images={item?.images}
              title={item?.name}
              subTitle={item?.location}
              availableType={item?.unitType}
              daysLeft={item?.daysLeft}
              gold={item?.gold}
              visits={item?.viewsCount}
              price={`₹ ${item?.minPrice} - ${item?.maxPrice}`}
              discountLabel={`${item?.discountDescription} `}
              visitCount={item?.totalCount} maxPrice={''} />
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