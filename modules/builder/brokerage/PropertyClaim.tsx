import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
} from 'react-native';
import React from 'react';
import colors from '@nestoHub/utils/colors';
import { normalize, vh, vw } from '@nestoHub/utils/dimensions';
import PropertyClaimComp from './PropertyClaimComp';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import MilestoneComp from './MilestoneComp';
import { CustomButton } from '@nestoHub/components/CustomButton';
import fonts from '@nestoHub/utils/fonts';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import screenNames from '@nestoHub/utils/screenNames';

interface Props {
  navigation: any;
}

const PropertyClaim = (props: Props) => {
  const data = [
    {
      propertyName: 'Sky Dandelions Apartment',
      visitID: '12321312',
      visitDate: '20 Nov 2022',
      clientName: 'Lorem Ipsum',
      unitType: '2 BHK',
      unitNo: '324324324',
      sellingPrice: '₹ 3.94 L',
      brokerID: '32232432',
      brokerName: 'Lorem Ipsum',
      sellingDate: '10/12/2022',
    },
  ];
  const milestoneDATA = [
    {
      milestone: 'M1 - 10%',
      date: '12 / 11 / 2022',
      brokerage: '50%',
      brokerageAmt: '₹ 3.94 L',
      claimedID: '234343422',
    },
    {
      milestone: 'M2 - 10%',
      date: '12 / 11 / 2022',
      brokerage: '50%',
      brokerageAmt: '₹ 3.94 L',
      claimedID: '234343422',
    },
    {
      milestone: 'M3 - 10%',
      date: '12 / 11 / 2022',
      brokerage: '50%',
      brokerageAmt: '₹ 3.94 L',
      claimedID: '234343422',
    },
  ];
  const onPressDownloadPdf = () => {
    Alert.alert('Download Pdf');
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView bounces={false} style={styles.mainContainer}>
        <BrokerHeader title={'Property Claim'} navigation={props?.navigation} showNotification isBuilder />
        <View style={styles.subView}>
          <Text style={styles.descriptionText}>Description</Text>
          <Text style={styles.eligibleClaimText}>
            Eligible Claim ID : 1253325271
          </Text>
        </View>
        {data?.map((item: any) => {
          return (
            <PropertyClaimComp
              propertyName={item?.propertyName}
              visitID={item?.visitID}
              visitDate={item?.visitDate}
              clientName={item?.clientName}
              unitType={item?.unitType}
              unitNo={item?.unitNo}
              sellingPrice={item?.sellingPrice}
              brokerID={item?.brokerID}
              brokerName={item?.brokerName}
              sellingDate={item?.sellingDate}
            />
          );
        })}
        <Text style={styles.brokeragePlanView}>Brokerage Plan</Text>
        <View style={styles.brokerageView}>
          <View>
            <Text style={styles.amountText}>₹ 830</Text>
            <Text style={styles.brokeragePercText}>
              *Brokerage Percentage - 5%
            </Text>
          </View>
          <View>
            <Text style={styles.builderFormText}>Builder Form</Text>
            <FastImage source={localImages.INVOICE_PDF} style={styles.pdfImg} />
          </View>
        </View>
        <Text style={styles.milestoneText}>Milestone</Text>
        {milestoneDATA?.map(item => {
          return (
            <MilestoneComp
              milestone={item?.milestone}
              date={item?.date}
              brokerage={item?.brokerage}
              brokerageAmt={item?.brokerageAmt}
              claimedID={item?.claimedID}
            />
          );
        })}
      </ScrollView>
      <CustomButton
        title="Download PDF"
        onPressCustomButton={onPressDownloadPdf}
      />
    </SafeAreaView>
  );
};

export default PropertyClaim;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    paddingHorizontal: vw(12.6),
  },
  subView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(40),
    alignItems: 'center',
  },
  descriptionText: {
    color: colors.black,
    fontWeight: '700',
    fontSize: normalize(14),
    fontFamily: fonts.BAHNSCHRIFT,
  },
  eligibleClaimText: {
    color: colors.textGrey,
    fontWeight: '700',
    fontSize: normalize(10),
    fontFamily: fonts.BAHNSCHRIFT,
  },
  brokeragePlanView: {
    color: colors.black,
    marginTop: vh(21),
    fontSize: normalize(14),
    fontWeight: '700',
  },
  brokerageView: {
    backgroundColor: colors.gray3,
    paddingHorizontal: vw(16),
    paddingVertical: vh(12),
    marginTop: vh(11),
    borderRadius: vw(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pdfImg: {
    width: vw(17),
    height: vh(21),
    marginTop: vh(11),
  },
  amountText: {
    fontSize: normalize(20),
    fontWeight: '700',
    color: colors.black,
    fontFamily: fonts.BAHNSCHRIFT,
  },
  brokeragePercText: {
    color: colors.black,
    fontWeight: '400',
    fontSize: normalize(12),
    marginTop: vh(11),
    fontFamily: fonts.BAHNSCHRIFT,
  },
  builderFormText: {
    color: colors.textGrey,
    fontSize: normalize(8),
    fontWeight: '400',
    fontFamily: fonts.BAHNSCHRIFT,
  },
  milestoneText: {
    color: colors.black,
    fontSize: normalize(14),
    fontWeight: '700',
    marginTop: vh(21),
    fontFamily: fonts.BAHNSCHRIFT,
  },
});
