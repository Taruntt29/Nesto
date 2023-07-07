import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { memo, useCallback, useEffect } from 'react'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import colors from '@nestoHub/utils/colors';
import { screenWidth, vh, vw } from '@nestoHub/utils/dimensions';
import fonts from '@nestoHub/utils/fonts';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import { FewPropertyListing } from '@nestoHub/components/FewPropertyListing';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { FlashList } from '@shopify/flash-list';
import { BrokerPropertyCard } from '@nestoHub/components/BrokerPropertyCard';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPropertiesForBuilder } from '@nestoHub/actions';
interface Props {
    navigation: any;
    route: any;
}

const Tab: any = createMaterialTopTabNavigator();

export default function BrokerAboutTheScreen(props: Props) {
    const { name, img, rating, title, description } = props?.route?.params
    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={`About the ${title ?? ''}`} showEye showNotification navigation={props?.navigation} />
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
                    name={'DESCRIPTION'}
                    component={() => {
                        return (
                            <Description title={title} img={img} name={name} rating={rating} description={description} />
                        )
                    }}
                    options={{
                        tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>Description</Text>)
                    }}
                />
                <Tab.Screen
                    name={'PROJECTS'}
                    component={() => {
                        return (
                            <Projects title={title} img={img} name={name} rating={rating} description={description} specifications={props?.route?.params?.specifications} data={props?.route?.params?.data} navigation={props?.navigation} builderId={props?.route?.params?.builderId} />
                        )
                    }}
                    initialParams={{ navigation: props?.navigation }}
                    options={{
                        tabBarLabel: ({ focused }: any) => (<Text style={focused ? styles.focusedText : styles.unfocusedText}>{title === 'Project' ? 'Specifications' : 'Projects'}</Text>)
                    }}
                />
            </Tab.Navigator>
        </SafeAreaView>
    )
}

const Description = memo(({ title, name, img, rating, description }: any) => {
    return (
        <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: vh(20) }}>
                <FastImage source={{ uri: img }} style={{ width: vw(55), height: vw(55), borderRadius: vw(100) }} />
                <View style={{ marginLeft: vw(13.7) }}>
                    <Text style={styles?.nameText}>{name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(11) }}>
                        {
                            //@ts-ignore
                            [...Array(rating ?? 0).keys()]?.map((item: any) => {
                                return (
                                    <FastImage source={localImages?.STAR} style={{ width: vw(10), height: vw(10), marginRight: vw(5.5) }} resizeMode={'contain'} />
                                )
                            })
                        }
                        {
                            //@ts-ignore
                            [...Array(5 - (rating ?? 0)).keys()]?.map((item: any) => {
                                return (
                                    <FastImage source={localImages?.STAR} style={{ width: vw(10), height: vw(10), marginRight: vw(5.5) }} resizeMode={'contain'} tintColor={colors.gray2} />
                                )
                            })
                        }
                    </View>
                </View>
            </View>
            <Text style={styles.description}>{description}</Text>
        </ScrollView>
    )
})

const Projects = memo(({ title, name, img, rating, description, specifications, data, navigation, builderId }: any) => {
    const dispatch: any = useDispatch()

    const { allProperties } = useSelector((state: any) => state?.builderHomeReducer)

    useEffect(() => {
        dispatch(getAllPropertiesForBuilder({ builderId }, (data: any) => { }))
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: vh(20) }}>
                <FastImage source={{ uri: img }} style={{ width: vw(55), height: vw(55), borderRadius: vw(100) }} />
                <View style={{ marginLeft: vw(13.7) }}>
                    <Text style={styles?.nameText}>{name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(11) }}>
                        {
                            //@ts-ignore
                            [...Array(rating ?? 0).keys()]?.map((item: any) => {
                                return (
                                    <FastImage source={localImages?.STAR} style={{ width: vw(10), height: vw(10), marginRight: vw(5.5) }} resizeMode={'contain'} />
                                )
                            })
                        }
                        {
                            //@ts-ignore
                            [...Array(5 - (rating ?? 0)).keys()]?.map((item: any) => {
                                return (
                                    <FastImage source={localImages?.STAR} style={{ width: vw(10), height: vw(10), marginRight: vw(5.5) }} resizeMode={'contain'} tintColor={colors.gray2} />
                                )
                            })
                        }
                    </View>
                </View>
            </View>
            {
                title === 'Project' ?
                    <View>
                        {
                            specifications?.map((item: any) => {
                                return (
                                    <Text>{item}</Text>
                                )
                            })
                        }
                    </View> :
                    allProperties?.slice(0, 5)?.map((item: any) => {
                        return (
                            <BrokerPropertyCard
                                brokerage={item?.brokerageValue ?? '' + '%'}
                                homeImagesArray={item?.images ?? []}
                                title={item?.name ?? ''}
                                subTitle={item?.location ?? ''}
                                availableType={item?.unitType ?? []}
                                minPrice={item?.minPrice ?? ''}
                                maxPrice={item?.maxPrice ?? ''}
                                pricePerVisit={'Rs 500'}
                                percentagediscount={item?.discountDescription ?? ''}
                                isBestSelling={item?.isBestSelling ?? false}
                                item={item ?? {}}
                                navigation={navigation ?? {}}
                            />
                        )
                    })
            }
        </ScrollView>
    )
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    mainContainer: {
        paddingHorizontal: vw(12.6),
        paddingBottom: vh(50),
        backgroundColor: colors.white,
        // flex: 1
    },
    nameText: {
        fontWeight: '700',
        fontSize: vw(16),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.black
    },
    description: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.gray2,
        marginTop: vh(11),
        lineHeight: vh(16)
    },
    focusedText: {
        fontWeight: '700',
        fontSize: vw(15),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.white,
        marginTop: vh(1),
        textAlign: 'center',
        width: vw(100)
    },
    unfocusedText: {
        fontWeight: '300',
        fontSize: vw(15),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.gray2,
        marginTop: vh(1),
        textAlign: 'center',
        width: vw(100)
    }
})