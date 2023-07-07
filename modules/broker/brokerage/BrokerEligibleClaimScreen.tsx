import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SearchView } from '@nestoHub/components/SearchView'
import { FlashList } from '@shopify/flash-list'
import { vh, vw } from '@nestoHub/utils/dimensions'
import { BrokerManagementCard } from '@nestoHub/components/BrokerManagementCard'
import screenNames from '@nestoHub/utils/screenNames'
import colors from '@nestoHub/utils/colors'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEligibleClaims } from '@nestoHub/actions'
import common from '@nestoHub/utils/common'

interface Props {
    navigation: any,
    route: any;
}

export default function BrokerEligibleClaimScreen(props: Props) {
    const dispatch: any = useDispatch()

    const { _id } = useSelector((state: any) => state?.authReducer)

    const [searchText, setSearchText] = useState<string>('')
    const [eligileClaimsData, setEligileClaimsData] = useState<any>([])

    useEffect(() => {
        let payload = {
            brokerId: _id
        }
        dispatch(getAllEligibleClaims(payload, (data: any) => {
            setEligileClaimsData(data?.data)
        }))
    }, [])

    const onChangeText = (text: string) => setSearchText(text)

    const onPressVisitClaim = (visitId: string, propertyId: string) => {
        props?.navigation?.navigate(screenNames?.BROKER_BROKERAGE_CLAIM_SCREEN, { screenTitle: 'visit', propertyId, visitId })
    }

    const onPressBrokerageClaim = (boughtPropertyId: string) => {
        props?.navigation?.navigate(screenNames?.BROKER_BROKERAGE_CLAIM_SCREEN, { screenTitle: 'property', boughtPropertyId })
    }

    const renderItem = useCallback(({ item }: any) => {
        return (
            <BrokerManagementCard
                img={item?.images?.[0] ?? ''}
                name={item?.propetyName ?? ''}
                location={item?.location ?? ''}
                date={common?.formatUTCDate(item?.date) ?? ''}
                builderName={item?.builderName ?? ''}
                brokerageValue={`₹ ${item?.brokerageValue}`}
                customerName={item?.customerId?.clientName ?? ''}
                onPressBrokerageClaim={() => onPressBrokerageClaim(item?.boughtPropertyId)}
                onPressVisitClaim={() => onPressVisitClaim(item?.visitId, item?.propetyId?._id)}
                btnText={'Raise the brokerage claim'}
                claimType={item?.claimType}
                isEligibleClaimTab
            />
        )
    }, [])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [])

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
            <SearchView searchText={searchText} onChangeText={onChangeText} extraStyle={{ marginTop: vh(35), marginBottom: vh(10) }} filter textInputStyle={{ width: vw(225) }} />
            <FlashList
                estimatedItemSize={10}
                data={eligileClaimsData ?? []}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                removeClippedSubviews={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                bounces={false}
                contentContainerStyle={{ paddingBottom: vh(20) }}
            />
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: vw(12.6),
        paddingBottom: vh(50),
        backgroundColor: colors.white
    },
})