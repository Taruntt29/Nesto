import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useState } from 'react'
import { SupportCommunityCard } from '@nestoHub/components/SupportCommunityCard'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SearchView } from '@nestoHub/components/SearchView'
import { FlashList } from '@shopify/flash-list'
import { vh, vw } from '@nestoHub/utils/dimensions'
import colors from '@nestoHub/utils/colors'

interface Props {
    navigation: any
}

export const BrokerCommunityTabScreen = memo((props: Props) => {
    const [searchText, setSearchText] = useState<string>('')

    const renderItem = useCallback(({ item }: any) => {
        return (
            <SupportCommunityCard
                image={'https://unsplash.it/400/400?image=1'}
                title={'Lorem Ipsum'}
                date={'Nov 29'}
                description={'What was something unexpected that you found in your new home from the previous owner?'}
                trendingCount={29}
                answerCount={5}
                navigation={props?.navigation}
            />
        )
    }, [])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [])

    const onChangeText = (text: string) => setSearchText(text)

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
            <SearchView searchText={searchText} onChangeText={onChangeText} extraStyle={{ marginTop: vh(20) }} textInputStyle={{ width: vw(280) }} />
            <FlashList
                estimatedItemSize={10}
                data={[1, 2, 3, 4] ?? []}
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
})

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: vw(12.6),
        paddingBottom: vh(100),
        backgroundColor: colors.white,
    },
})