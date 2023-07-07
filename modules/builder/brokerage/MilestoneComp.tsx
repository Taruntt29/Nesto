import {View, Text, StyleSheet} from 'react-native';
import React, {useCallback} from 'react';
import {normalize, vh, vw} from '@nestoHub/utils/dimensions';
import colors from '@nestoHub/utils/colors';
import {FlashList} from '@shopify/flash-list';
import localImages from '@nestoHub/utils/localImages';
import FastImage from 'react-native-fast-image';
import fonts from '@nestoHub/utils/fonts';

interface Props {
  milestone: string;
  date: string;
  brokerage: string;
  brokerageAmt: string;
  claimedID: string;
}

const MilestoneComp = (props: Props) => {
  const data = [
    {
      invoiceID: '32245554778',
      invoiceAmt: '₹ 3.94',
      status: 'Pending',
    },
    {
      invoiceID: '32245554778',
      invoiceAmt: '₹ 3.94',
      status: 'Settled',
    },
  ];
  const renderItem = useCallback(({item, index}: any) => {
    return (
      <View style={styles.invoiceView}>
        <Text style={styles.invoiceIDText}>{item?.invoiceID}</Text>
        <Text style={styles.invoiceIDText}>{item?.invoiceAmt}</Text>
        <View
          style={[
            styles.statusView,
            {
              backgroundColor:
                item?.status === 'Pending'
                  ? colors.lightRed
                  : colors.lightGreen,
              borderColor:
                item?.status === 'Pending'
                  ? colors.customRed
                  : colors.customGreen,
            },
          ]}>
          <Text style={styles.statusText}>{item?.status}</Text>
        </View>
        <View style={{flex: 0.25}}>
          <FastImage source={localImages.INVOICE_PDF} style={styles.pdfImg} />
        </View>
      </View>
    );
  }, []);
  const keyExtractor = useCallback(
    (item: any, index: any) => index?.toString(),
    [],
  );
  const ListHeaderComponent = useCallback(() => {
    return (
      <View style={styles.invoiceView}>
        <Text style={styles.invoiceText}>Invoice ID</Text>
        <Text style={styles.invoiceText}>Invoice amount</Text>
        <Text style={styles.invoiceText}>Status</Text>
        <Text style={styles.invoiceText}>View Invoice</Text>
      </View>
    );
  }, []);
  return (
    <View style={styles.mainView}>
      <View style={styles.milestoneView}>
        <Text style={styles.milestoneText}>{props?.milestone}</Text>
        <Text style={styles.dateText}>{props?.date}</Text>
      </View>
      <View style={[styles.milestoneView, {marginTop: vh(13)}]}>
        <Text style={styles.subText}>
          Brokerage % {'\n'}
          <Text style={styles.mainText}>{props?.brokerage}</Text>
        </Text>
        <Text style={styles.subText}>
          Brokerage Amount {'\n'}
          <Text style={styles.mainText}>{props?.brokerageAmt}</Text>
        </Text>
        <Text style={styles.subText}>
          Claimed ID {'\n'}
          <Text style={styles.mainText}>{props?.claimedID}</Text>
        </Text>
      </View>
      <View style={styles.flatView}>
        <FlashList
          data={data}
          estimatedItemSize={50}
          renderItem={renderItem}
          bounces={false}
          keyExtractor={keyExtractor}
          removeClippedSubviews={false}
          ListHeaderComponent={ListHeaderComponent}
        />
      </View>
    </View>
  );
};

export default MilestoneComp;

const styles = StyleSheet.create({
  mainView: {
    borderRadius: vw(10),
    marginTop: vh(17),
    paddingHorizontal: vw(14),
    paddingVertical: vh(12),
    shadowColor: colors.gray2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: vw(2),
    elevation: 5,
    backgroundColor: colors.white,
    borderColor: colors.gray2,
  },
  milestoneView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  milestoneText: {
    fontSize: normalize(14),
    fontWeight: '600',
    color: colors.black,
    fontFamily:fonts.BAHNSCHRIFT
  },
  dateText: {
    color: colors.textGrey,
    fontSize: normalize(10),
    fontWeight: '400',
    fontFamily:fonts.BAHNSCHRIFT
  },
  subText: {
    color: colors.textGrey,
    fontSize: normalize(8),
    fontWeight: '400',
    fontFamily:fonts.BAHNSCHRIFT
  },
  mainText: {
    color: colors.black,
    fontSize: normalize(10),
    fontWeight: '400',
    marginTop: vh(4),
    fontFamily:fonts.BAHNSCHRIFT
  },
  pdfImg: {
    width: vw(17),
    height: vh(21),
    alignSelf: 'center',
  },
  flatView: {
    borderWidth: 1,
    borderRadius: vw(10),
    marginTop: vh(15),
    paddingHorizontal: vw(15),
    borderColor: colors.borderColor,
  },
  invoiceView: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginTop: vh(20),
    borderBottomWidth: 1,
    paddingBottom: vh(14),
    borderColor: colors.borderColor,
  },
  invoiceIDText: {
    flex: 0.25,
    fontSize: vw(10),
    fontWeight: '400',
    color: colors.textGrey,
    fontFamily:fonts.BAHNSCHRIFT
  },
  statusView: {
    flex: 0.25,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: vw(63),
    paddingVertical: vh(4),
  },
  statusText: {
    color: colors.black,
    fontWeight: '400',
    fontSize: vw(8),
    fontFamily:fonts.BAHNSCHRIFT
  },
  invoiceText: {
    flex: 0.25,
    color: colors.black,
    fontSize: vw(10),
    fontWeight: '600',
    fontFamily:fonts.BAHNSCHRIFT
  },
});
