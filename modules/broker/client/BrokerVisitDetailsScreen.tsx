import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SearchView } from '@nestoHub/components/SearchView'
import { useDispatch, useSelector } from 'react-redux'
import colors from '@nestoHub/utils/colors'
import { vh, vw } from '@nestoHub/utils/dimensions'
import fonts from '@nestoHub/utils/fonts'
import { BrokerClientVisitCard } from '@nestoHub/components/BrokerClientVisitCard'
import screenNames from '@nestoHub/utils/screenNames'
import { FlashList } from '@shopify/flash-list'
import { getAllVisit } from '@nestoHub/actions'
import { useIsFocused } from '@react-navigation/native'

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerVisitDetailsScreen(props: Props) {
    const dispatch: any = useDispatch()
    const isFocused = useIsFocused()

    const { _id } = useSelector((state: any) => state?.authReducer)
    const [searchText, setSearchText] = useState<string>('')
    const [visitData, setVisitData] = useState<any>([])

    useEffect(() => {
        if (isFocused) {
            let payload = {
                brokerId: _id ?? '',
                requirementId: props?.route?.params?.requirementId
            }
            dispatch(getAllVisit(payload, (data: any) => {
                setVisitData(data?.data)
            }))
        }
    }, [props, isFocused])


    const onChangeText = (text: string) => setSearchText(text)

    const renderItem = useCallback(({ item }: any) => {

        const onPressVisitSummary = () => {
            let propertyDescription = [
                item?.propertyName,
                item?.preferredLocation?.toString(),
                `₹ ${item?.minPrice + ' - ' + item?.maxPrice}`,
                item?.unitType?.toString()
            ]
            props?.navigation?.navigate(screenNames?.BROKER_VISIT_SUMMARY_SCREEN, { visitId: item?._id, propertyDescription })
        }

        return (
            <BrokerClientVisitCard
                propertyName={item?.propertyName}
                location={item?.preferredLocation}
                maxPrice={item?.maxPrice}
                minPrice={item?.minPrice}
                unitType={item?.unitType}
                status={item?.visitStatus}
                onPressVisitSummary={onPressVisitSummary}
            />
        )
    }, [props])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [props])

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Visit Details'} navigation={props?.navigation} showNotification />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <SearchView searchText={searchText} onChangeText={onChangeText} speechToText filter />
                <View style={styles.nameCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.requirementIdText}>Requirement ID: {props?.route?.params?.requirementId?.slice(-10)}</Text>
                        <Text style={styles.relatedSearchText}>Related Search</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(17.5) }}>
                        <View style={styles.requirementCardView}><Text style={styles.requirementCardText}>{props?.route?.params?.recentRequirement?.toString()}</Text></View>
                        <View style={styles.requirementCardView}><Text style={styles.requirementCardText}>₹ {props?.route?.params?.minPrice + ' - ' + props?.route?.params?.maxPrice}</Text></View>
                        <View style={styles.requirementCardView}><Text style={styles.requirementCardText}>{props?.route?.params?.preferedLocation?.toString()}</Text></View>
                    </View>
                </View>
                <FlashList
                    estimatedItemSize={50}
                    data={visitData ?? []}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    removeClippedSubviews={false}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    contentContainerStyle={{ paddingBottom: vh(10) }}
                />
            </KeyboardAwareScrollView>
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
    requirementIdText: {
        fontWeight: '400',
        fontSize: vw(14),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black
    },
    relatedSearchText: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black
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
        elevation: 2,
        marginHorizontal: vw(1),
    },
    requirementCardView: {
        paddingVertical: vh(7.3),
        paddingHorizontal: vw(6),
        borderWidth: vw(1),
        borderColor: colors?.gray5,
        borderRadius: vw(8)
    },
    requirementCardText: {
        fontWeight: '400',
        fontSize: vw(12),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black
    }
})