import { Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useEffect, useRef, useState } from 'react'
import colors from '@nestoHub/utils/colors'
import { screenWidth, vh, vw } from '@nestoHub/utils/dimensions'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Swiper from 'react-native-swiper'
import FastImage from 'react-native-fast-image'
import localImages from '@nestoHub/utils/localImages'
import fonts from '@nestoHub/utils/fonts'
import common from '@nestoHub/utils/common'
import { CustomInput } from '@nestoHub/components/CustomInput'
import { useForm } from 'react-hook-form'
import regex from '@nestoHub/utils/regex'
import DocumentPicker from 'react-native-document-picker';
import { CustomButton } from '@nestoHub/components/CustomButton'
import DatePicker from 'react-native-date-picker'
import { useDispatch, useSelector } from 'react-redux'
import { addBoughtProperty } from '@nestoHub/actions'

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerBoughtScreen(props: Props) {
    const dispatch: any = useDispatch()
    const { propertyData, visitId, customerName, customerId, builderId } = props?.route?.params
    const { control, handleSubmit, formState: { errors }, reset } = useForm()

    const { _id } = useSelector((state: any) => state?.authReducer)

    const [bookingDate, setBookingDate] = useState<Date>(new Date())
    const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false)
    const [documentsArray, setDocumentsArray] = useState<any>(undefined)
    const [sellingPrice, setSellingPrice] = useState<string>('')
    const [brokerageValue, setBrokerageValue] = useState<string>('')

    useEffect(() => {
        reset({
            customerName
        })
    }, [props])


    const onPressDatePicker = () => setIsDatePickerOpen(true)

    const onPressBrowseDocument = () => {
        DocumentPicker.pickMultiple({
            presentationStyle: 'fullScreen',
            type: [DocumentPicker.types.images]
        })?.then((res: any) => {
            console.log('response of picker', res);
            setDocumentsArray(res ?? [])
        })?.catch((e: any) => console.log('error of picker', e))
    }

    const UploadDocument = memo(() => {
        return (
            <TouchableOpacity style={styles.uploadBtn} onPress={onPressBrowseDocument}>
                <FastImage source={localImages?.UPLOAD} style={styles.fileImg} resizeMode={'contain'} />
                <Text style={styles.uploadBtnText}>Drag & drop files or <Text style={{ ...styles.uploadBtnText, color: colors.customBlue }}>Browse</Text></Text>
                <Text style={styles.supportedText}>Supported formats: JPEG, PNG</Text>
            </TouchableOpacity>
        )
    })

    const onPressDone = (data: any) => {
        const formData: any = new FormData();
        formData?.append('bookingDate', common?.formatUTCDate(bookingDate) ?? '')
        formData?.append('unitNumber', data?.unitNumber)
        formData?.append('unitType', data?.unitType)
        formData?.append('builderRepresentativeName', data?.builderRepresentativeName)
        formData?.append('sellingPrice', sellingPrice)
        formData?.append('brokerageValue', brokerageValue)
        formData?.append('customerId', customerId)
        formData?.append('propertyId', propertyData?._id)
        formData?.append('builderId', builderId)
        formData?.append('brokerId', _id)
        formData?.append('visitId', visitId)
        if (documentsArray !== undefined) {
            formData?.append('documents', documentsArray)
        }
        dispatch(addBoughtProperty(formData, (data: any) => {
            props?.navigation?.pop(2)
        }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Bought'} navigation={props?.navigation} showNotification />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(16), marginBottom: vh(10) }}>
                    <Text>Property Detail</Text>
                    <Text>Visit ID - {visitId?.slice(-10)}</Text>
                </View>
                <PropertyCard
                    brokerage={propertyData?.brokerageValue ?? '' + '%'}
                    homeImagesArray={propertyData?.images ?? []}
                    title={propertyData?.name ?? ''}
                    subTitle={propertyData?.location ?? ''}
                    availableType={propertyData?.unitType ?? []}
                    minPrice={propertyData?.minPrice ?? ''}
                    maxPrice={propertyData?.maxPrice ?? ''}
                    pricePerVisit={'Rs 500'}
                    percentagediscount={propertyData?.discountDescription ?? ''}
                    isBestSelling={propertyData?.isBestSelling}
                    item={propertyData}
                    navigation={props?.navigation}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: vh(-10) }}>
                    <View style={{ marginTop: vh(6), width: vw(156) }}>
                        <Text style={styles?.heading}>Booking Date*</Text>
                        <TouchableOpacity style={styles.dateBtnStyle} activeOpacity={0.8} onPress={onPressDatePicker}>
                            <FastImage source={localImages.CALENDER} style={{ width: vw(18), height: vw(18), marginRight: vw(13) }} resizeMode='contain' tintColor={colors?.gray5} />
                            <Text style={styles.dateTextStyle}>{common?.formatUTCDate(bookingDate)}</Text>
                        </TouchableOpacity>
                    </View>
                    <CustomInput
                        control={control}
                        name={'bookingReferenceNumber'}
                        heading={'Booking Reference Number*'}
                        placeholder={'Enter Booking Reference Number'}
                        keyboardType={'default'}
                        rules={{
                            required: {
                                value: true,
                                message: 'Booking reference number is required'
                            }
                        }}
                        maxLength={30}
                        extraStyle={{ width: vw(156) }}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CustomInput
                        control={control}
                        name={'unitNumber'}
                        heading={'Unit Number*'}
                        placeholder={'Enter Unit Number'}
                        keyboardType={'default'}
                        rules={{
                            required: {
                                value: true,
                                message: 'Unit number is required'
                            }
                        }}
                        maxLength={30}
                        extraStyle={{ width: vw(156) }}
                    />
                    <CustomInput
                        control={control}
                        name={'unitType'}
                        heading={'Unit Type*'}
                        placeholder={'Enter Unit Type'}
                        keyboardType={'default'}
                        rules={{
                            required: {
                                value: true,
                                message: 'Unit type is required'
                            }
                        }}
                        maxLength={30}
                        extraStyle={{ width: vw(156) }}
                    />
                </View>
                <CustomInput
                    control={control}
                    name={'customerName'}
                    heading={'Customer Name*'}
                    placeholder={'Enter Customer Name'}
                    keyboardType={'default'}
                    rules={{
                        required: {
                            value: true,
                            message: 'Customer name is required'
                        },
                        pattern: {
                            value: regex?.namePattern,
                            message: 'Enter a valid customer name',
                        }
                    }}
                    maxLength={30}
                    editable={false}
                />
                <CustomInput
                    control={control}
                    name={'builderRepresentativeName'}
                    heading={'Builder Representative Name*'}
                    placeholder={'Enter Builder Representative Name'}
                    keyboardType={'default'}
                    rules={{
                        required: {
                            value: true,
                            message: 'Builder representative name is required'
                        },
                        pattern: {
                            value: regex?.namePattern,
                            message: 'Enter a valid builder representative name',
                        }
                    }}
                    maxLength={30}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CustomPriceInput
                        heading={'Selling Price*'}
                        placeholder={'Enter Selling Price'}
                        onChangeText={(val: any) => setSellingPrice(val)}
                    />
                    <CustomPriceInput
                        heading={'Brokerage Value*'}
                        placeholder={'Enter Brokerage Value'}
                        onChangeText={(val: any) => setBrokerageValue(val)}
                    />
                </View>
                <Text style={styles?.heading}>Upload a Document*</Text>
                <UploadDocument />
                <View style={styles.documentView}>
                    {
                        (documentsArray)?.map((item: any) => {
                            return (
                                <View style={styles.fileView}>
                                    <FastImage source={(item?.length && (item?.includes('png') || item?.includes('jpeg') || item?.includes('jpg'))) ? { uri: item ?? '' } : item?.type?.includes('image') ? { uri: item?.uri ?? '' } : null} style={styles.uploadImg} resizeMode={'contain'} />
                                    <Text style={[styles.uploadBtnText, { maxWidth: vw(70) }]} numberOfLines={1}>{item?.name}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                <CustomButton title='Done' onPressCustomButton={handleSubmit(onPressDone)} />
            </KeyboardAwareScrollView>
            <DatePicker
                modal
                open={isDatePickerOpen}
                date={bookingDate}
                onConfirm={(date: any) => {
                    setIsDatePickerOpen(false)
                    setBookingDate(date)
                }}
                onCancel={() => {
                    setIsDatePickerOpen(false)
                }}
            />
        </SafeAreaView>
    )
}

const PropertyCard = memo((props: any) => {
    return (
        <View style={styles.cardView}>
            <View style={styles.leftCard}>
                <Swiper
                    containerStyle={{ height: vh(150), width: '100%', marginTop: vh(7.8) }}
                    dotStyle={styles.dotStyle}
                    activeDotStyle={styles.activeDotStyle}
                    loop
                    key={props?.homeImagesArray?.length}
                    removeClippedSubviews={false}
                    scrollEnabled
                >
                    {
                        props?.homeImagesArray?.map((item: any) => {
                            return (
                                <FastImage source={{ uri: item }} style={styles.swipperImage} />
                            )
                        })
                    }
                </Swiper>
            </View>
            <View style={styles.rightCard}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: vw(190) }}>
                        <Text style={styles.titleText} numberOfLines={1}>{props?.title}</Text>
                        <Text style={styles.subTitleText} numberOfLines={1}>{props?.subTitle}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(11.7) }}>
                    {
                        props?.availableType?.map((item: any) => {
                            return (
                                <View style={{ marginRight: vw(12.2), alignItems: 'center' }}>
                                    <FastImage source={localImages?.FLATS} style={styles.shareBtnImage} resizeMode={'contain'} tintColor={colors.gray2} />
                                    <Text style={styles.bhkText}>{item}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                <Text style={styles.priceRangeText} numberOfLines={1}>{props?.minPrice + ' - ' + props?.maxPrice}</Text>
            </View>
        </View>
    )
})

const CustomPriceInput = memo((props: any) => {
    return (
        <View>
            <Text style={styles?.heading}>{props?.heading}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ ...styles.dateBtnStyle, paddingHorizontal: vw(8.8) }}><Text>₹</Text></View>
                <TextInput
                    value={props?.value}
                    onChangeText={props?.onChangeText}
                    placeholder={props?.placeholder}
                    keyboardType={'numeric'}
                    editable={props?.editable ?? true}
                    style={styles.textInput}
                />
            </View>
        </View>
    )
})

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
        flexDirection: 'row',
        alignItems: 'center',
        height: vh(155),
        borderRadius: vw(11.5),
        shadowColor: colors.gray2,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 2,
        backgroundColor: colors.gray7,
        marginBottom: vh(15),
        width: screenWidth - vw(27.2)
    },
    leftCard: {
        flex: 0.35,
        height: '100%',
        borderTopLeftRadius: vw(11.5),
        borderBottomLeftRadius: vw(11.5)
    },
    rightCard: {
        flex: 0.65,
        height: '100%',
        borderTopRightRadius: vw(11.5),
        borderBottomRightRadius: vw(11.5),
        paddingVertical: vh(12.2),
        marginLeft: vw(5)
    },
    dotStyle: {
        backgroundColor: colors.gray1,
        width: vw(2),
        height: vw(2),
        marginBottom: vh(-15),
        marginRight: vw(-1)
    },
    activeDotStyle: {
        backgroundColor: colors.customRed,
        width: vw(3.2),
        height: vw(3.2),
        marginBottom: vh(-15),
        marginRight: vw(-1)
    },
    swipperImage: {
        width: vw(117),
        height: vh(120),
        alignSelf: 'center',
        borderRadius: vw(9.5)
    },
    titleText: {
        fontSize: vw(14),
        fontWeight: '700',
        color: colors.customDarkBlue,
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    subTitleText: {
        fontSize: vw(11),
        fontWeight: '400',
        marginTop: vh(9.7),
        color: colors.gray6,
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    shareBtnImage: {
        width: vw(12.5),
        height: vh(12.5)
    },
    bhkText: {
        fontSize: vw(8),
        fontWeight: '400',
        marginTop: vh(2.5),
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    priceRangeText: {
        fontSize: vw(14),
        fontWeight: '700',
        marginTop: vh(12),
        color: colors?.black,
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    discountText: {
        fontSize: vw(8),
        fontWeight: '400',
        marginTop: vh(4),
        color: colors.gray1,
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    heading: {
        fontSize: vw(12),
        fontWeight: '400',
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.black,
        marginBottom: vh(8),
        marginTop: vh(22)
    },
    dateBtnStyle: {
        backgroundColor: colors.gray3,
        borderWidth: vw(1),
        borderColor: colors.gray4,
        paddingHorizontal: vw(20),
        paddingVertical: Platform?.OS === 'android' ? vh(14) : vh(16),
        borderRadius: vw(8.5),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    dateTextStyle: {
        fontSize: vw(12),
        fontWeight: '400',
        color: colors.black,
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    textInput: {
        backgroundColor: colors.gray3,
        borderWidth: vw(1),
        borderColor: colors.gray4,
        paddingHorizontal: vw(20),
        paddingVertical: Platform?.OS === 'android' ? vh(10) : vh(16),
        borderRadius: vw(8.5),
        fontSize: vw(12),
        fontWeight: '400',
        fontFamily: fonts?.BAHNSCHRIFT,
        marginLeft: vw(5),
        width: vw(116)
    },
    uploadBtn: {
        width: vw(342),
        height: vw(155),
        backgroundColor: colors.gray7,
        borderRadius: vw(11.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vh(8),
        borderWidth: vw(0.7),
        borderColor: colors?.gray5,
        borderStyle: 'dashed'
    },
    fileView: {
        width: vw(75),
        height: vw(75),
        backgroundColor: colors.gray7,
        borderRadius: vw(11.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: vw(10),
        marginTop: vh(8)
    },
    uploadBtnText: {
        fontWeight: '700',
        fontSize: vw(12),
        fontFamily: fonts?.BAHNSCHRIFT,
        marginTop: vh(8)
    },
    fileImg: {
        width: vw(35),
        height: vw(35)
    },
    supportedText: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        marginTop: vh(8),
        color: colors?.gray2
    },
    uploadImg: {
        width: vw(20),
        height: vw(20)
    },
    documentView: {
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap',
        marginTop:vh(20)
    }
})