import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SearchView } from '@nestoHub/components/SearchView'
import { FlashList } from '@shopify/flash-list'
import { vh, vw } from '@nestoHub/utils/dimensions'
import { BrokerManagementCard } from '@nestoHub/components/BrokerManagementCard'
import screenNames from '@nestoHub/utils/screenNames'
import colors from '@nestoHub/utils/colors'
import { BrokerManagementLoanQueriesCard } from '@nestoHub/components/BrokerManagementLoanQueriesCard'
import { RatingModal } from '@nestoHub/components/RatingModal'
import { CustomActivityModal } from '@nestoHub/components/CustomActivityModal'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLoanQueries } from '@nestoHub/actions'

interface Props {
    navigation: any,
    route: any;
}

export default function BrokerLoanQueriesScreen(props: Props) {
    const dispatch: any = useDispatch()

    const { _id } = useSelector((state: any) => state?.authReducer)

    const [searchText, setSearchText] = useState<string>('')
    const [isOpenRatingModal, setisOpenRatingModal] = useState<boolean>(false)
    const [loanQueriesData, setLoanQueriesData] = useState<any>([])
    const [ratingData, setRatingData] = useState<any>([])

    useEffect(() => {
        let payload = {
            brokerId: _id
        }
        dispatch(getAllLoanQueries(payload, (data: any) => {
            setLoanQueriesData(data?.data)
        }))
    }, [])

    const onChangeText = (text: string) => setSearchText(text)

    const onPressRating = () => setisOpenRatingModal(true)

    const renderItem = useCallback(({ item }: any) => {
        return (
            <BrokerManagementLoanQueriesCard onPressRating={onPressRating} item={item} navigation={props?.navigation}/>
        )
    }, [])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [])

    const onChangeRating = (value: number) => setRatingData(value)

    const renderModalContent = useCallback(() => {
        return (
            <RatingModal onChangeRating={onChangeRating} ratingData={ratingData} requestCloseModal={() => setisOpenRatingModal(false)} />
        )
    }, [])

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
            <SearchView searchText={searchText} onChangeText={onChangeText} extraStyle={{ marginTop: vh(20), marginBottom: vh(10) }} filter textInputStyle={{ width: vw(225) }} />
            <FlashList
                estimatedItemSize={10}
                data={loanQueriesData ?? []}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                removeClippedSubviews={false}
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled
                bounces={false}
                contentContainerStyle={{ paddingBottom: vh(20) }}
            />
            <CustomActivityModal
                renderModalContent={renderModalContent}
                isVisible={isOpenRatingModal}
                setIsVisible={(val: boolean) => setisOpenRatingModal(val)}
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