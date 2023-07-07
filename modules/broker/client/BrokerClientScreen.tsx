import { BackHandler, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { SearchView } from '@nestoHub/components/SearchView';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import fonts from '@nestoHub/utils/fonts';
import { FlashList } from '@shopify/flash-list';
import screenNames from '@nestoHub/utils/screenNames';
import { BrokerClientCard } from '@nestoHub/components/BrokerClientCard';
import { dispatch } from '@nestoHub/utils/navigationService';
import { getAllCustomers } from '@nestoHub/actions';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  navigation: any;
  route: any;
}

export default function BrokerClientScreen(props: Props) {

  const dispatch: any = useDispatch()

  const { _id } = useSelector((state: any) => state?.authReducer)

  const [searchText, setSearchText] = useState<string>('')
  const [clientsData, setClientsData] = useState<any>([])

  useEffect(() => {
    let payload = {
      brokerId: _id
    }
    dispatch(getAllCustomers(payload, (data: any) => {
      setClientsData(data?.data)
    }))
  }, [])


  const onChangeText = (text: string) => setSearchText(text)

  const renderItem = useCallback(({ item }: any) => {

    let clientOject = {
      recentRequirement: item?.unitType,
      minPrice: item?.minPrice,
      maxPrice: item?.maxPrice,
      preferedLocation: item?.preferedLocation,
      phoneNumber: item?.phoneNumber,
      clientName: item?.clientName,
      email: item?.email,
      clientId: item?._id,
      alternatePhoneNumber: item?.alternatePhoneNumber
    }

    const onPressVisitSummary = () => {
      props?.navigation?.navigate(screenNames?.BROKER_REQUIREMENT_DETAIL_SCREEN, { ...clientOject })
    }

    return (
      <BrokerClientCard
        clientName={item?.clientName}
        phoneNumber={item?.phoneNumber}
        recentRequirement={item?.unitType}
        minPrice={item?.minPrice}
        maxPrice={item?.maxPrice}
        preferedLocation={item?.preferredLocation}
        recentUpdatedVisit={`${item?.latestVisit?.propertyName} | ${item?.latestVisit?.date}`}
        clientId={item?._id}
        email={item?.email}
        alternatePhoneNumber={item?.alternatePhoneNumber}
        navigation={props?.navigation}
        onPressVisitSummary={onPressVisitSummary}
        status={item?.latestVisit?.visitStatus}
      />
    )
  }, [props])

  const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [props])

  return (
    <SafeAreaView style={styles.container}>
      <BrokerHeader title={'Client Management'} navigation={props?.navigation} showNotification />
      <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
        <SearchView searchText={searchText} onChangeText={onChangeText} speechToText filter />
        <FlashList
          estimatedItemSize={50}
          data={clientsData ?? []}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          removeClippedSubviews={false}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingBottom: vh(10) }}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    paddingHorizontal: vw(12.6),
    paddingBottom: vh(50)
  },

})