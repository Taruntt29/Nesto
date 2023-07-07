import { Platform, StyleSheet, Text, UIManager, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SearchView } from '@nestoHub/components/SearchView'
import { vh, vw } from '@nestoHub/utils/dimensions'
import colors from '@nestoHub/utils/colors'
import { SupportCard } from '@nestoHub/components/SupportCard'
import { useDispatch } from 'react-redux'
import { getAllSupportAndFaq } from '@nestoHub/actions'

interface Props {

}

export const BuilderFAQTabScreen = memo((props: Props) => {
    const dispatch: any = useDispatch()
    const [searchText, setSearchText] = useState<string>('')
    const [faqData, setFaqData] = useState<any>([])

    useEffect(() => {
        if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental)
            UIManager.setLayoutAnimationEnabledExperimental(true)

        let payload = {
            for: 'builder',
            type: 'faq',
            search: searchText
        }
        dispatch(getAllSupportAndFaq(payload, (data: any) => {
            setFaqData(data?.data)
        }))
    }, [searchText])

    const onChangeText = (text: string) => setSearchText(text)

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
            <SearchView searchText={searchText} onChangeText={onChangeText} extraStyle={{ marginTop: vh(20) }} textInputStyle={{ width: vw(280) }} />
            {
                faqData?.map((item: any) => {
                    return (
                        <SupportCard title={item?.question} description={item?.answer} />
                    )
                })
            }
        </KeyboardAwareScrollView>
    )
})

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: vw(12.6),
        paddingBottom: vh(100),
        backgroundColor: colors.white,
        flex: 1
    },
})