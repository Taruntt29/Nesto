import { BackHandler, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import colors from '@nestoHub/utils/colors'
import { vh, vw } from '@nestoHub/utils/dimensions'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import { ProfileUserHeader } from '@nestoHub/components/ProfileUserHeader'
import localImages from '@nestoHub/utils/localImages'
import FastImage from 'react-native-fast-image'
import fonts from '@nestoHub/utils/fonts'
import screenNames from '@nestoHub/utils/screenNames'
import { CustomActivityModal } from '@nestoHub/components/CustomActivityModal'
import { CustomButton } from '@nestoHub/components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import Share from 'react-native-share';
import { clearReducerOnLogout, getBrokerDetails } from '@nestoHub/actions'

interface Props {
  navigation: any;
  route: any;
}

export default function BrokerProfileScreen(props: Props) {

  const dispatch: any = useDispatch()

  const { _id, name } = useSelector((state: any) => state?.authReducer)
  const { profilePicture, referalCode } = useSelector((state: any) => state?.userReducer)

  const [isVisible, setIsVisible] = useState<boolean>(false)

  const listData = [
    {
      icon: localImages.PERSONAL_DETAILS_OPTION,
      title: 'Personal Details',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BROKER_PERSONAL_DETAILS_SCREEN)
      }
    },
    {
      icon: localImages.PRFERENCES_OPTION,
      title: 'Preferences',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BROKER_PREFERENCES_SCREEN)
      }
    },
    {
      icon: localImages.REFER_EARN_OPTION,
      title: 'Refer & Earn',
      onPress: () => setIsVisible(true)
    },
    {
      icon: localImages.TERMS_CONDITIONS_OPTION,
      title: 'Terms & Conditions',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BROKER_TERMS_AND_CONDITIONS_SCREEN)
      }
    },
    {
      icon: localImages.SUPPORT_OPTION,
      title: 'Support',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BROKER_SUPPORT_SCREEN)
      }
    },
    {
      icon: localImages.RAISE_QUERY_OPTION,
      title: 'Raise Query',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BROKER_RAISE_QUERY_SCREEN)
      }
    },
    {
      icon: localImages.TUTORIAL_OPTION,
      title: 'Tutorial',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BROKER_TUTORIAL_SCREEN)
      }
    },
    {
      icon: localImages.SIGN_OUT_OPTION,
      title: 'Sign Out',
      onPress: () => {
        dispatch(clearReducerOnLogout())
      }
    },
  ]

  useEffect(() => {
    const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackButton);
    return () => backHandler.remove();
  }, []);

  const handleBackButton = () => {
    props?.navigation?.goBack()
    return true;
  };

  useEffect(() => {
    let payload = {
      id: _id
    }
    dispatch(getBrokerDetails(payload, (data: any) => { }))
  }, [])

  const onPressRefer = () => {
    let url = 'https://play.google.com/store/apps/details?id=com.instagram.android'
    let options = {
      title: 'NestoHub',
      message: `Use this referal code ${referalCode?.toUpperCase()} to join NestoHub\n${url}`
    }
    Share.open(options).then((res: any) => console.log('Referal Share:', res)).catch((err: any) => console.log('Error while sharing :', err));
  }


  const renderModalContent = useCallback(() => {
    const DATA = ['Invite your friends to Nesto Hub.', 'Lorem ipsum dolor sit amet, consectetur.', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit']
    return (
      <View style={styles.referModalView}>
        <Text style={styles.referText}>{`Refer & Earn`}</Text>
        <FastImage source={localImages?.REFER_AND_EARN} style={styles.referImg} />
        <TouchableOpacity style={styles.copyView} activeOpacity={0.8}>
          <Text style={styles.referCode}>{referalCode}</Text>
          <FastImage source={localImages?.COPY} style={styles.copy} resizeMode={'contain'} />
        </TouchableOpacity>
        <View style={{ alignSelf: 'center' }}>
          {
            DATA?.map((item: any) => {
              return (
                <View style={styles.referOptionView}>
                  <FastImage source={localImages?.SUCESS} style={styles.copy} resizeMode={'contain'} />
                  <Text style={styles.referOptionText}>{item}</Text>
                </View>
              )
            })
          }
        </View>
        <CustomButton title='Refer' onPressCustomButton={onPressRefer} />
      </View>
    )
  }, [referalCode])

  return (
    <SafeAreaView style={styles.container}>
      <BrokerHeader title={'Profile'} navigation={props?.navigation} showNotification />
      <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
        <ProfileUserHeader name={name} id={_id} />
        <View style={styles.optionView}>
          {
            listData?.map((item: any) => {
              return (
                <TouchableOpacity style={styles.optionCard} onPress={item?.onPress} activeOpacity={0.8}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.imageHolder}>
                      <FastImage source={item?.icon} style={{ width: vw(22), height: vh(22) }} resizeMode={'contain'} />
                    </View>
                    <Text style={styles.optionText}>{item?.title ?? ''}</Text>
                  </View>
                  <FastImage source={localImages?.RIGHT_ARROW} style={{ width: vw(7), height: vh(14) }} resizeMode={'contain'} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </ScrollView>
      <CustomActivityModal
        renderModalContent={renderModalContent}
        isVisible={isVisible}
        setIsVisible={(val: boolean) => setIsVisible(val)}
      />
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
  optionView: {
    paddingHorizontal: vw(5),
    marginTop: vh(10)
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vh(26)
  },
  imageHolder: {
    width: vw(40),
    height: vw(40),
    borderRadius: vw(10),
    borderWidth: vw(0.5),
    borderColor: colors.gray5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: vw(2),
    elevation: 6,
    backgroundColor: colors.white,
    marginRight: vw(12)
  },
  optionText: {
    fontWeight: '400',
    fontSize: vw(16),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors.black
  },
  referModalView: {
    alignItems: 'center'
  },
  referText: {
    fontWeight: '600',
    fontSize: vw(20),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors.black
  },
  referImg: {
    width: vw(216),
    height: vh(160),
    alignSelf: 'center',
    marginTop: vh(3.6)
  },
  copyView: {
    backgroundColor: colors.lightBlue,
    paddingHorizontal: vw(13),
    paddingVertical: vh(9.8),
    borderStyle: 'dotted',
    borderRadius: vw(4),
    borderWidth: vw(1),
    borderColor: colors.customBlue,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vh(17.6)
  },
  referCode: {
    fontWeight: '400',
    fontSize: vw(12),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors.customBlue,
    marginRight: vw(13),
    textTransform: 'uppercase',
  },
  copy: {
    width: vw(16),
    height: vh(16)
  },
  referOptionView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(24.5),
  },
  referOptionText: {
    fontWeight: '400',
    fontSize: vw(12),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors.black,
    marginLeft: vw(10.6)
  }
})