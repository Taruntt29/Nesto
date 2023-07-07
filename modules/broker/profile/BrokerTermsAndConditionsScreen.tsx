import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import fonts from '@nestoHub/utils/fonts';
import { useDispatch } from 'react-redux';
import { getTermsAndConditions } from '@nestoHub/actions';

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerTermsAndConditionsScreen(props: Props) {

    const dispatch: any = useDispatch()
    const [tnc, setTnc] = useState(props?.route?.params?.data ?? '')

    useEffect(() => {
        if (!props?.route?.params?.fromScreen?.length) {
            let payload = {

            }
            dispatch(getTermsAndConditions(payload, (data: any) => {
                setTnc(data?.data?.[0])
            }))
        }
    }, [])


    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Terms & Conditions'} navigation={props?.navigation} showNotification />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <Text style={styles.title}>Lorem Ipsum</Text>
                <Text style={styles.description}>{tnc?.length ? tnc : tnc?.description ?? ''}</Text>
                {/* <Text style={styles.title}>Lorem Ipsum</Text>
                <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Text> */}
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
    title: {
        fontWeight: '700',
        fontSize: vw(14),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.black,
        marginTop: vh(15.5)
    },
    description: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.gray2,
        marginTop: vh(12),
        lineHeight: vh(14),
    }
})