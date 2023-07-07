import { Linking, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native'
import React, { memo, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import fonts from '@nestoHub/utils/fonts';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import { useDispatch } from 'react-redux';
import { getAllRaiseQuery } from '@nestoHub/actions';
import { BrokerQueriesCard } from '@nestoHub/components/BrokerQueriesCard';
import common from '@nestoHub/utils/common';

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerRaiseQueryScreen(props: Props) {

    const dispatch: any = useDispatch()

    const [queriesData, setQueriesData] = useState<any>([])

    useEffect(() => {
        if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental)
            UIManager.setLayoutAnimationEnabledExperimental(true)

        let payload = {

        }
        dispatch(getAllRaiseQuery(payload, (data: any) => {
            setQueriesData(data?.data)
        }))
    }, [])


    const chatOptions = [
        {
            title: 'Contact 24×7 Help',
            onPress: () => {

            }
        },
        {
            title: 'Email Us',
            onPress: () => {
                Linking.openURL(`mailto:navdeep@bizzeonline.com?subject=Support`)?.catch((error: any) => {
                    console.log('Error while linking url', error);
                    common?.snackBar('Error while opening Mail Box')
                })
            }
        }
    ]

    const ChatOptionsCard = memo((props: any) => {
        return (
            <TouchableOpacity style={styles.chatOptionsCardView} onPress={props?.onPress} activeOpacity={0.8}>
                <Text style={styles.chatOptionsCardTitle}>{props?.title}</Text>
                <View style={styles.imgHolder}><FastImage source={localImages?.RIGHT_ARROW} style={{ width: vw(6), height: vw(6) }} tintColor={colors.customBlue} resizeMode={'contain'} /></View>
            </TouchableOpacity>
        )
    })

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Raise a Query'} navigation={props?.navigation} showNotification />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <Text style={styles.heading}>Your Recent Queries</Text>
                {
                    queriesData?.map((item: any) => {
                        return (
                            <BrokerQueriesCard title={item?.subject} description={item?.description} />
                        )
                    })
                }
                <Text style={styles.heading}>Chat With Us</Text>
                {
                    chatOptions?.map((item: any) => {
                        return (
                            <ChatOptionsCard title={item?.title} onPress={item?.onPress} />
                        )
                    })
                }
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
    heading: {
        fontSize: vw(16),
        fontWeight: '600',
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors.black,
        marginTop: vh(28),
        marginBottom: vh(5)
    },
    chatOptionsCardView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: vw(12),
        paddingVertical: vh(20.6),
        shadowColor: colors.black,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 1.5,
        backgroundColor: colors.white,
        marginTop: vh(16.5),
        borderRadius: vw(7.25)
    },
    chatOptionsCardTitle: {
        fontSize: vw(14),
        fontWeight: '400',
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors.black,
    },
    imgHolder: {
        width: vw(20.5),
        height: vw(20.5),
        borderRadius: vw(50),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: vw(1),
        borderColor: colors.gray5
    }
})