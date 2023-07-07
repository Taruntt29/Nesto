import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import fonts from '@nestoHub/utils/fonts';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import screenNames from '@nestoHub/utils/screenNames';

interface Props {
    navigation: any;
    route: any;
}

export default function BuilderAboutTheScreen(props: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={`${props?.route?.params?.title?.includes('Terms') ? '' : 'About the'} ${props?.route?.params?.title ?? ''}`} showNotification navigation={props?.navigation} isBuilder />
            <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                {
                    props?.route?.params?.title === 'Builder' ?
                        <>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(28) }}>
                                <FastImage source={{ uri: 'https://unsplash.it/400/400?image=1' }} style={{ width: vw(55), height: vw(55), borderRadius: vw(100) }} />
                                <View style={{ marginLeft: vw(13.7) }}>
                                    <Text style={styles?.nameText}>Sameer Sharma</Text>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(11) }}>
                                        {
                                            [1, 1, 1, 1, 1]?.map((item: any) => {
                                                return (
                                                    <FastImage source={localImages?.STAR} style={{ width: vw(10), height: vw(10), marginRight: vw(5.5) }} resizeMode={'contain'} />
                                                )
                                            })
                                        }
                                    </View>
                                </View>
                            </View>
                        </> : null
                }

                <Text style={styles.heading}>Lorem Ipsum</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>
                <Text style={styles.heading}>Lorem Ipsum</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text>

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
    nameText: {
        fontWeight: '700',
        fontSize: vw(16),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.black
    },
    heading: {
        fontWeight: '700',
        fontSize: vw(14),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.black,
        marginTop: vh(20)
    },
    description: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.gray2,
        marginTop: vh(11),
        lineHeight: vh(16)
    }
})