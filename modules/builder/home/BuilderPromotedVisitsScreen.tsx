import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { vh, vw } from '@nestoHub/utils/dimensions'
import colors from '@nestoHub/utils/colors'
import { BuilderVisitComponent } from '@nestoHub/components/BuilderVisitComponent'
import { useDispatch, useSelector } from 'react-redux'
import { getAllVisit, getVisitAnalytics } from '@nestoHub/actions'

interface Props {
  navigation: any;
  route: any
}

export default function BuilderPromotedVisitsScreen(props: Props) {

  const dispatch: any = useDispatch()

  const { _id } = useSelector((state: any) => state?.authReducer)

  const [visitData, setVisitData] = useState<any>([])
  const [visitAnalyticsData, setVisitAnalyticsData] = useState<any>([])

  useEffect(() => {
    dispatch(getAllVisit({ builderId: _id, propertyId: props?.route?.params?.propertyId, isPromoted: true }, (data: any) => {
      setVisitData(data?.data)
    }))
    dispatch(getVisitAnalytics({ builderId: _id, propertyId: props?.route?.params?.propertyId }, (data: any) => {
      let temp = [
        {
          title: 'Pending',
          count: data?.data?.pendingVisit?.toString(),
        },
        {
          title: 'Completed',
          count: data?.data?.completedVisit?.toString(),
        },
        {
          title: 'Follow Up',
          count: data?.data?.followUpVisit?.toString(),
        },
        {
          title: 'Negotiation',
          count: data?.data?.negotiationVisit?.toString(),
        },
        {
          title: 'Bought',
          count: data?.data?.boughtVisit?.toString(),
        },
      ]
      setVisitAnalyticsData(temp)
    }))
  }, [])
  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
      <BuilderVisitComponent statsData={visitAnalyticsData} tableData={visitData} type={2} navigation={props?.navigation} />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: vw(12.6),
    paddingBottom: vh(100),
    backgroundColor: colors.white,
    flex: 1
  },
})