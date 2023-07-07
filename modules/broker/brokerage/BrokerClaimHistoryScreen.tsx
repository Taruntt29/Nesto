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
import { getAllClaims } from '@nestoHub/actions'
import common from '@nestoHub/utils/common'

interface Props {
    navigation: any,
    route: any;
}

export default function BrokerClaimHistoryScreen(props: Props) {
    const dispatch: any = useDispatch()

    const { _id } = useSelector((state: any) => state?.authReducer)

    const [searchText, setSearchText] = useState<string>('')
    const [claimData, setClaimData] = useState<any>([])

    useEffect(() => {
        let payload = {
            brokerId: _id,
            claimType: 'all'
        }
        dispatch(getAllClaims(payload, (data: any) => {
            setClaimData(data?.data)
        }))
    }, [])

    const onChangeText = (text: string) => setSearchText(text)

    // const onPressClaim = () => {
    //     props?.navigation?.navigate(screenNames?.BROKER_BROKERAGE_CLAIM_SCREEN, { screenTitle: 'DSA Claim' })
    // }

    const onPressVisitClaim = (visitId: string, propertyId: string) => {
        props?.navigation?.navigate(screenNames?.BROKER_BROKERAGE_CLAIM_SCREEN, { screenTitle: 'visit', propertyId, visitId })
    }

    const onPressBrokerageClaim = (boughtPropertyId: string) => {
        props?.navigation?.navigate(screenNames?.BROKER_BROKERAGE_CLAIM_SCREEN, { screenTitle: 'property', boughtPropertyId })
    }

    const renderItem = useCallback(({ item }: any) => {
        return (
            <BrokerManagementCard
                img={item?.propertyId?.images?.[0] ?? ''}
                name={item?.propertyId?.name ?? ''}
                location={item?.propertyId?.location ?? ''}
                date={common?.formatUTCDate(item?.propertyId?.createdAt) ?? ''}
                builderName={item?.builderId?.name ?? ''}
                brokerageValue={`₹ ${item?.brokerageAmount}`}
                customerName={item?.visitId?.clientName ?? ''}
                // onPressClaim={onPressClaim}
                btnText={item?.claimStatus ?? ''}
                onPressBrokerageClaim={() => onPressBrokerageClaim(item?.boughtPropertyId?._id)}
                onPressVisitClaim={() => onPressVisitClaim(item?.visitId?._id, item?.propetyId?._id)}
                claimType={item?.claimType}
            />
        )
    }, [])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [])

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
            <SearchView searchText={searchText} onChangeText={onChangeText} extraStyle={{ marginTop: vh(20), marginBottom: vh(10) }} filter textInputStyle={{ width: vw(225) }} />
            <FlashList
                estimatedItemSize={10}
                data={claimData ?? []}
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