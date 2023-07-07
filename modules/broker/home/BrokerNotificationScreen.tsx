import { SafeAreaView, SectionList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { vh, vw } from '@nestoHub/utils/dimensions'
import colors from '@nestoHub/utils/colors'
import FastImage from 'react-native-fast-image'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import { useIsFocused } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { getNotifications } from '@nestoHub/actions'

interface Props {
  navigation: any;
  route: any;
}

const NOTIFICATIONS_DATA = [
  {
    title: 'Today',
    data: [
      {
        img: 'https://unsplash.it/400/400?image=1',
        heading: 'Trending',
        description: 'Your Post is Trending in the hot Section',
        time: '9.56 AM'
      },
      {
        img: 'https://unsplash.it/400/400?image=1',
        heading: 'Trending',
        description: 'Your Post is Trending in the hot Section',
        time: '9.56 AM'
      },
      {
        img: 'https://unsplash.it/400/400?image=1',
        heading: 'Trending',
        description: 'Your Post is Trending in the hot Section',
        time: '9.56 AM'
      }
    ]
  },
  {
    title: 'Yesterday',
    data: [
      {
        img: 'https://unsplash.it/400/400?image=1',
        heading: 'Trending',
        description: 'Your Post is Trending in the hot Section',
        time: '9.56 AM'
      },
      {
        img: 'https://unsplash.it/400/400?image=1',
        heading: 'Trending',
        description: 'Your Post is Trending in the hot Section',
        time: '9.56 AM'
      },
      {
        img: 'https://unsplash.it/400/400?image=1',
        heading: 'Trending',
        description: 'Your Post is Trending in the hot Section',
        time: '9.56 AM'
      },
      {
        img: 'https://unsplash.it/400/400?image=1',
        heading: 'Trending',
        description: 'Your Post is Trending in the hot Section',
        time: '9.56 AM'
      }
    ]
  }
]

export default function BrokerNotificationScreen(props: Props) {

  const isFocused = useIsFocused()
  const dispatch: any = useDispatch()

  const { notifications } = useSelector((state: any) => state?.notificationReducer)

  useEffect(() => {
    if (isFocused) {
      let payload = {
        sendTo: 'broker'
      }
      dispatch(getNotifications(payload, (data: any) => { }))
    }
  }, [isFocused])


  const renderItem = useCallback(({ item, index }: any) => {
    return (
      <TouchableOpacity style={styles.notificationContainer} key={index}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FastImage source={{ uri: item?.img }} style={styles.imgStyle} />
          <View style={{ marginLeft: vw(17.5), width: vw(242) }}>
            <Text style={styles.headingText} numberOfLines={1}>{item?.heading}</Text>
            <Text style={styles.descriptionText} numberOfLines={2}>{item?.description}</Text>
          </View>
        </View>
        <Text style={styles.timeText}>{item?.time}</Text>
      </TouchableOpacity>
    )
  }, [NOTIFICATIONS_DATA])

  const renderSectionHeader = useCallback(({ section }: any) => {
    return (
      <Text style={styles.headerText}>{section?.title}</Text>
    )
  }, [NOTIFICATIONS_DATA])

  const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [NOTIFICATIONS_DATA])

  return (
    <SafeAreaView style={styles.container}>
      <BrokerHeader title={'Notifications'} navigation={props?.navigation} />
      <View style={styles.mainContainer} >
        <SectionList
          sections={NOTIFICATIONS_DATA}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          keyExtractor={keyExtractor}
        />
      </View>
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
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: vh(15)
  },
  imgStyle: {
    width: vw(41),
    height: vw(41),
    borderRadius: vw(100)
  },
  headingText: {
    fontSize: vw(14),
    fontWeight: '600',
    maxWidth: vw(240),
    color: colors?.black
  },
  descriptionText: {
    fontSize: vw(12),
    fontWeight: '400',
    marginTop: vh(8.8),
    color: colors.gray2,
    maxWidth: vw(240)
  },
  timeText: {
    fontSize: vw(12),
    fontWeight: '400',
    color: colors?.black
  },
  headerText: {
    fontSize: vw(14),
    fontWeight: '600',
    marginTop: vh(20),
    color: colors?.black
  }
})