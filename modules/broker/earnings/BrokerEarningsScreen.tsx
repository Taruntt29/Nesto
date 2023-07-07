import { BackHandler, Platform, SafeAreaView, StyleSheet, Text, UIManager, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import fonts from '@nestoHub/utils/fonts';
import { SearchView } from '@nestoHub/components/SearchView';
import { EarningCard } from '@nestoHub/components/EarningCard';
import { CustomButton } from '@nestoHub/components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrokerEarnings } from '@nestoHub/actions';

interface Props {
  navigation: any;
  route: any;
}

export default function BrokerEarningsScreen(props: Props) {
  const dispatch: any = useDispatch()

  const { _id } = useSelector((state: any) => state?.authReducer)

  const [searchText, setSearchText] = useState<string>('')
  const [earningsData, setEarningsData] = useState<any>({})

  useEffect(() => {
    if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental)
      UIManager.setLayoutAnimationEnabledExperimental(true)

    let payload = {
      brokerId: _id
    }
    dispatch(getAllBrokerEarnings(payload, (data: any) => {
      setEarningsData(data?.data)
    }))
  }, [])

  const onChangeText = (text: string) => setSearchText(text)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.earningsHeaderView}>
        <BrokerHeader title={'My Earnings'} navigation={props?.navigation} showNotification />
        <FastImage source={localImages?.WALLET} style={styles.wallet} />
        <Text style={styles.heading}>Additional Earning With Nesto </Text>
        <Text style={styles.headingPrice}>₹ {earningsData?.additionalEarnings?.toFixed(2)}</Text>
      </View>
      <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
        <SearchView searchText={searchText} onChangeText={onChangeText} filter textInputStyle={{ width: vw(225) }} />
        {
          earningsData?.earnings?.map((item: any, index: any) => {
            return (
              <EarningCard item={item} index={index} navigation={props?.navigation} />
            )
          })
        }
        <CustomButton title='Download PDF' onPressCustomButton={() => { }} />
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
  earningsHeaderView: {
    paddingHorizontal: vw(12.6),
    backgroundColor: colors.lightestBlue,
    borderBottomLeftRadius: vw(36),
    borderBottomRightRadius: vw(36)
  },
  wallet: {
    width: vw(44.5),
    height: vw(44.5),
    alignSelf: 'center',
    marginTop: vh(30),
  },
  heading: {
    fontWeight: '400',
    fontSize: vw(14),
    marginTop: vh(13),
    fontFamily: fonts?.BAHNSCHRIFT,
    textAlign: "center",
    color: colors.black
  },
  headingPrice: {
    fontWeight: '700',
    fontSize: vw(32),
    marginTop: vh(15),
    fontFamily: fonts?.BAHNSCHRIFT,
    textAlign: "center",
    color: colors.black,
    marginBottom: vh(35)
  },

})