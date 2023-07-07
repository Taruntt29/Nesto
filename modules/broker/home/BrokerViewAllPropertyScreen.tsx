import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import colors from '@nestoHub/utils/colors';
import { screenHeight, vh, vw } from '@nestoHub/utils/dimensions';
import { SearchView } from '@nestoHub/components/SearchView';
import fonts from '@nestoHub/utils/fonts';
import { CategoriesCard } from '@nestoHub/components/CategoriesCard';
import localImages from '@nestoHub/utils/localImages';
import { FlashList } from '@shopify/flash-list';
import { BrokerPropertyCard } from '@nestoHub/components/BrokerPropertyCard';
import MapView, { Marker } from 'react-native-maps';
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerViewAllPropertyScreen(props: Props) {

    const { allPropertyCategory } = useSelector((state: any) => state?.brokerHomeReducer)

    const [filterOptions, setFilterOptions] = useState<any>(allPropertyCategory ?? [])
    const [filterOptionsIds, setFilterOptionsIds] = useState<any>([])
    const [searchText, setSearchText] = useState<string>('')
    const [isSwitchOpen, setIsSwitchOpen] = useState<boolean>(false)

    useEffect(() => {
        let temp = [...allPropertyCategory]
        temp = temp?.map((item: any) => ({
            ...item,
            isSelected: false
        }))
        setFilterOptions(temp)
        setFilterOptionsIds(temp?.map((item: any) => item?._id))
    }, [])


    const onChangeText = (text: string) => setSearchText(text)

    const onPressSwitch = () => setIsSwitchOpen(!isSwitchOpen)

    const renderItem = useCallback(({ item }: any) => {
        if (filterOptionsIds?.includes(item?.propertyType?._id))
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
                    isBestSelling={item?.isBestSelling}
                    item={item}
                    navigation={props?.navigation}
                    extraStyle={{ marginRight: vw(18), marginTop: vh(5) }}
                />
            )
        else
            return null
    }, [props, isSwitchOpen, filterOptions])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [props, isSwitchOpen, filterOptions])

    const CustomMaps = memo(() => {

        const onPressFilter = (index: any) => {
            let temp = [...filterOptions]
            temp[index] = {
                ...temp[index],
                isSelected: !temp[index]?.isSelected
            }
            setFilterOptions(temp)
            setFilterOptionsIds(temp?.map((item: any) => item?._id))
        }

        return (
            <View>
                <ScrollView style={styles.filterView} horizontal showsHorizontalScrollIndicator={false}>
                    {
                        filterOptions?.map((item: any, index: any) => {
                            return (
                                <TouchableOpacity style={item?.isSelected ? styles.filterBtn : { ...styles.filterBtn, backgroundColor: colors.white, borderWidth: vw(0.5) }} onPress={() => onPressFilter(index)}>
                                    <Text style={item?.isSelected ? styles.selectedFilterBtnText : styles.unselectedFilterBtnText}>{item?.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                <MapView
                    style={{ width: '108%', height: '96%', alignSelf: 'center' }}
                    initialRegion={{
                        latitude: 28.6274440,
                        longitude: 77.2842630,
                        latitudeDelta: 2,
                        longitudeDelta: 2,
                    }}
                >
                    {
                        props?.route?.params?.data?.map((item: any) => {
                            return (
                                <Marker
                                    key={0}
                                    coordinate={{
                                        latitude: parseFloat(item?.latitude?.split('°')?.[0]),
                                        longitude: parseFloat(item?.longitude?.split('°')?.[0])
                                    }}
                                    title={item?.name}
                                // description={'description'}
                                >
                                    <FastImage source={localImages?.PIN1} style={styles.pinImg} resizeMode={'contain'} />
                                </Marker>
                            )
                        })
                    }
                </MapView>
            </View>
        )
    })

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={props?.route?.params?.title ?? ''} showEye showNotification navigation={props?.navigation} />
            <ScrollView contentContainerStyle={isSwitchOpen ? { ...styles.mainContainer, flex: 1 } : styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: vh(25) }}>
                    <TouchableOpacity style={isSwitchOpen ? { ...styles?.switchBtn, borderColor: colors.black, backgroundColor: colors.black } : styles?.switchBtn} onPress={onPressSwitch} activeOpacity={0.8}>
                        {!isSwitchOpen ? <View style={styles.switchCircle} /> : null}
                        <Text style={isSwitchOpen ? { ...styles.switchText, color: colors.white } : styles.switchText}>{isSwitchOpen ? 'List' : 'Map'}</Text>
                        {isSwitchOpen ? <View style={{ ...styles.switchCircle, backgroundColor: colors?.white }} /> : null}
                    </TouchableOpacity>
                    <SearchView searchText={searchText} onChangeText={onChangeText} textInputStyle={styles?.textInputStyle} extraStyle={{ marginTop: vh(0) }} filter />
                </View>
                {
                    isSwitchOpen ? <CustomMaps /> : props?.route?.params?.fromCategoriesCard ? null : <CategoriesCard navigation={props?.navigation} />
                }
                <View style={isSwitchOpen ? { position: 'absolute', top: screenHeight - vh(320), alignSelf: 'center', height: vh(150), width: '100%' } : { marginTop: vh(20) }}>
                    {
                        !isSwitchOpen ? props?.route?.params?.data?.map((item: any) => {
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
                                    isBestSelling={item?.isBestSelling}
                                    item={item}
                                    navigation={props?.navigation}
                                    extraStyle={isSwitchOpen ? { marginRight: vw(18) } : { marginTop: vh(10) }}
                                />
                            )
                        })
                            :
                            <FlashList
                                estimatedItemSize={50}
                                data={props?.route?.params?.data ?? []}
                                renderItem={renderItem}
                                keyExtractor={keyExtractor}
                                removeClippedSubviews={false}
                                showsVerticalScrollIndicator={false}
                                nestedScrollEnabled
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                    }
                </View>
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
        paddingBottom: vh(50),
    },
    switchBtn: {
        width: vw(50),
        marginRight: vw(5),
        borderRadius: vw(100),
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: vw(6),
        paddingVertical: vh(4.5),

        borderWidth: vw(1),
        borderColor: colors.gray5,
    },
    textInputStyle: {
        width: vw(175)
    },
    switchCircle: {
        width: vw(10),
        height: vw(10),
        borderRadius: vw(100),
        backgroundColor: colors.gray5,
    },
    switchText: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.gray5
    },
    pinImg: {
        width: vw(50),
        height: vh(30)
    },
    filterView: {
        position: 'absolute',
        top: vh(20),
        zIndex: 10
    },
    filterBtn: {
        paddingVertical: vh(7.5),
        paddingHorizontal: vw(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: vw(100),
        backgroundColor: colors.customBlue,
        marginRight: vw(14)
    },
    selectedFilterBtnText: {
        fontWeight: '400',
        fontSize: vw(9),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.white
    },
    unselectedFilterBtnText: {
        fontWeight: '300',
        fontSize: vw(9),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.black
    }
})