import { SafeAreaView, StyleSheet, Text } from 'react-native'
import React from 'react'
import colors from '@nestoHub/utils/colors'
import { screenWidth, vh, vw } from '@nestoHub/utils/dimensions'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import fonts from '@nestoHub/utils/fonts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { BrokerPersonalInfoScreen } from './BrokerPersonalInfoScreen';
import { BrokerBankInfoScreen } from './BrokerBankInfoScreen';
import screenNames from '@nestoHub/utils/screenNames';

interface Props {
    navigation: any;
    route: any;
}

const Tab: any = createMaterialTopTabNavigator();

export default function BrokerPersonalDetailsScreen(props: Props) {
    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Personal Details'} navigation={props?.navigation} showNotification />
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: colors.white,
                    inactiveTintColor: colors.gray2,
                    indicatorStyle: {
                        bottom: '14%',
                        width: vw(156),
                        left: '2.5%',
                        borderRadius: vw(100),
                        backgroundColor: colors.customBlue,
                        height: vh(40)
                    },
                    style: {
                        alignSelf: "center",
                        width: screenWidth - vw(30),
                        borderRadius: vw(100),
                        backgroundColor: colors.gray7,
                        elevation: 2,
                        shadowOpacity: .10,
                        shadowRadius: 4,
                        height: vh(56),
                        marginVertical: vh(1),
                        marginHorizontal: vw(1)
                    },
                    tabStyle: {
                        borderRadius: vw(100),
                    },
                    pressColor: 'rgba(255, 255, 255, .4)',
                }}
                lazy={true}
                swipeEnabled={true}>
                <Tab.Screen
                    name={screenNames?.BROKER_PERSONAL_INFO_SCREEN}
                    component={BrokerPersonalInfoScreen}
                    options={{
                        tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Personal Info</Text>)
                    }}
                />
                <Tab.Screen
                    name={screenNames?.BROKER_BANK_INFO_SCREEN}
                    component={BrokerBankInfoScreen}
                    options={{
                        tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Bank Info</Text>)
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    focusedText: {
        fontWeight: '700',
        fontSize: vw(15),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.white,
        marginTop: vh(1),
        textAlign: 'center',
        width:vw(100)
    },
    unfocusedText: {
        fontWeight: '300',
        fontSize: vw(15),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.gray2,
        marginTop: vh(1),
        textAlign: 'center',
        width:vw(100)
    }
})