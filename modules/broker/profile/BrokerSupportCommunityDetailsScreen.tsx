import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { SearchView } from '@nestoHub/components/SearchView';
import { SupportCommunityCard } from '@nestoHub/components/SupportCommunityCard';
import { FlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import fonts from '@nestoHub/utils/fonts';

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerSupportCommunityDetailsScreen(props: Props) {

    const [searchText, setSearchText] = useState<string>('')

    const onChangeText = (text: string) => setSearchText(text)

    const renderItem = useCallback(({ item }: any) => {
        return (
            <View style={styles.commentCard}>
                <FastImage source={{ uri: 'https://unsplash.it/400/400?image=1' }} style={styles.profileImg} />
                <View style={styles?.detailView}>
                    <Text style={styles.nameText}>Rashi<Text style={styles.timeText}> · 9m</Text></Text>
                    <Text style={styles.descriptionText}>The lorem ipsum is a placeholder text used in publishing and graphic design. This filter text is a short paragraph that contains all the letters of the alphabet.</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(5.5) }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FastImage source={localImages?.TREND_UP} style={{ width: vw(14), height: vh(14) }} resizeMode={'contain'} />
                            <Text style={{ marginHorizontal: vw(12.6), fontWeight: '600', fontSize: vw(14), color: colors.darkGreen, fontFamily: fonts?.BAHNSCHRIFT }}>{'29'}</Text>
                            <FastImage source={localImages?.TREND_DOWN} style={{ width: vw(14), height: vh(14) }} resizeMode={'contain'} />
                        </View>
                        <Text style={styles.reportText}>Report</Text>
                    </View>
                </View>
            </View>
        )
    }, [])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [])

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Support'} navigation={props?.navigation} showHistory />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <SearchView searchText={searchText} onChangeText={onChangeText} extraStyle={{ marginTop: vh(20) }} filter textInputStyle={{ width: vw(225) }} />
                <SupportCommunityCard
                    image={'https://unsplash.it/400/400?image=1'}
                    title={'Lorem Ipsum'}
                    date={'Nov 29'}
                    description={'What was something unexpected that you found in your new home from the previous owner?'}
                    trendingCount={29}
                    answerCount={5}
                    navigation={props?.navigation}
                    detailScreen
                />
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
    commentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: vw(8.5),
        paddingVertical: vh(11),
        backgroundColor: colors.gray7,
        marginTop: vh(8.5),
        borderRadius: vw(10)
    },
    profileImg: {
        width: vw(40),
        height: vw(40),
        borderRadius: vw(100),
        alignSelf: 'flex-start'
    },
    detailView: {
        marginLeft: vw(5.5),
        width: vw(286)
    },
    nameText: {
        fontWeight: '600',
        fontSize: vw(14),
        color: colors.black,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    timeText: {
        fontWeight: '600',
        fontSize: vw(12),
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    descriptionText: {
        fontWeight: '400',
        fontSize: vw(10),
        color: colors.black,
        fontFamily: fonts?.BAHNSCHRIFT,
        lineHeight: vh(12),
        marginTop: vh(6)
    },
    reportText: {
        fontWeight: '400',
        fontSize: vw(10),
        color: colors.customRed,
        fontFamily: fonts?.BAHNSCHRIFT
    }
})