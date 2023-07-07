import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { vh, vw } from '@nestoHub/utils/dimensions'
import colors from '@nestoHub/utils/colors'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import FastImage from 'react-native-fast-image'
import { BrokerPropertyHorizontalCard } from '@nestoHub/components/BrokerPropertyHorizontalCard'
import { CustomButton } from '@nestoHub/components/CustomButton'
import fonts from '@nestoHub/utils/fonts'
import { CustomActivityModal } from '@nestoHub/components/CustomActivityModal'
import { BrokerBookVisit } from '@nestoHub/components/BrokerBookVisit'
import localImages from '@nestoHub/utils/localImages'

interface Props {
  navigation: any;
  route: any;
}

export default function BrokerFloorPlanDetailScreen(props: Props) {
  const { floorPlansData, propertyData } = props?.route?.params

  const [isBrokerVisitVisible, setIsBrokerVisitVisible] = useState<boolean>(false)
  const [isSwitchOpen, setIsSwitchOpen] = useState<boolean>(false)

  const onPressBookVisit = () => setIsBrokerVisitVisible(true)

  const renderBrokerVisitModalContent = useCallback(() => {
    return (
      <BrokerBookVisit
        propertyName={propertyData?.name ?? ''}
        propertyId={propertyData?._id ?? ''}
        builderId={propertyData?.builderId ?? ''}
        navigation={props?.navigation}
        onRequestClose={() => setIsBrokerVisitVisible(false)}
      />
    )
  }, [])

  const onPressSwitch = () => setIsSwitchOpen(!isSwitchOpen)

  return (
    <SafeAreaView style={styles.container}>
      <BrokerHeader title={`${floorPlansData?.unitType} Apartment`} showEye showNotification navigation={props?.navigation} />
      <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
        <View style={styles?.imgHolder}>
          <FastImage source={{ uri: floorPlansData?.floorPlanImageUrl ?? '' }} style={{ width: '100%', height: '100%', borderRadius: vw(10) }} />
        </View>
        <View style={styles.horizontalView}>
          <Text style={styles.text1}>Super Built-Up Area</Text>
          <Text style={styles.text1}>Price</Text>
        </View>
        <View style={styles.horizontalView}>
          <Text style={styles.text2}>{floorPlansData?.areaSquareFeet}.</Text>
          <Text style={styles.text2}>{floorPlansData?.price} <Text style={{ ...styles.text2, fontWeight: '400', color: colors.gray2 }}>({floorPlansData?.onesqft})</Text></Text>
        </View>
        <View style={styles.horizontalView}>
          <Text style={styles.text3}>{floorPlansData?.areaSquareMeter}</Text>
          <Text style={styles.text3}>+Govt. Charges</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(32) }}>
          <Text style={{ ...styles.heading, marginTop: vh(0) }}>Specifications</Text>
          <TouchableOpacity style={isSwitchOpen ? { ...styles?.switchBtn, borderColor: colors.customBlue, backgroundColor: colors.customBlue } : styles?.switchBtn} onPress={onPressSwitch} activeOpacity={0.8}>
            {!isSwitchOpen ? <View style={styles.switchCircle} /> : null}
            <Text style={isSwitchOpen ? { ...styles.switchText, color: colors.white } : { ...styles.switchText, marginLeft: vw(1) }}>{isSwitchOpen ? 'Feet' : 'Meter'}</Text>
            {isSwitchOpen ? <View style={{ ...styles.switchCircle, backgroundColor: colors?.white }} /> : null}
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          {
            floorPlansData?.specifications?.map((item: any) => {
              return (
                <View style={styles.specCard}>
                  <Text style={styles.specCardText}>{item?.name}</Text>
                  <Text style={{ ...styles.specCardText, marginTop: vh(3) }}>{`${item?.length} × ${item?.breadth}`}</Text>
                </View>
              )
            })
          }
        </View>
        {
          floorPlansData?.furnishingDetails?.length ?
            <BrokerPropertyHorizontalCard
              title='Furnishing Details'
              itemList={floorPlansData?.furnishingDetails?.map((item: any) => ({
                name: item,
                icon: localImages?.SCALE
              }))}
              iconStyle={styles?.amenitiesIcon}
              staticIcon
              viewAll
            /> : null
        }
        <CustomButton title='Book Visit' onPressCustomButton={onPressBookVisit} />
      </ScrollView>
      <CustomActivityModal
        renderModalContent={renderBrokerVisitModalContent}
        isVisible={isBrokerVisitVisible}
        setIsVisible={(val: boolean) => setIsBrokerVisitVisible(val)}
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
  imgHolder: {
    height: vh(320),
    padding: vw(10),
    borderRadius: vw(10),
    marginTop: vh(30),
    backgroundColor: colors.white,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: vw(2),
    elevation: 4,
  },
  horizontalView: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between'
  },
  amenitiesIcon: {
    width: vw(16),
    height: vh(16)
  },
  heading: {
    fontWeight: '700',
    fontSize: vw(14),
    color: colors?.black,
    fontFamily: fonts?.BAHNSCHRIFT,
    marginTop: vh(32)
  },
  text1: {
    fontWeight: '400',
    fontSize: vw(12),
    color: colors?.gray2,
    fontFamily: fonts?.BAHNSCHRIFT,
    marginTop: vh(10)
  },
  text2: {
    fontWeight: '700',
    fontSize: vw(16),
    color: colors?.black,
    fontFamily: fonts?.BAHNSCHRIFT,
    marginTop: vh(6.5)
  },
  text3: {
    fontWeight: '400',
    fontSize: vw(10),
    color: colors?.customBlue,
    fontFamily: fonts?.BAHNSCHRIFT,
    marginTop: vh(10)
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  specCard: {
    borderRadius: vw(100),
    borderWidth: vw(0.5),
    borderColor: colors.gray5,
    paddingVertical: vh(4.5),
    width: vw(101),
    alignItems: 'center',
    marginTop: vh(15)
  },
  specCardText: {
    fontWeight: '300',
    fontSize: vw(10),
    color: colors?.black,
    fontFamily: fonts?.BAHNSCHRIFT,
  },
  switchBtn: {
    width: vw(50),
    marginRight: vw(5),
    borderRadius: vw(100),
    alignItems: "center",
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: vw(6),
    paddingVertical: vh(4.5),

    borderWidth: vw(1),
    borderColor: colors.gray5,
  },
  switchCircle: {
    width: vw(10),
    height: vw(10),
    borderRadius: vw(100),
    backgroundColor: colors.gray5,
  },
  switchText: {
    fontWeight: '400',
    fontSize: vw(10),
    fontFamily: fonts?.BAHNSCHRIFT,
    color: colors.gray5
  },
})