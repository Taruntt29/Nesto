import { Alert, BackHandler, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '@nestoHub/utils/colors'
import { vh, vw } from '@nestoHub/utils/dimensions'
import localImages from '@nestoHub/utils/localImages'
import FastImage from 'react-native-fast-image'
import { SearchView } from '@nestoHub/components/SearchView'
import { ImageCard } from '@nestoHub/components/ImageCard'
import { CategoriesCard } from '@nestoHub/components/CategoriesCard'
import { PropertySwipper } from '@nestoHub/components/PropertySwipper'
import { FewPropertyListing } from '@nestoHub/components/FewPropertyListing'
import screenNames from '@nestoHub/utils/screenNames'
import RNExitApp from 'react-native-exit-app'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBanners, getAllLocationsAndCountryCodes, getAllPromotionBanners, getAllPropertiesForBroker, getAllPropertyCategory, getAllVisitAlert, updateBrokerEye } from '@nestoHub/actions'

interface Props {
  navigation: any;
  route: any;
}

export default function BrokerHomeScreen(props: Props) {
  const isFocused = useIsFocused()
  const dispatch: any = useDispatch()

  const { isEyeOpen, allPromotedProperties, allProperties, promotionBanners, allBestSellingProperties, allBanners } = useSelector((state: any) => state?.brokerHomeReducer)
  const { countries, preferredLocations } = useSelector((state: any) => state?.masterReducer)
  const { _id } = useSelector((state: any) => state?.authReducer)

  const topButton = [
    {
      icon: localImages.NOTIFICATION,
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BROKER_NOTIFICATION_SCREEN)
      }
    },
    {
      icon: isEyeOpen ? localImages.EYE : localImages?.EYE_CLOSED,
      onPress: () => {
        dispatch(updateBrokerEye(!isEyeOpen ?? false))
      }
    }
  ]

  const [searchText, setSearchText] = useState<string>('')

  useEffect(() => {
    if (isFocused) {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackButton);
      return () => backHandler.remove();
    }
  }, [isFocused]);

  useEffect(() => {
    if (_id?.length) {
      dispatch(updateBrokerEye(true))

      // FOR RECENTLY ADDED PROPERTY
      dispatch(getAllPropertiesForBroker({}, (data: any) => { }))

      // FOR PROMOTED PROPERTY
      dispatch(getAllPropertiesForBroker({ isPromoted: true }, (data: any) => { }))

      // FOR BEST SELLING PROPERTY
      dispatch(getAllPropertiesForBroker({ isBestSelling: true }, (data: any) => { }))

      // FOR BANNERS
      dispatch(getAllBanners({}, (data: any) => { }))

      // FOR PROMOTION BANNERS
      dispatch(getAllPromotionBanners({}, (data: any) => { }))

      // FOR ALL PROMOTED CATEGORY
      dispatch(getAllPropertyCategory({}, (data: any) => { }))

      if (countries === undefined || preferredLocations === undefined) {
        dispatch(getAllLocationsAndCountryCodes({}, (data: any) => { }))
      }

      dispatch(getAllVisitAlert({ brokerId: _id }, (data: any) => { }))
    }
  }, [_id])


  const handleBackButton = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit NestoHub?', [
      { text: 'No', onPress: undefined, style: "cancel" },
      { text: 'Yes', onPress: () => RNExitApp.exitApp() }
    ]);
    return true;
  };

  const onChangeText = (text: string) => setSearchText(text)

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headingView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage source={localImages?.LOGO} style={styles.logo} resizeMode={'contain'} />
          </View>
          <View style={styles.buttonView}>
            {
              topButton?.map((item: any) => {
                return (
                  <TouchableOpacity style={styles.topButton} onPress={item?.onPress}>
                    <FastImage source={item?.icon} style={styles.topIcon} resizeMode='contain' />
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
        <SearchView searchText={searchText} onChangeText={onChangeText} speechToText filter />
        <ImageCard title={allBanners?.[0]?.title} subTitle={allBanners?.[0]?.description} image={allBanners?.[0]?.image} />
        <CategoriesCard navigation={props?.navigation} />
        <PropertySwipper data={promotionBanners ?? []} navigation={props?.navigation} />
        <FewPropertyListing title={'Promoted Property'} data={allPromotedProperties} navigation={props?.navigation} viewAll />
        <ImageCard title={allBanners?.[1]?.title} subTitle={allBanners?.[1]?.description} image={allBanners?.[1]?.image} extraStyle={{ marginTop: vh(18.7) }} />
        <FewPropertyListing title={'Recently Added'} data={allProperties} navigation={props?.navigation} viewAll />
        <FewPropertyListing title={'Best Selling'} data={allBestSellingProperties} navigation={props?.navigation} extraStyle={{ marginTop: vh(10) }} viewAll />
      </ScrollView>
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
    paddingBottom: vh(50),
    paddingTop: Platform?.OS === 'android' ? vh(20) : undefined
  },
  heading: {
    fontSize: vw(24),
    fontWeight: 'bold',
    color: colors.customBlue
  },
  headingView: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: "center",
  },
  topButton: {
    borderWidth: vw(0.8),
    borderRadius: vw(50),
    padding: vw(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.gray6,
    marginHorizontal: vw(4.42)
  },
  topIcon: {
    width: vw(13.8),
    height: vh(13.8)
  },
  logo: {
    width: vw(140),
    height: vh(25),
  }
})