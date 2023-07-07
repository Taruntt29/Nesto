import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import { SearchView } from '@nestoHub/components/SearchView'
import colors from '@nestoHub/utils/colors'
import { vh, vw } from '@nestoHub/utils/dimensions'
import fonts from '@nestoHub/utils/fonts'
import { FlashList } from '@shopify/flash-list'
import { SupportCommunityCard } from '@nestoHub/components/SupportCommunityCard'

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerSupportHistoryScreen(props: Props) {

    const menuData = ['My Questions', 'My Answers']

    const [searchText, setSearchText] = useState<string>('')
    const [selectedMenu, setSelectedMenu] = useState<string>(menuData?.[0])

    const onChangeText = (text: string) => setSearchText(text)

    const onPressMenuItem = (item: any) => setSelectedMenu(item)

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

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'My History'} navigation={props?.navigation} />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <SearchView searchText={searchText} onChangeText={onChangeText} extraStyle={{ marginTop: vh(20) }} filter textInputStyle={{ width: vw(225) }} />
                <View style={styles.selectionView}>
                    {
                        menuData?.map((item: any) => {
                            return (
                                <TouchableOpacity onPress={() => onPressMenuItem(item)} style={item === selectedMenu ? styles.selectedMenuButton : styles.unSelectedMenuButton}>
                                    <Text style={item === selectedMenu ? styles.selectedMenuButtonText : styles.unSelectedMenuButtonText}>{item}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
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
    selectionView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.gray7,
        borderRadius: vw(100),
        borderWidth: vw(0.8),
        borderColor: colors.gray5,
        padding: vw(8),
        marginTop: vh(35),
        marginBottom: vh(5)
    },
    selectedMenuButton: {
        width: vw(156),
        backgroundColor: colors.customBlue,
        borderRadius: vw(100),
        paddingVertical: vh(12.5),
        alignItems: 'center',
        shadowColor: colors.black,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 8,
    },
    unSelectedMenuButton: {
        width: vw(156),
        alignItems: 'center'
    },
    selectedMenuButtonText: {
        fontWeight: '700',
        fontSize: vw(15),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.white,
    },
    unSelectedMenuButtonText: {
        fontWeight: '300',
        fontSize: vw(15),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.gray2
    },
})