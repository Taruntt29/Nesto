import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { SearchView } from '@nestoHub/components/SearchView';
import PropertyCardDataComp from '@nestoHub/components/PropertyCardDataComp';
import screenNames from '@nestoHub/utils/screenNames';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import { useDispatch, useSelector } from 'react-redux';
import PastPropertyCardComp from '@nestoHub/components/PastPropertyCardComp';
import common from '@nestoHub/utils/common';
import { getAllPastPropertiesForBuilder } from '@nestoHub/actions';
interface Props {
  navigation: any;
}

const BuilderPastProperties = (props: Props) => {

  const dispatch: any = useDispatch()

  const [allProperties, setAllProperties] = useState<any>([])
  const [searchText, setSearchText] = useState<string>('');

  useEffect(() => {
    dispatch(getAllPastPropertiesForBuilder({ isPropertySold: true }, (data: any) => {
      setAllProperties(data?.data)
    }))
  }, [])


  const onChangeText = (text: string) => setSearchText(text);

  return (
    <SafeAreaView style={styles?.container}>
      <ScrollView bounces={false} style={styles?.mainContainer}>
        <BrokerHeader title={'Past Properties'} navigation={props?.navigation} isBuilder showNotification />
        <SearchView searchText={searchText} onChangeText={onChangeText} filter textInputStyle={{ width: vw(225) }}/>
        {allProperties?.map((item: any) => {
          return (
            <PropertyCardDataComp
              navigation={props.navigation}
              property={item}
              images={[...item?.images]}
              listingDate={common?.formatUTCDate(item?.createdAt)}
              title={item?.name}
              subTitle={item?.location}
              availableType={item?.unitType ?? ['2BHK', '3BHK', '6BHK']}
              gold
              price={`₹ ${item?.minPrice ?? '0'} - ${item?.maxPrice ?? '0'}`}
              discountLabel={`${item?.discountDescription}`}
              daysLeft="12 Days Left "
              visits="12/30"
              visitCount={item?.viewsCount ?? '0'}
              onPress={() => {
                props?.navigation.navigate(
                  screenNames?.BUILDER_VISIT_DETAILS_SCREEN, { propertyId: item?._id }
                );
              }}
              onPressEdit={() => {
                // props?.navigation.navigate(
                //   screenNames.BUILDER_PROPERTY_EDIT_REQUEST
                // );
              }}
              maxPrice={''} />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BuilderPastProperties;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    paddingHorizontal: vw(12.6),
    paddingBottom: vh(50),
  },
});
