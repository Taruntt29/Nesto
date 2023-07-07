import {StyleSheet, Text, View} from 'react-native';
import React, {memo} from 'react';
import {normalize, vh, vw} from '@nestoHub/utils/dimensions';
import colors from '@nestoHub/utils/colors';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import fonts from '@nestoHub/utils/fonts';

interface Props {
  propertyName: string;
  visitID: string;
  visitDate: string;
  clientName: string;
  unitType: string;
  unitNo: string;
  sellingPrice: string;
  brokerID: string;
  brokerName: string;
  sellingDate: string;
}

const PropertyClaimComp = memo((props: Props) => {
  return (
    <View style={styles.subView}>
      <View style={styles.mainView}>
        <Text style={styles.textMain}>
          Property Name{'\n'}
          <Text style={[styles.textSub, {fontSize: normalize(12)}]}>
            {props?.propertyName}
          </Text>
        </Text>
        <FastImage
          source={localImages.PROPERTY_IMAGE}
          style={styles.propertyImg}
        />
      </View>
      <View style={styles.propertyView}>
        <Text style={styles.textMain}>
          Visit ID{'\n'}
          <Text style={styles.textSub}>{props?.visitID}</Text>
        </Text>
        <Text style={styles.textMain}>
          Visit Date{'\n'}
          <Text style={styles.textSub}>{props?.visitDate}</Text>
        </Text>
        <Text style={styles.textMain}>
          Client Name{'\n'}
          <Text style={styles.textSub}>{props?.clientName}</Text>
        </Text>
      </View>
      <View style={styles.propertyView}>
        <Text style={styles.textMain}>
          Unit Type{'\n'}
          <Text style={styles.textSub}>{props?.unitType}</Text>
        </Text>
        <Text style={styles.textMain}>
          Unit Number{'\n'}
          <Text style={styles.textSub}>{props?.unitNo}</Text>
        </Text>
        <Text style={styles.textMain}>
          Selling Price{'\n'}
          <Text style={styles.textSub}>{props?.sellingPrice}</Text>
        </Text>
      </View>
      <View style={styles.propertyView}>
        <Text style={styles.textMain}>
          Broker ID{'\n'}
          <Text style={styles.textSub}>{props?.brokerID}</Text>
        </Text>
        <Text style={styles.textMain}>
          Broker Name{'\n'}
          <Text style={styles.textSub}>{props?.brokerName}</Text>
        </Text>
        <Text style={styles.textMain}>
          Selling Date{'\n'}
          <Text style={styles.textSub}>{props?.sellingDate}</Text>
        </Text>
      </View>
    </View>
  );
});

export default PropertyClaimComp;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subView: {
    marginTop: vh(15),
    paddingVertical: vh(12),
    paddingHorizontal: vw(12),
    borderRadius: vw(10),
    backgroundColor: colors.gray3,
  },
  propertyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: vh(15),
  },
  textMain: {
    fontSize: normalize(8),
    color: colors.textGrey,
    fontWeight: '400',
    fontFamily:fonts.BAHNSCHRIFT
  },
  textSub: {
    fontSize: normalize(10),
    color: colors.black,
    fontWeight: '400',
    marginTop: vh(5),
    fontFamily:fonts.BAHNSCHRIFT
  },
  propertyImg: {width: vw(21.33), height: vh(21.33)},
});
