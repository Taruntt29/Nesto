import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState, useEffect } from 'react';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import { ProfileUserHeader } from '@nestoHub/components/ProfileUserHeader';
import localImages from '@nestoHub/utils/localImages';
import FastImage from 'react-native-fast-image';
import fonts from '@nestoHub/utils/fonts';
import screenNames from '@nestoHub/utils/screenNames';
import { CustomActivityModal } from '@nestoHub/components/CustomActivityModal';
import { CustomButton } from '@nestoHub/components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { clearReducerOnLogout, getBuilderDetails, updateLoginModuleType, updateLoginStatus } from '@nestoHub/actions';

interface Props {
  navigation: any;
  route: any;
}

export default function BuilderProfileScreen(props: Props) {
  const { _id, name, profilePictureUrl } = useSelector((state: any) => state?.authReducer)
  const dispatch: any = useDispatch();

  const listData = [
    {
      icon: localImages.BUILDER_PERSONAL_DETAIL,
      title: 'Personal Details',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BUILDER_PERSONAL_DETAILS);
      },
    },
    {
      icon: localImages.BUILDER_TRANSACTIONS,
      title: 'Transactions',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BUILDER_TRANSACTIONS);
      },
    },
    {
      icon: localImages.BUILDER_MANAGE_ROLES,
      title: 'Manage Roles',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BUILDER_MANAGE_ROLES);
      },
    },
    {
      icon: localImages.BUILDER_PAST_PROPERTIES,
      title: 'Past Properties',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BUILDER_PAST_PROPERTIES);
      },
    },
    {
      icon: localImages.BUILDER_T_AND_C,
      title: 'Terms & Conditions',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BUILDER_T_AND_C);
      },
    },
    {
      icon: localImages.BUILDER_SUPPORT,
      title: 'Support',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BUILDER_SUPPORT);
      },
    },
    {
      icon: localImages.BUILDER_RAISE_QUERY,
      title: 'Raise Query',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BUILDER_RAISE_QUERY);
      },
    },
    {
      icon: localImages.SIGN_OUT_OPTION,
      title: 'Sign Out',
      onPress: () => {
        dispatch(clearReducerOnLogout())
      },
    },
  ];

  useEffect(() => {
    let payload = {
      id: _id,
    };
    dispatch(getBuilderDetails(payload, (data: any) => { }));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <BrokerHeader title={'Profile'} navigation={props?.navigation} isBuilder showNotification />
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <ProfileUserHeader name={name} id={_id} />
        <View style={styles.optionView}>
          {listData?.map((item: any) => {
            return (
              <TouchableOpacity
                style={styles.optionCard}
                onPress={item?.onPress}
                activeOpacity={0.8}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={styles.imageHolder}>
                    <FastImage
                      source={item?.icon}
                      style={{ width: vw(22), height: vh(22) }}
                      resizeMode={'contain'}
                    />
                  </View>
                  <Text style={styles.optionText}>{item?.title ?? ''}</Text>
                </View>
                <FastImage
                  source={localImages?.RIGHT_ARROW}
                  style={{ width: vw(8), height: vh(12), marginRight: vw(5) }}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            );
          })}
        </View>
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
    paddingBottom: vh(50),
  },
  optionView: {
    paddingHorizontal: vw(5),
    marginTop: vh(10),
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: vh(26),
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
    marginRight: vw(12),
  },
  optionText: {
    fontWeight: '400',
    fontSize: vw(16),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors.black,
  },
  referModalView: {
    alignItems: 'center',
  },
  referText: {
    fontWeight: '600',
    fontSize: vw(20),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors.black,
  },
  referImg: {
    width: vw(216),
    height: vh(160),
    alignSelf: 'center',
    marginTop: vh(3.6),
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
    marginTop: vh(17.6),
  },
  referCode: {
    fontWeight: '400',
    fontSize: vw(12),
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors.customBlue,
    marginRight: vw(16.2),
  },
  copy: {
    width: vw(16),
    height: vh(16),
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
    marginLeft: vw(10.6),
  },
});
