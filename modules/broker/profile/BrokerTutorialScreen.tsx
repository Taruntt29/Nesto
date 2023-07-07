import { SafeAreaView, StyleSheet, Text, View, Linking, TouchableOpacity } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import colors from '@nestoHub/utils/colors';
import { screenWidth, vh, vw } from '@nestoHub/utils/dimensions';
import { SearchView } from '@nestoHub/components/SearchView';
import { FlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import fonts from '@nestoHub/utils/fonts';
import { useDispatch } from 'react-redux';
import { getAllTutorial } from '@nestoHub/actions';
import common from '@nestoHub/utils/common';

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerTutorialScreen(props: Props) {

    const dispatch: any = useDispatch()

    const [searchText, setSearchText] = useState<string>('')
    const [tutorialData, setTutorialData] = useState<any>([])

    useEffect(() => {
        let payload = searchText?.length ? { search: searchText } : {}
        dispatch(getAllTutorial(payload, (data: any) => {
            setTutorialData(data?.data)
        }))
    }, [searchText])


    const onChangeText = (text: string) => setSearchText(text)

    const TutorialCard = memo((props: any) => {

        const onPressTutorial = () => {
            Linking?.openURL(props?.link)?.catch((error) => {
                common?.snackBar('Could not open URL')
                console.log('error while opening url', error)
            })
        }

        return (
            <TouchableOpacity style={styles.cardView} onPress={onPressTutorial}>
                <FastImage source={{ uri: props?.image }} style={styles.cardImg} />
                <Text style={styles.cardTitle}>{props?.title}</Text>
                <Text style={styles.cardSubTitle}>{props?.subTitle}</Text>
            </TouchableOpacity>
        )
    })

    const renderItem = useCallback(({ item }: any) => {
        return (
            <TutorialCard
                image={item?.thumbnail ?? ''}
                title={item?.title ?? ''}
                subTitle={item?.description ?? ''}
                link={item?.link ?? ''}
            />
        )
    }, [])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [])

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Tutorials'} navigation={props?.navigation} showNotification />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <SearchView searchText={searchText} onChangeText={onChangeText} filter textInputStyle={{ width: vw(225) }} />
                <FlashList
                    estimatedItemSize={10}
                    data={tutorialData ?? []}
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
    cardView: {
        padding: vw(10.5),
        backgroundColor: colors.white,
        borderRadius: vw(10),
        shadowColor: colors.black,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 2,
        marginTop: vh(26),
        width: screenWidth - vw(27.2),
        marginLeft: vw(1)
    },
    cardImg: {
        width: vw(330),
        height: vh(179),
        borderRadius: vw(10)
    },
    cardTitle: {
        fontWeight: '400',
        fontSize: vw(14),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
        marginTop: vh(14.2)
    },
    cardSubTitle: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.gray2,
        marginTop: vh(8.2),
        lineHeight: vh(12),
        textAlign: 'justify'
    }
})