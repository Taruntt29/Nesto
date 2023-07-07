import { Platform, SafeAreaView, StyleSheet, Text, UIManager } from 'react-native'
import React, { useEffect } from 'react'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import colors from '@nestoHub/utils/colors';
import { screenWidth, vh, vw } from '@nestoHub/utils/dimensions';
import fonts from '@nestoHub/utils/fonts';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import screenNames from '@nestoHub/utils/screenNames';
import { BrokerSupportTabScreen } from './BrokerSupportTabScreen';
import { BrokerFAQTabScreen } from './BrokerFAQTabScreen';
import { BrokerCommunityTabScreen } from './BrokerCommunityTabScreen';

interface Props {
    navigation: any;
    route: any;
}

const Tab: any = createMaterialTopTabNavigator();

export default function BrokerSupportScreen(props: Props) {

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Support'} navigation={props?.navigation} showNotification />
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: colors.white,
                    inactiveTintColor: colors.gray2,
                    indicatorStyle: {
                        bottom: '14%',
                        width: vw(100),
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
                    name={screenNames?.BROKER_SUPPORT_TAB_SCREEN}
                    component={BrokerSupportTabScreen}
                    options={{
                        tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Support</Text>)
                    }}
                />
                <Tab.Screen
                    name={screenNames?.BROKER_FAQ_TAB_SCREEN}
                    component={BrokerFAQTabScreen}
                    options={{
                        tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>FAQs</Text>)
                    }}
                />
                <Tab.Screen
                    name={screenNames?.BROKER_COMMUNITY_TAB_SCREEN}
                    component={BrokerCommunityTabScreen}
                    options={{
                        tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Community</Text>)
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
        width: vw(100),
    },
    unfocusedText: {
        fontWeight: '300',
        fontSize: vw(15),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.gray2,
        marginTop: vh(1),
        textAlign: 'center',
        width: vw(100),
    }
})