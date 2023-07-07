import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { vh, vw } from '@nestoHub/utils/dimensions'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FlashList } from '@shopify/flash-list'
import { SearchView } from '@nestoHub/components/SearchView'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import colors from '@nestoHub/utils/colors'
import { BrokerClientCard } from '@nestoHub/components/BrokerClientCard'
import FastImage from 'react-native-fast-image'
import localImages from '@nestoHub/utils/localImages'
import fonts from '@nestoHub/utils/fonts'
import screenNames from '@nestoHub/utils/screenNames'
import { useDispatch, useSelector } from 'react-redux'
import { getAllRequirement } from '@nestoHub/actions'
import { BrokerFloatingActionButton } from '@nestoHub/components/BrokerFloatingActionButton'
import { useIsFocused } from '@react-navigation/native'

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerRequirementDetailScreen(props: Props) {
    const dispatch: any = useDispatch()
    const isFocused = useIsFocused()

    const { _id } = useSelector((state: any) => state?.authReducer)
    const [searchText, setSearchText] = useState<string>('')
    const [requirementData, setRequirementData] = useState<any>([])

    useEffect(() => {
        if (isFocused) {
            let payload = {
                brokerId: _id ?? '',
                customerId: props?.route?.params?.clientId ?? '',
                // search: searchText
            }
            dispatch(getAllRequirement(payload, (data: any) => {
                setRequirementData(data?.data)
            }))
        }
    }, [props, searchText, isFocused])


    const onChangeText = (text: string) => setSearchText(text)

    const renderItem = useCallback(({ item }: any) => {

        let clientOject = {
            recentRequirement: item?.unitType,
            minPrice: item?.minPrice,
            maxPrice: item?.maxPrice,
            preferedLocation: item?.preferredLocation,
            phoneNumber: item?.phoneNumber,
            clientName: item?.clientName,
            email: item?.email,
            clientId: item?._id,
            alternatePhoneNumber: item?.alternatePhoneNumber,
            requirementId: item?._id
        }

        const onPressVisitSummary = () => {
            props?.navigation?.navigate(screenNames?.BROKER_VISIT_DETAILS_SCREEN, { ...clientOject })
        }

        return (
            <BrokerClientCard
                navigation={props?.navigation}
                fromScreen={screenNames?.BROKER_REQUIREMENT_DETAIL_SCREEN}
                recentRequirement={item?.unitType}
                minPrice={item?.minPrice}
                maxPrice={item?.maxPrice}
                preferedLocation={item?.preferredLocation}
                requirementId={item?._id}
                recentUpdatedVisit={`${item?.latestVisit?.propertyName} | ${item?.latestVisit?.date}`}
                status={item?.latestVisit?.visitStatus}
                onPressVisitSummary={onPressVisitSummary}
            />
        )
    }, [props])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [props])

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Requirement Details'} navigation={props?.navigation} showNotification />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <SearchView searchText={searchText} onChangeText={onChangeText} speechToText filter />
                <View style={styles.nameCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.nameText}>{props?.route?.params?.clientName ?? ''}</Text>
                        <FastImage source={localImages?.CALL} style={{ width: vw(15), height: vh(15), marginRight: vw(5) }} resizeMode={'contain'} />
                    </View>
                    <Text style={styles.clientText}>Client ID: {props?.route?.params?.clientId?.slice(-10)}</Text>
                </View>
                <FlashList
                    estimatedItemSize={50}
                    data={requirementData ?? []}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    removeClippedSubviews={false}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    contentContainerStyle={{ paddingBottom: vh(10) }}
                />
            </KeyboardAwareScrollView>
            <BrokerFloatingActionButton navigation={props?.navigation} type='client' />
        </SafeAreaView >
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
    nameCard: {
        padding: vw(12),
        borderRadius: vw(10),
        backgroundColor: colors.white,
        marginTop: vh(20),
        shadowColor: colors.black,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 4,
        marginHorizontal: vw(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    nameText: {
        fontWeight: '600',
        fontSize: vw(16),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
        marginRight: vw(8)
    },
    clientText: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black
    }
})