import { ImageBackground, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import colors from '@nestoHub/utils/colors';
import { screenWidth, vh, vw } from '@nestoHub/utils/dimensions';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import FastImage from 'react-native-fast-image'
import { BrokerBlueLabel } from '@nestoHub/components/BrokerBlueLabel';
import localImages from '@nestoHub/utils/localImages';
import { BrokerPropertyHorizontalCard } from '@nestoHub/components/BrokerPropertyHorizontalCard';
import fonts from '@nestoHub/utils/fonts';
import { FlashList } from '@shopify/flash-list';
import { CustomButton } from '@nestoHub/components/CustomButton';
import screenNames from '@nestoHub/utils/screenNames';
import { BrokerRatingsCard } from '@nestoHub/components/BrokerRatingsCard';
import { CustomActivityModal } from '@nestoHub/components/CustomActivityModal';
import Swiper from 'react-native-swiper';
import { CustomChartView } from '@nestoHub/components/CustomChartView';
import { useDispatch, useSelector } from 'react-redux';
import { getAllFloorPlansAndPricing, getAllPropertiesForBroker, getAllVisit, getPropertyById, updateLoaderState } from '@nestoHub/actions';
import MapView from 'react-native-maps';
import { ShareModalContent } from '@nestoHub/components/ShareModalContent';
import { BrokerBookVisit } from '@nestoHub/components/BrokerBookVisit';

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerPropertyDescriptionScreen(props: Props) {

    const dispatch: any = useDispatch()

    const { isEyeOpen, allSimilarProperties, allRecommendedProperties } = useSelector((state: any) => state?.brokerHomeReducer)
    const { _id } = useSelector((state: any) => state?.authReducer)

    const [availableFlatTypes, setAvailableFlatTypes] = useState<any>([])
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const [isBrokerVisitVisible, setIsBrokerVisitVisible] = useState<boolean>(false)
    const [isImageSliderModalVisible, setIsImageSliderModalVisible] = useState<boolean>(false)
    const [propertyData, setPropertyData] = useState<any>(null)
    const [ratingsData, setratingsData] = useState<any>([])
    const [floorPlansData, setFloorPlansData] = useState<any>([])

    useEffect(() => {
        dispatch(updateLoaderState(true))
        let payload = {
            id: props?.route?.params?.propertyId ?? ''
        }
        dispatch(getPropertyById(payload, (data: any) => {
            setPropertyData(data?.data?.[0])
            setAvailableFlatTypes(data?.data?.[0]?.unitType?.map((item: any) => ({
                title: item,
                isSelected: false
            })))
            let payload1 = {
                propertyId: data?.data?.[0]?._id ?? ''
            }
            dispatch(getAllVisit(payload1, (data: any) => {
                setratingsData(data?.data)
            }))
            dispatch(getAllPropertiesForBroker({ propertyType: data?.data?.[0]?.propertyType?._id }, (data: any) => { }))
            dispatch(getAllPropertiesForBroker({ isRecommended: true }, (data: any) => { }))
            dispatch(updateLoaderState(false))
        }))
    }, [props])

    useEffect(() => {
        dispatch(getAllFloorPlansAndPricing({ id: props?.route?.params?.propertyId ?? '', unitType: availableFlatTypes?.filter((item: any) => item?.isSelected)?.map((item: any) => item?.title ?? '') }, (data: any) => {
            setFloorPlansData(data?.data ?? [])
        }))
    }, [availableFlatTypes])

    const FloorPlan = memo(() => {

        const onPressBhkType = (index: number) => {
            let temp = [...availableFlatTypes]
            temp[index] = {
                ...temp[index],
                isSelected: !temp[index]?.isSelected
            }
            setAvailableFlatTypes(temp)
        }

        return (
            <View>
                <Text style={styles.floorPlansHeading}>{`Floor Plans & Pricing`}</Text>
                <ScrollView horizontal style={{ marginTop: vh(15) }} bounces={false} showsHorizontalScrollIndicator={false}>
                    {
                        availableFlatTypes?.map((item: any, index: any) => {
                            return (
                                <TouchableOpacity style={(item?.isSelected) ? { ...styles.flatSelectionBtn, backgroundColor: colors.customBlue, borderColor: colors.customBlue } : styles.flatSelectionBtn} onPress={() => onPressBhkType(index)}>
                                    <Text style={(item?.isSelected) ? { ...styles.flatSelectionText, color: colors.white } : styles.flatSelectionText}>{item?.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
                <ScrollView horizontal style={{ marginTop: vh(15), paddingLeft: vw(2) }} bounces={false} showsHorizontalScrollIndicator={false}>
                    {
                        floorPlansData?.map((item: any, index: any) => {
                            return (
                                <TouchableOpacity style={styles.floorPlanView} onPress={() => { props?.navigation?.navigate(screenNames?.BROKER_FLOOR_PLAN_DETAIL_SCREEN, { floorPlansData: item ?? {}, propertyData: { _id: propertyData?._id, name: propertyData?.name, builderId: propertyData?.builderId?._id } }) }}>
                                    <ImageBackground source={{ uri: item?.floorPlanImageUrl ?? '' }} style={styles.floorPlanImage} imageStyle={{ borderRadius: vw(11.5) }} resizeMode='cover'>
                                        <View style={styles.overlayFloor} />
                                    </ImageBackground>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(5.8) }}>
                                        <Text style={styles.builtUpAreaText}>Super Built-Up Area</Text>
                                        <Text style={styles.builtUpAreaText}>Price</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(3.5) }}>
                                        <Text style={styles.sqftText}>{item?.areaSquareFeet}</Text>
                                        <Text style={styles.sqftText}>{item?.price} <Text style={styles.builtUpAreaText}>{item?.onesqft}</Text></Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(5.5) }}>
                                        <Text style={{ ...styles.builtUpAreaText, color: colors.customBlue }}>({item?.areaSquareMeter})</Text>
                                        <Text style={{ ...styles.builtUpAreaText, color: colors.customBlue }}>+Govt. Charges</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    })

    const FlatsView = memo(() => {
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(18) }}>
                    {
                        propertyData?.unitType?.map((item: any) => {
                            return (
                                <View style={{ marginRight: vw(18.2), alignItems: 'center' }}>
                                    <FastImage source={localImages?.FLATS} style={{ width: vw(15), height: vw(15) }} resizeMode={'contain'} tintColor={colors.gray2} />
                                    <Text style={styles.bhkText}>{item}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                {isEyeOpen ? <View style={styles.priceVisitView}><Text style={styles.priceVisitText}>Get upto ₹{propertyData?.visitBrokerage ?? ''} Per Visit</Text></View> : null}
            </View>
        )
    })

    const Headerview = memo(() => {

        const onPressShare = () => setIsVisible(true)

        const renderModalContent = useCallback(() => {
            return (
                <ShareModalContent setIsVisible={(value: any) => setIsVisible(value)} propertyId={propertyData?._id} brokerId={_id} brochureUrl={propertyData?.brochureUrl} />
            )
        }, [])

        return (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(20.5) }}>
                <FastImage source={{ uri: propertyData?.builderId?.profilePictureUrl ?? '' }} style={styles.homeProfileImage} />
                <View style={{ marginLeft: vw(10), width: vw(225) }}>
                    <Text style={styles.title}>{propertyData?.name ?? ''}</Text>
                    <Text style={styles.subTitle}>{propertyData?.location ?? ''}</Text>
                </View>
                <View style={{ alignSelf: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {
                            //@ts-ignore
                            [...Array(parseInt(propertyData?.builderId?.rating ?? 0)).keys()]?.map((item: any) => {
                                return (
                                    <FastImage source={localImages?.STAR} style={styles.starImage} resizeMode={'contain'} />
                                )
                            })
                        }
                        {
                            //@ts-ignore
                            [...Array(5 - parseInt((propertyData?.builderId?.rating ?? 0))).keys()]?.map((item: any) => {
                                return (
                                    <FastImage source={localImages?.STAR} style={styles.starImage} resizeMode={'contain'} tintColor={colors.gray2} />
                                )
                            })
                        }
                    </View>
                    <TouchableOpacity style={styles.shareBtn} onPress={onPressShare}>
                        <FastImage source={localImages?.SHARE} style={styles.shareBtnImage} resizeMode={'contain'} />
                    </TouchableOpacity>
                </View>
                <CustomActivityModal
                    renderModalContent={renderModalContent}
                    isVisible={isVisible}
                    setIsVisible={(val: boolean) => setIsVisible(val)}
                />
            </View>
        )
    })

    const PropertyStatusLabel = memo(({ label, icon }: any) => {
        return (
            <View style={styles.propertyLabelView}>
                <Text style={styles.propertyLabelText}>{label}</Text>
                {icon ? <FastImage source={icon} style={styles.propertyLabelImage} resizeMode={'contain'} /> : null}
            </View>
        )
    })

    const ImageView = memo(() => {

        const ImageSliderModal = memo(() => {

            const onRequestClose = () => setIsImageSliderModalVisible(false)

            return (
                <Modal transparent={true} animationType='slide' visible={isImageSliderModalVisible}>
                    <TouchableOpacity onPress={onRequestClose} style={styles.modalBackground} activeOpacity={1}>
                        <TouchableOpacity activeOpacity={1}>
                            <TouchableOpacity style={styles?.crossBtn} onPress={onRequestClose}>
                                <FastImage source={localImages?.CROSS} style={styles?.cross} />
                            </TouchableOpacity>
                            <View style={styles.modalContainer}>
                                <Swiper
                                    containerStyle={{ height: vh(327), width: '100%' }}
                                    dotStyle={styles.dotStyle}
                                    activeDotStyle={styles.activeDotStyle}
                                    loop
                                    key={propertyData?.images?.length}
                                    removeClippedSubviews={false}
                                    scrollEnabled
                                    autoplay
                                >
                                    {
                                        propertyData?.images?.map((item: any) => {
                                            return (
                                                <FastImage source={{ uri: item }} style={styles.swipperImage} />
                                            )
                                        })
                                    }
                                </Swiper>
                            </View>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
            )
        })

        const onPressBigImage = () => setIsImageSliderModalVisible(true)

        return (
            <>
                <TouchableOpacity style={styles.bigImgHolder} activeOpacity={0.8} onPress={onPressBigImage}>
                    <FastImage source={{ uri: propertyData?.images?.[0] }} style={styles.bigImageStyle} />
                    {propertyData?.isRera ? <BrokerBlueLabel labelText='✓ RERA' extraStyle={styles?.reraStyle} /> : null}
                    {isEyeOpen ? <BrokerBlueLabel labelText={`${propertyData?.brokerageValue ?? ''}% Brokerage`} extraStyle={styles?.brokerageStyle} /> : null}
                    {propertyData?.isBestSelling ? <View style={styles.bestsellerView}><Text style={styles.bestsellerText}>Best Seller</Text></View> : null}
                    <TouchableOpacity onPress={onPressBigImage} style={{ ...styles.smallImgHolder, top: vh(130) }} activeOpacity={0.8}>
                        <FastImage source={{ uri: propertyData?.images?.[1] }} style={styles.smallImageStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressBigImage} style={{ ...styles.smallImgHolder, top: vh(190) }} activeOpacity={0.8}>
                        <FastImage source={{ uri: propertyData?.images?.[2] }} style={styles.smallImageStyle} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onPressBigImage} style={{ ...styles.smallImgHolder, top: vh(250) }} activeOpacity={0.8}>
                        <ImageBackground source={{ uri: propertyData?.images?.[3] }} style={styles.smallImageStyle} imageStyle={{ borderRadius: vw(15) }}>
                            <View style={styles.overlay}>
                                <Text style={styles.overlayText} numberOfLines={2}>+{propertyData?.images?.length - 3 ?? 0}</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(8.2) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <PropertyStatusLabel label={propertyData?.constructionStatus ?? ''} />
                        <PropertyStatusLabel label={propertyData?.possessionDate ?? ''} />
                    </View>
                    <PropertyStatusLabel label={'Availability'} icon={localImages?.PDF} />
                </View>
                <ImageSliderModal />
            </>
        )
    })

    const Map = memo(() => {

        const renderItem = useCallback(({ item }: any) => {
            return (
                <View style={styles.mapInnerCard}>
                    <FastImage source={{ uri: item?.iconUrl ?? '' }} style={{ width: vw(50), height: vh(50), alignSelf: 'center', borderRadius: vw(8) }} resizeMode={'contain'} />
                    <View style={{ marginLeft: vw(6) }}>
                        <Text style={styles.mapText1}>{item?.name}</Text>
                        <Text style={styles.mapText2}>{item?.location}</Text>
                        <Text style={styles.mapText3}>{item?.distance}</Text>
                    </View>
                </View>
            )
        }, [props])

        const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [props])

        return (
            <View style={styles.mapView}>
                <MapView
                    style={{ width: '100%', height: vh(205), alignSelf: 'center', borderRadius: vw(10), marginBottom: vh(10) }}
                    initialRegion={{
                        latitude: parseInt(propertyData?.latitude?.split('°')?.[0] ?? 28.6274440),
                        longitude: parseInt(propertyData?.longitude?.split('°')?.[0] ?? 77.2842630),
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0221,
                    }}
                />
                <FlashList
                    estimatedItemSize={15}
                    data={propertyData?.propertyAdvertiseMentDetails ?? []}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    removeClippedSubviews={false}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                    horizontal
                />
            </View>
        )
    })

    const BrokerageView = memo(() => {
        return (
            <View>
                <Text style={styles.floorPlansHeading}>Brokerage Payout Plan</Text>
                <View style={styles.brokerageCard}>
                    <Text style={styles.brokerageText1}>Brokerage {propertyData?.brokerageType === 'amount' ? '₹' : null}{propertyData?.brokerageValue}{propertyData?.brokerageType === 'percentage' ? '%' : null}</Text>
                    <Text style={styles.brokerageText2}>{propertyData?.brokerageTerms ?? ''}</Text>
                </View>
            </View>
        )
    })

    const MilestoneView = memo(() => {
        return (
            <View>
                <Text style={styles.floorPlansHeading}>Milestone</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        [1, 1]?.map((item: any) => {
                            return (
                                <View style={{ ...styles.brokerageCard, marginRight: vw(12) }}>
                                    <Text style={styles.milestoneText1}>Milestone {item}</Text>
                                    <View style={{ flexDirection: 'row', alignItems: "center", width: vw(150), justifyContent: 'space-between', marginTop: vh(6.5) }}>
                                        <View>
                                            <Text style={styles.milestoneText2}>Condition</Text>
                                            <Text style={styles.milestoneText3}>10%</Text>
                                        </View>
                                        <View>
                                            <Text style={styles.milestoneText2}>Brokerage%</Text>
                                            <Text style={styles.milestoneText3}>20%</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </ScrollView>
            </View>
        )
    })

    const AboutView = memo((props: any) => {
        return (
            <>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                    <Text style={styles.floorPlansHeading}>{props?.title}</Text>
                    <TouchableOpacity style={{ marginTop: vh(23.5) }} onPress={props?.onPressViewDetails}>
                        <Text style={styles?.viewDetailsText}>View Details</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles?.aboutCard}>
                    <Text style={styles?.aboutCardText}>{props?.description}</Text>
                </View>
            </>
        )
    })

    const PaymentView = memo(() => {
        return (
            <>
                <Text style={styles.floorPlansHeading}>Payment Plan</Text>
                <View style={styles.paymentCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <View style={{ flex: 0.3, paddingHorizontal: vw(20), paddingVertical: vh(15), borderRightWidth: vw(1), borderColor: colors?.gray5 }}>
                            <Text>Payment %</Text>
                        </View>
                        <View style={{ flex: 0.7, paddingHorizontal: vw(20), paddingVertical: vh(15) }}>
                            <Text>Milestone</Text>
                        </View>
                    </View>
                    {
                        propertyData?.paymentPlan?.map((item: any) => {
                            return (
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, borderTopWidth: vw(1), borderColor: colors?.gray5 }}>
                                    <View style={{ flex: 0.3, paddingHorizontal: vw(20), paddingVertical: vh(15), borderRightWidth: vw(1), borderColor: colors?.gray5 }}>
                                        <Text style={styles?.paymentText1}>{item?.payment}</Text>
                                    </View>
                                    <View style={{ flex: 0.7, paddingHorizontal: vw(20) }}>
                                        <Text style={styles?.paymentText2}>{item?.milestone}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </>
        )
    })

    const BrochureView = memo(() => {
        return (
            <View>
                <Text style={styles.floorPlansHeading}>View official brochure</Text>
                <View style={styles?.brochureCard}>
                    <ImageBackground source={localImages?.BROCHURE} style={{ height: vh(212) }} imageStyle={{ borderRadius: vw(10) }}>
                        <Text style={styles?.brochureText}>{propertyData?.name} Brochure</Text>
                    </ImageBackground>
                </View>
                <CustomButton title='Download Brochure' onPressCustomButton={() => { }} />
            </View>
        )
    })

    const RatingsView = memo((props: any) => {
        const renderItem = useCallback(({ item }: any) => {
            return (
                <BrokerRatingsCard item={item} />
            )
        }, [props])

        const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [props])

        const ItemSeparatorComponent = () => {
            return (
                <View style={styles.seperator} />
            )
        }

        return (
            <View>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                    <Text style={styles.floorPlansHeading}>Ratings</Text>
                    <TouchableOpacity style={{ marginTop: vh(23.5) }} onPress={props?.onPressViewDetails}>
                        <Text style={styles?.viewDetailsText}>View All</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.ratingCard}>
                    <FlashList
                        estimatedItemSize={50}
                        data={ratingsData?.slice?.(0, 3) ?? []}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        ItemSeparatorComponent={ItemSeparatorComponent}
                        removeClippedSubviews={false}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
                    />
                </View>
            </View>
        )
    })

    const TrendingView = memo(() => {
        return (
            <ImageBackground
                source={{ uri: 'https://homezonline.in/wp-content/uploads/2022/07/Gorgeous-one-floor-home-design.jpeg' }}
                style={styles.imgBackgroundStyle}
                imageStyle={styles.imgStyle}>
                <View style={styles.imgOverlay}>
                    <Text style={styles.imgTitle} numberOfLines={2}>Trending</Text>
                    <Text style={styles.imgSubTitle}>Vermont Farmhouse With Antique Jail Is the Week's Most Popular Home</Text>
                </View>
            </ImageBackground>
        )
    })

    const PropertyView = memo((props: any) => {

        const onPressPropertyDescription = (id: any) => {
            props?.navigation?.push(screenNames?.BROKER_PROPERTY_DESCRIPTION_SCREEN, { propertyId: id })
        }

        const renderItem = useCallback(({ item }: any) => {
            return (
                <View style={styles.propertyCard}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => onPressPropertyDescription(item?._id)}>
                        <FastImage source={{ uri: item?.thumbnail }} style={{ width: vw(158), height: vh(109), alignSelf: 'center', borderRadius: vw(8) }} />
                        <Text style={styles.propertyText1}>{item?.name}</Text>
                        <Text style={styles.propertyText2}>Modern House</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(10) }}>
                        <Text style={styles.propertyText3}>{item?.location}</Text>
                        <TouchableOpacity style={styles.propertyBtn}>
                            <Text style={styles.propertyBtnText}>Book Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }, [props])

        const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [props])

        const onPressViewAll = () => props?.navigation?.navigate(screenNames?.BROKER_VIEW_ALL_PROPERTY_SCREEN, { title: props?.title, data: props?.data })

        return (
            <>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                    <Text style={styles.floorPlansHeading}>{props?.title}</Text>
                    <TouchableOpacity style={{ marginTop: vh(23.5) }} onPress={onPressViewAll}>
                        <Text style={styles?.viewDetailsText}>View All</Text>
                    </TouchableOpacity>
                </View>
                <FlashList
                    estimatedItemSize={50}
                    data={props?.data?.slice(0, 5) ?? []}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    removeClippedSubviews={false}
                    showsHorizontalScrollIndicator={false}
                    nestedScrollEnabled
                    horizontal
                />
            </>
        )
    })

    const onPressBookVisit = () => setIsBrokerVisitVisible(true)

    const renderBrokerVisitModalContent = useCallback(() => {
        return (
            <BrokerBookVisit
                propertyName={propertyData?.name ?? ''}
                propertyId={propertyData?._id ?? ''}
                builderId={propertyData?.builderId?._id ?? ''}
                navigation={props?.navigation}
                onRequestClose={() => setIsBrokerVisitVisible(false)}
            />
        )
    }, [propertyData])

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Property Description'} showEye showNotification navigation={props?.navigation} />
            <ScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <ImageView />
                <Headerview />
                <FlatsView />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Platform?.OS === 'android' ? vh(22) : vh(16), justifyContent: 'space-between' }}>
                    <View style={{ maxWidth: vw(250) }}>
                        <Text style={styles.priceRangeText} numberOfLines={1}>{`${propertyData?.minPrice} - ${propertyData?.maxPrice}`}</Text>
                        <Text style={styles.discountText} numberOfLines={1}>{`Book now & get ${propertyData?.brokerageValue}% discount`}</Text>
                    </View>
                    <TouchableOpacity style={styles.bookVisitBtn} onPress={onPressBookVisit}>
                        <Text style={styles.bookVisitBtnText}>Book Visit</Text>
                    </TouchableOpacity>
                </View>
                <FloorPlan />
                {
                    propertyData?.amenities?.length ?
                        <BrokerPropertyHorizontalCard
                            title='Project Amenities'
                            itemList={propertyData?.amenities ?? []}
                            iconStyle={styles?.amenitiesIcon}
                            viewAll
                        /> : null
                }
                {
                    propertyData?.locationAdvantages?.length ?
                        <BrokerPropertyHorizontalCard
                            title='Location Advantages'
                            itemList={propertyData?.locationAdvantages ?? []}
                            iconStyle={styles?.advantagesIcon}
                            extraTextStyle={styles?.advantagesText}
                            viewAll
                        /> : null
                }
                <Map />
                {
                    isEyeOpen ?
                        <>
                            <BrokerageView />
                            <MilestoneView />
                        </>
                        : null
                }
                <AboutView
                    title={'About the Project'}
                    onPressViewDetails={() => { props?.navigation?.navigate(screenNames?.BROKER_ABOUT_THE_SCREEN, { title: 'Project', name: propertyData?.name ?? '', img: propertyData?.builderId?.profilePictureUrl ?? '', rating: propertyData?.builderId?.rating, description: propertyData?.propertyDescription ?? '', specifications: [] }) }}
                    description={propertyData?.propertyDescription ?? ''}
                />
                {isEyeOpen ? <PaymentView /> : null}
                <BrokerPropertyHorizontalCard
                    title='Loan Approved By'
                    itemList={propertyData?.loanApprovedByIds}
                    iconStyle={styles?.loanIcon}
                    viewAll
                />
                <AboutView
                    title={'About the Builder'}
                    onPressViewDetails={() => { props?.navigation?.navigate(screenNames?.BROKER_ABOUT_THE_SCREEN, { title: 'Builder', name: propertyData?.builderId?.name ?? '', img: propertyData?.builderId?.profilePictureUrl ?? '', rating: propertyData?.builderId?.rating, description: propertyData?.builderId?.description ?? '', data: [], builderId: propertyData?.builderId?._id }) }}
                    description={propertyData?.builderId?.description}
                />
                <BrochureView />
                <CustomChartView />
                <RatingsView onPressViewDetails={() => { props?.navigation?.navigate(screenNames?.BROKER_RATINGS_SCREEN, { data: ratingsData }) }} />
                <AboutView
                    title={'Terms & Conditions'}
                    onPressViewDetails={() => { props?.navigation?.navigate(screenNames?.BROKER_TERMS_AND_CONDITIONS_SCREEN, { fromScreen: screenNames?.BROKER_PROPERTY_DESCRIPTION_SCREEN, data: propertyData?.termAndCondition ?? '' }) }}
                    description={propertyData?.termAndCondition ?? ''}
                />
                <TrendingView />
                <PropertyView title={'Similar Properties'} data={allSimilarProperties ?? []} navigation={props?.navigation} />
                <PropertyView title={'Recommended Properties'} data={allRecommendedProperties ?? []} navigation={props?.navigation} />
            </ScrollView>
            <CustomActivityModal
                renderModalContent={renderBrokerVisitModalContent}
                isVisible={isBrokerVisitVisible}
                setIsVisible={(val: boolean) => setIsBrokerVisitVisible(val)}
            />
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
    bigImgHolder: {
        height: vh(320),
        width: screenWidth - vw(25.2),
        alignSelf: 'center',
        backgroundColor: colors.white,
        borderRadius: vw(20),
        padding: vw(5),
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
        marginTop: vh(30)
    },
    bigImageStyle: {
        height: vh(310),
        width: screenWidth - vw(35.2),
        borderRadius: vw(20),
    },
    reraStyle: {
        position: 'absolute',
        top: vh(20.5),
        left: 0
    },
    brokerageStyle: {
        position: 'absolute',
        top: vh(40),
        left: 0
    },
    bestsellerView: {
        borderRadius: vw(2.5),
        backgroundColor: colors.cutomYellow,
        paddingHorizontal: vw(17),
        paddingVertical: vh(3),
        alignSelf: 'flex-start',
        position: 'absolute',
        top: vh(6),
        right: 0
    },
    bestsellerText: {
        fontSize: vw(7),
        fontWeight: '600',
        color: colors?.black,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    smallImgHolder: {
        height: vw(50),
        width: vw(50),
        backgroundColor: colors.white,
        borderRadius: vw(15),
        padding: vw(2.5),
        position: 'absolute',
        right: vw(12),
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.3,
        shadowRadius: 3.84,
        elevation: 5,
    },
    smallImageStyle: {
        height: vw(45),
        width: vw(45),
        borderRadius: vw(15),
    },
    overlay: {
        backgroundColor: colors.TRANSPARENT_DARK_GREY,
        width: '100%',
        height: '100%',
        borderRadius: vw(15),
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlayText: {
        textAlign: 'center',
        color: colors.white,
        fontSize: vw(15),
        fontWeight: '500',
        fontFamily: fonts?.BAHNSCHRIFT
    },
    propertyLabelView: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: vw(7.2),
        paddingVertical: vh(5),
        backgroundColor: colors?.gray3,
        borderRadius: vw(4)
    },
    propertyLabelText: {
        fontSize: vw(8),
        fontWeight: '600',
        color: colors?.gray2,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    propertyLabelImage: {
        width: vw(12),
        height: vw(12),
        marginLeft: vh(4.7)
    },
    shareBtn: {
        backgroundColor: colors.gray7,
        padding: vw(6.5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: vw(100),
        alignSelf: 'flex-end',
        marginTop: vh(5.7)
    },
    shareBtnImage: {
        width: vw(13.5),
        height: vh(15.5)
    },
    starImage: {
        width: vw(10),
        height: vh(10),
        marginRight: vw(2.5)
    },
    homeProfileImage: {
        width: vw(55),
        height: vw(55),
        borderRadius: vw(100)
    },
    title: {
        fontSize: vw(16),
        fontWeight: '700',
        maxWidth: vw(220),
        color: colors?.black,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    subTitle: {
        fontSize: vw(11),
        fontWeight: '400',
        color: colors?.gray2,
        marginTop: vh(6.5),
        maxWidth: vw(220),
        fontFamily: fonts?.BAHNSCHRIFT
    },
    bhkText: {
        fontSize: vw(12),
        fontWeight: '400',
        marginTop: vh(3.7),
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    priceVisitView: {
        borderTopLeftRadius: vw(2.2),
        borderBottomLeftRadius: vw(2.2),
        paddingVertical: vh(2),
        width: vw(96),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.customRed,
        alignSelf: 'flex-end'
    },
    priceVisitText: {
        fontSize: vw(8),
        fontWeight: '600',
        color: colors.white,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    flatSelectionBtn: {
        paddingHorizontal: vw(12),
        paddingVertical: vh(6),
        borderRadius: vw(50),
        borderWidth: vw(0.6),
        borderColor: colors.gray5,
        backgroundColor: colors.gray3,
        marginRight: vw(8)
    },
    flatSelectionText: {
        fontWeight: '300',
        fontSize: vw(10),
        color: colors?.black,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    floorPlansHeading: {
        fontWeight: '700',
        fontSize: vw(14),
        marginTop: vh(23.5),
        color: colors?.black,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    floorPlanView: {
        marginVertical: vh(2),
        padding: vw(7),
        backgroundColor: colors.white,
        borderRadius: vw(11.5),
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 2,
        marginRight: vw(11),
        marginLeft: vw(1),
        marginBottom: vh(10)
    },
    floorPlanImage: {
        width: vw(157.8),
        height: vh(116.8),
        borderRadius: vw(11.5)
    },
    builtUpAreaText: {
        fontWeight: '400',
        fontSize: vw(8),
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    sqftText: {
        fontWeight: '700',
        fontSize: vw(10),
        color: colors?.black,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    overlayFloor: {
        backgroundColor: colors.TRANSPARENT_DARK_GREY,
        width: '100%',
        height: '100%',
        borderRadius: vw(11.5),
    },
    amenitiesIcon: {
        width: vw(16),
        height: vh(16)
    },
    advantagesIcon: {
        width: vw(16),
        height: vh(16)
    },
    advantagesText: {
        fontWeight: '300',
        fontSize: vw(11),
        color: colors?.black,
        fontFamily: fonts?.BAHNSCHRIFT,
        marginTop: vh(9)
    },
    loanIcon: {
        width: vw(50),
        height: vh(50)
    },
    mapView: {
        padding: vw(10),
        borderRadius: vw(10),
        borderWidth: vw(1),
        borderColor: colors.gray5,
        marginTop: vh(23)
    },
    mapInnerCard: {
        padding: vw(8),
        borderRadius: vw(8),
        borderWidth: vw(1),
        borderColor: colors.gray5,
        marginRight: vw(8),
        flexDirection: 'row',
        alignItems: "center",
    },
    mapText1: {
        fontWeight: '700',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black
    },
    mapText2: {
        fontWeight: '400',
        fontSize: vw(8),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.gray2
    },
    mapText3: {
        fontWeight: '300',
        fontSize: vw(8),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.gray2
    },
    brokerageCard: {
        padding: vw(8),
        borderRadius: vw(8),
        borderWidth: vw(1),
        borderColor: colors.gray5,
        marginTop: vh(11.5)
    },
    brokerageText1: {
        fontWeight: '600',
        fontSize: vw(14),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black
    },
    brokerageText2: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.gray2,
        marginTop: vh(5)
    },
    milestoneText1: {
        fontWeight: '600',
        fontSize: vw(14),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black
    },
    milestoneText2: {
        fontWeight: '400',
        fontSize: vw(9),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.gray2
    },
    milestoneText3: {
        fontWeight: '400',
        fontSize: vw(12),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
        marginTop: vh(5.3)
    },
    viewDetailsText: {
        fontWeight: '700',
        fontSize: vw(10),
        color: colors.customRed,
        fontFamily: fonts?.BAHNSCHRIFT
    },
    aboutCard: {
        padding: vw(12),
        borderRadius: vw(10),
        borderWidth: vw(1),
        borderColor: colors.gray5,
        marginTop: vh(15)
    },
    aboutCardText: {
        fontWeight: '400',
        fontSize: vw(12),
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT,
        lineHeight: vh(20)
    },
    paymentCard: {
        paddingHorizontal: vw(12),
        borderRadius: vw(10),
        borderWidth: vw(1),
        borderColor: colors.gray5,
        marginTop: vh(15),
    },
    paymentText1: {
        fontWeight: '300',
        fontSize: vw(10),
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT,
        textAlign: 'center'
    },
    paymentText2: {
        fontWeight: '300',
        fontSize: vw(10),
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT,
        lineHeight: vh(16)
    },
    brochureCard: {
        padding: vw(12),
        borderRadius: vw(10),
        marginTop: vh(15),
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 2,
    },
    brochureText: {
        fontWeight: '600',
        fontSize: vw(15),
        color: colors.white,
        fontFamily: fonts?.BAHNSCHRIFT,
        position: 'absolute',
        bottom: vh(10),
        left: vw(11)
    },
    imgBackgroundStyle: {
        alignSelf: 'center',
        width: screenWidth - vw(25.2),
        height: vh(167),
        marginTop: vh(30),
    },
    imgStyle: {
        borderRadius: vw(10),
    },
    imgOverlay: {
        backgroundColor: colors.TRANSPARENT_DARK_GREY,
        width: '100%',
        height: '100%',
        borderRadius: vw(10),
        justifyContent: 'center',
        paddingHorizontal: vw(27),
        alignItems: 'center',
    },
    imgTitle: {
        fontSize: vw(8),
        fontWeight: '400',
        color: colors.white,
        maxWidth: vw(150),
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    imgSubTitle: {
        fontSize: vw(12),
        fontWeight: '700',
        color: colors.white,
        lineHeight: vh(17),
        marginTop: vh(6.5),
        textAlign: 'center',
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    propertyCard: {
        padding: vw(10),
        borderRadius: vw(10),
        marginTop: vh(6),
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 2,
        marginHorizontal: vw(1),
        marginRight: vw(15),
        marginBottom: vh(5)
    },
    propertyText1: {
        fontSize: vw(12),
        fontWeight: '700',
        color: colors.black,
        fontFamily: fonts?.BAHNSCHRIFT,
        marginTop: vh(3.8)
    },
    propertyText2: {
        fontSize: vw(10),
        fontWeight: '400',
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT,
        marginTop: vh(10)
    },
    propertyText3: {
        fontSize: vw(9),
        fontWeight: '600',
        color: colors.black,
        fontFamily: fonts?.BAHNSCHRIFT,
        width: vw(90)
    },
    ratingCard: {
        padding: vw(10),
        borderRadius: vw(10),
        marginTop: vh(15),
        backgroundColor: colors.white,
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 2,
    },
    seperator: {
        borderBottomWidth: vw(0.5),
        borderColor: colors.gray2
    },
    propertyBtn: {
        borderRadius: vw(6),
        borderColor: colors?.customRed,
        borderWidth: vw(1),
        paddingVertical: vh(8),
        width: vw(62),
        alignItems: 'center'
    },
    propertyBtnText: {
        fontSize: vw(8),
        fontWeight: '400',
        color: colors.customRed,
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    heading: {
        fontWeight: '600',
        fontSize: vw(20),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
        textAlign: 'center'
    },
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: 'rgba(0,0,0,0.6)',
    },
    modalContainer: {
        borderRadius: vw(30),
        backgroundColor: 'white',
        padding: vw(9),
        justifyContent: 'center',
        alignItems: 'center',
        width: screenWidth - vw(32),
        height: vh(330)
    },
    crossBtn: {
        alignSelf: 'flex-end',
        marginRight: vw(12),
        marginBottom: vh(14)
    },
    cross: {
        width: vw(28),
        height: vw(28)
    },
    dotStyle: {
        backgroundColor: colors.gray5,
        width: vw(6),
        height: vw(6),
        marginBottom: vh(-32),
        marginRight: vw(-1)
    },
    activeDotStyle: {
        backgroundColor: colors.customBlue,
        width: vw(6),
        height: vw(6),
        marginBottom: vh(-32),
        marginRight: vw(-1)
    },
    swipperImage: {
        width: '100%',
        height: '100%',
        borderRadius: vw(30)
    },
    priceRangeText: {
        fontSize: vw(18),
        fontWeight: '700',
        marginTop: vh(2.5),
        color: colors?.black
    },
    discountText: {
        fontSize: vw(10),
        fontWeight: '400',
        marginTop: vh(4),
        color: colors.gray1
    },
    bookVisitBtn: {
        borderRadius: vw(100),
        width: vw(90),
        borderWidth: vw(1),
        borderColor: colors?.customBlue,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: vh(4),
        alignSelf: 'flex-end'
    },
    bookVisitBtnText: {
        fontSize: vw(12),
        fontWeight: '400',
        color: colors.customBlue
    },
})