import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import localImages from '@nestoHub/utils/localImages';
import FastImage from 'react-native-fast-image';
import fonts from '@nestoHub/utils/fonts';
import screenNames from '@nestoHub/utils/screenNames';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import { BuilderFloatingActionButton } from '@nestoHub/components/BuilderFloatingButton';

interface Props {
  navigation: any;
}

const BuilderManageRoles = (props: Props) => {
  const Data = [
    {
      title: 'List of Property Managers',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BUILDER_LIST_OF_MANAGER, { title: 'property' });
      },
    },
    {
      title: 'List of Finance Managers',
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BUILDER_LIST_OF_MANAGER, { title: 'finance' });
      },
    },
  ];

  return (
    <SafeAreaView style={styles?.container}>
      <BrokerHeader title={'Manage Roles'} navigation={props?.navigation} isBuilder showNotification />
      <View style={styles?.mainContainer}>
        {
          Data?.map((item: any) => {
            return (
              <TouchableOpacity onPress={item?.onPress} style={styles?.innerView} activeOpacity={0.9}>
                <View style={styles.subView}>
                  <View style={styles?.iconView}><FastImage source={localImages?.BUILDER_MANAGE_ROLES} style={styles?.icon} resizeMode='contain' /></View>
                  <Text style={styles.titleText}>{item?.title}</Text>
                </View>
                <FastImage source={localImages?.RIGHT_ARROW} style={styles?.rightIcon} resizeMode='contain' />
              </TouchableOpacity>
            );
          })
        }
      </View>
      <BuilderFloatingActionButton navigation={props?.navigation} type={'role'} />
    </SafeAreaView>
  );
};

export default BuilderManageRoles;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    paddingHorizontal: vw(12.6),
    paddingBottom: vh(50),
    flex: 0.9
  },
  innerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: vh(50),
    marginHorizontal: vw(10),
  },
  subView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: vw(22),
    height: vh(22),
  },
  rightIcon: {
    width: vw(7.16),
    height: vh(14),
    tintColor: colors.gray2,
  },
  iconView: {
    padding: vw(9),
    borderRadius: vw(10),
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: vw(2),
    elevation: 2,
    backgroundColor: colors.white
  },
  titleText: {
    color: colors.black,
    fontFamily: fonts.BAHNSCHRIFT,
    fontSize: vw(16),
    fontWeight: '400',
    marginLeft: vw(12),
  },
});
