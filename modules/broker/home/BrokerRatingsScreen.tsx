import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import colors from '@nestoHub/utils/colors'
import { vh, vw } from '@nestoHub/utils/dimensions'
import { FlashList } from '@shopify/flash-list'
import { BrokerRatingsCard } from '@nestoHub/components/BrokerRatingsCard'

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerRatingsScreen(props: Props) {

    const renderItem = useCallback(({ item }: any) => {
        return (
            <BrokerRatingsCard item={item} />
        )
    }, [props])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [props])

    const ItemSeparatorComponent = () => {
        return (
            <View style={styles.seperator} />
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Ratings'} showEye showNotification navigation={props?.navigation} />
            <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <FlashList
                    estimatedItemSize={50}
                    data={props?.route?.params?.data ?? []}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    ItemSeparatorComponent={ItemSeparatorComponent}
                    removeClippedSubviews={false}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled
                    contentContainerStyle={{ padding: vw(10) }}
                />
            </ScrollView>
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
    seperator: {
        borderBottomWidth: vw(0.5),
        borderColor: colors.gray2
    },
})