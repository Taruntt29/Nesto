import {
  Alert,
  BackHandler,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import localImages from '@nestoHub/utils/localImages';
import FastImage from 'react-native-fast-image';
import { SearchView } from '@nestoHub/components/SearchView';
import { ImageCard } from '@nestoHub/components/ImageCard';
import screenNames from '@nestoHub/utils/screenNames';
import { BuilderStats } from '@nestoHub/components/BuilderStats';
import SoldOutPropertyComp from '@nestoHub/components/SoldOutPropertyComp';
import fonts from '@nestoHub/utils/fonts';
import PropertyCardDataComp from '@nestoHub/components/PropertyCardDataComp';
import PackagePlanComp from '@nestoHub/components/PackagePlanComp';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBanners, getAllBoughtPropertiesForBuilder, getAllCurrentPackage, getAllPropertiesForBuilder, getAllPropertyCategory, getPendingInvoice, getPropertyAnalytics } from '@nestoHub/actions';
import common from '@nestoHub/utils/common';
import { BuilderFloatingActionButton } from '@nestoHub/components/BuilderFloatingButton';
import { CustomMultiSelectDropdown } from '@nestoHub/components/CustomMultiSelectDropdown';
import { CustomButton } from '@nestoHub/components/CustomButton';
import { CustomActivityModal } from '@nestoHub/components/CustomActivityModal';
import { useIsFocused } from '@react-navigation/native';
import RNExitApp from 'react-native-exit-app';
interface Props {
  navigation: any;
  route: any;
}

