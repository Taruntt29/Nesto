import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import { SearchView } from '@nestoHub/components/SearchView';
import fonts from '@nestoHub/utils/fonts';
import { FlashList } from '@shopify/flash-list';
import { CustomButton } from '@nestoHub/components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { getBrokerEarningsByBrokerId } from '@nestoHub/actions';

interface Props {
    navigation: any,
    route: any;
}

export default function BrokerEarningsDetailScreen(props: Props) {

    const { title, price, type } = props?.route?.params
    const dispatch: any = useDispatch()

    const { _id } = useSelector((state: any) => state?.authReducer)

    const [searchText, setSearchText] = useState<string>('')
    const [data, setData] = useState<any>([])

    useEffect(() => {
        let payload = {
            brokerId: '640c30902cdf3673a29ae71d',
            type,
            search: searchText
        }
        dispatch(getBrokerEarningsByBrokerId(payload, (data: any) => {
            setData(data?.data)
        }))
    }, [props, searchText])


    const onChangeText = (text: string) => setSearchText(text)

    const getHeading = () => {
        switch (type) {
            case 'total': return ['Claim ID', 'Transaction ID', 'Payment Date', 'Amount ₹']
                break;
            case 'upcoming': return ['Claim ID', 'Claim Date', 'Claim Status', 'Amount ₹']
                break;
            case 'visit': return ['Visit ID', 'Property Name', 'Visit Date', 'Status']
                break;
            case 'loan': return ['Query ID', 'DSA Name', 'Query Date', 'Status']
                break;
            case 'claim': return ['Claim ID', 'Claim Date', 'Status', 'Amount ₹']
                break;
            case 'referral': return ['Broker ID', 'Mobile Number', 'Refer Date', 'Amount ₹']
                break;
            default: return null;
                break;
        }
    }

    const getValues = (item: any) => {
        switch (type) {
            case 'total': return [item?.claimId?.slice(-10), item?.transactionId, item?.date, item?.amount]
                break;
            case 'upcoming': return [item?.claimId?.slice(-10), item?.date, item?.status, item?.amount]
                break;
            case 'visit': return [item?.id?.slice(-10), item?.propertyName, item?.date, item?.status]
                break;
            case 'loan': return [item?.id?.slice(-10), item?.name, item?.date, item?.status]
                break;
            case 'claim': return [item?.id?.slice(-10), item?.date, item?.status, item?.amount]
                break;
            case 'referral': return [item?.brokerId?.slice(-10), item?.mobileNo, item?.date, item?.amount]
                break;
            default: return null;
                break;
        }
    }


    const renderItem = useCallback(({ item }: any) => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingVertical: vh(12) }}>
                {
                    getValues?.(item)?.map((element: any) => {
                        return (
                            <Text style={styles.headingValue}>{element}</Text>
                        )
                    })
                }
            </View>
        )
    }, [props])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [props])

    const ListHeaderComponent = memo(() => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, paddingVertical: vh(12) }}>
                {
                    getHeading?.()?.map((item: any) => {
                        return (
                            <Text style={styles.heading}>{item}</Text>
                        )
                    })
                }
            </View>
        )
    })

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={title ?? ''} navigation={props?.navigation} showNotification />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <SearchView searchText={searchText} onChangeText={onChangeText} extraStyle={{ marginTop: vh(20) }} filter textInputStyle={{ width: vw(225) }} />
                <View style={styles.earningCard}>
                    <Text style={styles?.title}>{title}</Text>
                    <Text style={styles?.price}>{price}</Text>
                </View>
                <FlashList
                    estimatedItemSize={50}
                    data={data ?? []}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ListHeaderComponent={ListHeaderComponent}
                    removeClippedSubviews={false}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                />
                <CustomButton title='Download PDF' onPressCustomButton={() => { }} />
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
    earningCard: {
        paddingHorizontal: vw(10),
        paddingVertical: vh(14),
        borderRadius: vw(10),
        shadowColor: colors.gray2,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 4,
        backgroundColor: colors.white,
        marginTop: vh(22),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: vh(16.7)
    },
    title: {
        fontWeight: '400',
        fontSize: vw(15),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.black
    },
    price: {
        fontWeight: '700',
        fontSize: vw(20),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.black
    },
    heading: {
        fontWeight: '600',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
        flex: 0.25,
        textAlign: 'center',
        // borderWidth:1,
    },
    headingValue: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.gray2,
        flex: 0.25,
        textAlign: 'center',
        // borderWidth:1
    }
})