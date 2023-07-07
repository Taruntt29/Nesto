import { StyleSheet } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { vh, vw } from '@nestoHub/utils/dimensions';
import colors from '@nestoHub/utils/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SearchView } from '@nestoHub/components/SearchView';
import { FlashList } from '@shopify/flash-list';
import { useDispatch, useSelector } from 'react-redux';
import InvoiceComp from '@nestoHub/components/InvoiceComp';
import screenNames from '@nestoHub/utils/screenNames';
import { getAllInvoicesForBuilder } from '@nestoHub/actions';

interface Props {
    navigation: any;
    route: any;
}

export default function SettledInvoicesScreen(props: Props) {
    const dispatch: any = useDispatch()

    const { _id } = useSelector((state: any) => state?.authReducer)
    const { allBuilderSettledInvoices } = useSelector((state: any) => state?.builderHomeReducer)

    const [searchText, setSearchText] = useState<string>('')

    useEffect(() => {
        let payload = {
            builderId: _id,
            status: 'settled'
        }
        dispatch(getAllInvoicesForBuilder(payload, (data: any) => { }))
    }, [])

    const onChangeText = (text: string) => setSearchText(text)

    const onPressInvoice = () => {
        // props?.navigation?.navigate(screenNames?.BROKER_BROKERAGE_CLAIM_SCREEN, { screenTitle: 'visit', propertyId, visitId })
    }

    const onPressPdf = () => {

    }

    const renderItem = useCallback(({ item }: any) => {
        return (
            <InvoiceComp
                onPressInvoiceComp={onPressInvoice}
                image={item?.image}
                title={item?.title}
                date={item?.date}
                subTitle={item?.subTitle}
                brokerName={item?.brokerName}
                unitNumber={item.unitNumber}
                claimedAmount={item?.claimedAmount}
                type={1}
                onPressPdf={onPressPdf}
            />
        )
    }, [allBuilderSettledInvoices])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [allBuilderSettledInvoices])

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
            <SearchView searchText={searchText} onChangeText={onChangeText} extraStyle={{ marginTop: vh(35), marginBottom: vh(10) }} filter textInputStyle={{ width: vw(225) }} />
            <FlashList
                estimatedItemSize={40}
                data={allBuilderSettledInvoices ?? []}
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