export default function BuilderHomeScreen(props: Props) {
  const dispatch: any = useDispatch()
  const isFocused = useIsFocused()

  const topButton = [
    {
      icon: localImages.NOTIFICATION,
      onPress: () => {
        props?.navigation?.navigate(screenNames?.BUILDER_NOTIFICATION_SCREEN);
      },
    },
  ];

  const { allProperties, allBoughtProperties, allBanners, allCurrentPackage } = useSelector((state: any) => state?.builderHomeReducer)
  const { _id } = useSelector((state: any) => state?.authReducer)
  const [searchText, setSearchText] = useState<string>('');
  const [pendingInvoiceData, setPendingInvoiceData] = useState<any>([])
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [propertyAnalytics, setPropertyAnalytics] = useState<any>([]);
  const [selectPropertiesData, setSelectPropertiesData] = useState<any>({ count: '', data: [] })

  useEffect(() => {
    if (isFocused) {
      const backHandler = BackHandler.addEventListener("hardwareBackPress", handleBackButton);
      return () => backHandler.remove();
    }
  }, [isFocused]);

  useEffect(() => {
    if (_id?.length) {
      let payload = {
        id: _id
      }

      dispatch(getAllPropertiesForBuilder({}, (data: any) => { }))
      dispatch(getAllBoughtPropertiesForBuilder({}, (data: any) => { }))
      dispatch(getAllBanners({}, (data: any) => { }))
      dispatch(getAllPropertyCategory({}, (data: any) => { }))
      dispatch(getPropertyAnalytics(payload, (data: any) => {
        let propertyAnalytics = [
          {
            count: data?.data?.listedProperties.toString(),
            title: 'Listed Properties',
          },
          {
            count: data?.data?.listedProperties.toString(),
            title: 'Sold Out Units',
          },
          {
            count: data?.data?.listedProperties.toString(),
            title: 'Total\nVisits',
          },
          {
            count: data?.data?.listedProperties.toString(),
            title: 'Average time to sell',
          }
        ]
        setPropertyAnalytics(propertyAnalytics)
      }))
      dispatch(getPendingInvoice(payload, (data: any) => {
        let PendingInvoicesList = [
          {
            count: data?.data?.pendingInvoice?.toString(),
            title: 'Pending Invoice',
          },
          {
            count: data?.data?.totalAmount?.toString(),
            title: 'Pending Amount',
          },
          {
            count: data?.data?.pendingDays?.toString(),
            title: 'Pending Since',
          },
          {
            count: data?.data?.averagePayoutTime?.toString(),
            title: 'Average Payout Time',
          },
        ];
        setPendingInvoiceData(PendingInvoicesList)
      }))
      dispatch(getAllCurrentPackage({ builderId: _id }, (data: any) => { }))
    }
  }, [_id])

  const handleBackButton = () => {
    Alert.alert('Hold on!', 'Are you sure you want to exit NestoHub?', [
      { text: 'No', onPress: undefined, style: "cancel" },
      { text: 'Yes', onPress: () => RNExitApp.exitApp() }
    ]);
    return true;
  };

  const onPress = () => {
    props?.navigation.navigate(screenNames?.BUILDER_SOLDOUT_PROPERTY_SCREEN);
  };

  const onPressBtn = () => {
    props?.navigation.navigate(screenNames?.BUILDER_RECENTLY_ADDED_SCREEN);
  };

  const onChangeText = (text: string) => setSearchText(text);

  const onPressRenew = (item: any) => {
    setSelectPropertiesData({ count: item?.userSelectProperties ?? 0, data: item?.selectProperties ?? [] })
    setIsVisible(true)
  }

  const renderModalContent = useCallback(() => {
    return (
      <View style={styles.referModalView}>
        <Text style={styles.selectPropertyText}>Select Properties</Text>
        <Text style={styles.choosePropertyText}>Choose {selectPropertiesData?.count?.toString() ?? '0'} Properties</Text>
        <CustomMultiSelectDropdown
          placeholder={'Choose Properties'}
          optionsArray={selectPropertiesData?.data?.map((item: any) => item?.name) ?? []}
          onChangeValue={(value: any) => { }}
          maxSelectionLimit={selectPropertiesData?.count}
        />
        <CustomButton
          title="Buy "
          onPressCustomButton={() => {
            setIsVisible(false);
          }}
        />
      </View>
    );
  }, [selectPropertiesData]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        showsVerticalScrollIndicator={false}>
        <View style={styles.headingView}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage
              source={localImages?.LOGO}
              style={styles.logo}
              resizeMode={'contain'}
            />
          </View>
          <View style={styles.buttonView}>
            {topButton?.map((item: any) => {
              return (
                <TouchableOpacity
                  style={styles.topButton}
                  onPress={item?.onPress}>
                  <FastImage
                    source={item?.icon}
                    style={styles.topIcon}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <SearchView
          searchText={searchText}
          filter
          onChangeText={onChangeText}
          speechToText
        />
        <ImageCard title={allBanners?.[0]?.title} subTitle={allBanners?.[0]?.description} image={allBanners?.[0]?.image} />
        {
          propertyAnalytics ?
            <BuilderStats
              title={'Property Analytics'}
              dataList={propertyAnalytics}
              navigation={props?.navigation}
              type='home_analytics'
            /> : null
        }
        <View style={styles.cardHeadingView}>
          <Text style={styles.titleText}>Recently Sold Out Property</Text>
          <TouchableOpacity onPress={onPress}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {allBoughtProperties?.slice(0, 3)?.map((item: any) => {
          return (
            <SoldOutPropertyComp
              navigation={props.navigation}
              property={item?.propertyId}
              title={item?.propertyId?.name}
              subTitle={item?.propertyId?.location}
              images={item?.propertyId?.thumbnail}
              unitType={item?.unitType}
              unitNumber={item?.unitNumber}
              sellingPrice={item?.sellingPrice}
              clientName={item?.customerId?.clientName}
              brokerID={item?.brokerId?._id}
              sellingDate={common?.formatUTCDate(item?.createdAt)}
            />
          );
        })}
        <View style={styles.cardHeadingView}>
          <Text style={styles.titleText}>Recently Added</Text>
          <TouchableOpacity onPress={onPressBtn}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        {allProperties?.slice(0, 3)?.map((item: any) => {
          return (
            <PropertyCardDataComp
              navigation={props.navigation}
              property={item}
              images={item?.images ?? []}
              listingDate={common?.formatUTCDate(item?.createdAt)}
              title={item?.name}
              subTitle={item?.location}
              availableType={item?.unitType ?? ['2BHK', '3BHK', '4BHK']}
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
                props?.navigation.navigate(
                  screenNames.BUILDER_PROPERTY_EDIT_REQUEST, { propertyData: item ?? {} }
                );
              }}
            />
          );
        })}
        {allCurrentPackage?.length ? <Text style={styles.titleText}>Recent Package</Text> : null}
        {[allCurrentPackage?.[0]] ?? []?.map((item: any) => {
          return (
            <PackagePlanComp
              planName={item?.planId?.name}
              plan={item?.planId?.costPerMonth}
              backgroundColor={item?.planId?.colour}
              daysLeft={item?.planId?.planValidityInDays}
              visitsLeft={item?.planId?.numberOfVisit}
              description={item?.planId?.description}
              properties={item?.selectProperties?.map((ele: any) => ele?.name) ?? ['lorem ipsum', 'lorem ipsum', 'hgvhvhjb']}
              onPressRenew={() => onPressRenew(item)}
              onPressUpgrade={() => props?.navigation?.navigate(screenNames?.BUILDER_SUBSCRIPTION_NAVIGATOR)}
            />
          );
        })}
        <BuilderStats
          title={'Pending Invoices'}
          dataList={pendingInvoiceData}
          type='home_invoice'
          navigation={props?.navigation}
        />
      </ScrollView>
      <CustomActivityModal
        renderModalContent={renderModalContent}
        isVisible={isVisible}
        setIsVisible={(val: boolean) => setIsVisible(val)}
      />
      <BuilderFloatingActionButton navigation={props?.navigation} />
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
    paddingTop: Platform?.OS === 'android' ? vh(20) : undefined,
  },
  heading: {
    fontSize: vw(24),
    fontWeight: 'bold',
    fontFamily: fonts?.BAHNSCHRIFT,
    color: colors.customBlue,
  },
  headingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topButton: {
    borderWidth: vw(0.8),
    borderRadius: vw(50),
    padding: vw(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.gray6,
    marginHorizontal: vw(4.42),
  },
  topIcon: {
    width: vw(13.8),
    height: vh(13.8),
  },
  logo: {
    width: vw(140),
    height: vh(25),
  },
  titleText: {
    fontSize: vw(16),
    fontWeight: '700',
    color: colors?.black,
    fontFamily: fonts?.BAHNSCHRIFT,
    marginTop: vh(25),
  },
  viewAllText: {
    fontSize: vw(10),
    fontWeight: '700',
    color: colors.customRed,
    fontFamily: fonts?.BAHNSCHRIFT,
    marginTop: vh(25),
  },
  cardHeadingView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  referModalView: {
    width: '100%',
    flex: 1,
  },
  selectPropertyText: {
    color: colors.black,
    textAlign: 'center',
    fontSize: vw(20),
    fontFamily: fonts.BAHNSCHRIFT,
    fontWeight: '600',
  },
  choosePropertyText: {
    color: colors.black,
    fontSize: vw(12),
    fontWeight: '400',
    marginTop: vh(15),
    marginBottom: vh(-15),
    fontFamily: fonts.BAHNSCHRIFT,
  },
});
