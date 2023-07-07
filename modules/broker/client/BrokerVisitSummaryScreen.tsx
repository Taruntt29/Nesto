import { Alert, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useForm } from 'react-hook-form';
import { CustomInput } from '@nestoHub/components/CustomInput';
import regex from '@nestoHub/utils/regex';
import fonts from '@nestoHub/utils/fonts';
import { FlashList } from '@shopify/flash-list';
import { BrokerRatingsCard } from '@nestoHub/components/BrokerRatingsCard';
import { CustomDropdown } from '@nestoHub/components/CustomDropdown';
import { CustomButton } from '@nestoHub/components/CustomButton';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import DatePicker from 'react-native-date-picker'
import common from '@nestoHub/utils/common';
import { RatingModal } from '@nestoHub/components/RatingModal';
import { CustomActivityModal } from '@nestoHub/components/CustomActivityModal';
import { useDispatch, useSelector } from 'react-redux';
import { addLoanQueryDetails, addVisitClaim, addVisitComment, getDisabledTime, getVisitbyId, updateVisitSummary } from '@nestoHub/actions';
import Voice from '@react-native-community/voice'
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions'
import { SlotsSelection } from '@nestoHub/components/SlotsSelection';
import screenNames from '@nestoHub/utils/screenNames';

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerVisitSummaryScreen(props: Props) {
    const dispatch: any = useDispatch()
    const { control, handleSubmit, formState: { errors }, reset } = useForm()
    const commentInputRef = useRef(null)

    const { _id } = useSelector((state: any) => state?.authReducer)

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
    const [isLoanDatePickerOpen, setIsLoanDatePickerOpen] = useState(false)
    const [date, setDate] = useState<any>(new Date())
    const [requiredDate, setRequiredDate] = useState<any>(new Date())
    const [isOpenRatingModal, setisOpenRatingModal] = useState<boolean>(false)
    const [isOpenLoanSupportModal, setisOpenLoanSupportModal] = useState<boolean>(false)
    const [visitData, setvisitData] = useState<any>({})
    const [ratingData, setRatingData] = useState<any>([])
    const [visitStatus, setVisitStatus] = useState<string>('')
    const [commentText, setCommentText] = useState<string>('')
    const [disabledTimeArray, setDisabledTimeArray] = useState<any>([])
    const [selectedTime, setSelectedTime] = useState('')

    useEffect(() => {
        Voice.getSpeechRecognitionServices()
        Voice.onSpeechStart = onSpeechStart;
        Voice.onSpeechEnd = onSpeechEnd;
        Voice.onSpeechResults = onSpeechResults;
        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, [])

    useEffect(() => {
        let payload = {
            id: props?.route?.params?.visitId ?? ''
        }
        dispatch(getVisitbyId(payload, (data: any) => {
            setvisitData(data?.data?.[0])
            let ratingArray = [
                {
                    title: 'Over All Rating',
                    starCount: parseInt(data?.data?.[0]?.overAllRating ?? 1)
                },
                {
                    title: 'Builder Behavior',
                    starCount: parseInt(data?.data?.[0]?.builderBehavior ?? 1)
                },
                {
                    title: 'Builder Punctuality',
                    starCount: parseInt(data?.data?.[0]?.builderPunctuality ?? 1)
                },
                {
                    title: 'Builder Cleanliness',
                    starCount: parseInt(data?.data?.[0]?.builderCleanliness ?? 1)
                },
                {
                    title: 'Rate the Satisfication',
                    starCount: parseInt(data?.data?.[0]?.rateTheSatisfaction ?? 1)
                }
            ]
            setRatingData(ratingArray)
        }))
    }, [props])

    useEffect(() => {
        let payload = {
            brokerId: _id,
            date: common?.formatUTCDate(date)
        }
        dispatch(getDisabledTime(payload, (data: any) => {
            setDisabledTimeArray(data?.data)
        }))
    }, [date])


    useEffect(() => {
        reset({
            clientName: visitData?.clientName ?? '',
            visitID: visitData?._id?.slice(-10) ?? '',
            visitDate: visitData?.date,
            propertyName: visitData?.propertyName ?? ''
        })
    }, [visitData])


    const renderItem = useCallback(({ item }: any) => {
        return (
            <View>
                <Text style={styles?.commentDate}>{item?.date}</Text>
                <Text style={styles?.commentDesc}>{item?.comment}</Text>
            </View>
        )
    }, [visitData])

    const keyExtractor = useCallback((item: any, index: any) => index?.toString(), [props])

    const ItemSeparatorComponent = () => {
        return (
            <View style={styles.seperator} />
        )
    }

    const onPressDatePicker = () => setIsDatePickerOpen(true)

    const onPressLoanDatePicker = () => setIsLoanDatePickerOpen(true)

    const onPressRating = () => setisOpenRatingModal(true)

    const onChangeRating = (value: number) => setRatingData(value)

    const renderModalContent = useCallback(() => {
        return (
            <RatingModal onChangeRating={onChangeRating} ratingData={ratingData} requestCloseModal={() => setisOpenRatingModal(false)} />
        )
    }, [ratingData])

    const renderLoanSupportModalContent = useCallback(() => {

        const onPressSubmitButton = (data: any) => {
            let payload = {
                clientId: visitData?.customerId?._id,
                brokerId: _id,
                loanRequirement: data?.loanRequirement,
                requiredDate: common?.formatUTCDate(requiredDate),
                boughtPropertyId: visitData?.boughtPropertyId

            }
            dispatch(addLoanQueryDetails(payload, (data: any) => {
                setisOpenLoanSupportModal(false)
                setvisitData(data?.data)

            }))
        }

        return (
            <>
                <Text style={styles?.loanHeading}>Loan Support</Text>
                <CustomInput
                    control={control}
                    name={'propertyName'}
                    heading={'Property Name'}
                    placeholder={'Enter Property Name'}
                    keyboardType={'default'}
                    rules={{
                        required: {
                            value: true,
                            message: 'Property name is required'
                        },
                        pattern: {
                            value: regex?.namePattern,
                            message: 'Enter a valid property name',
                        }
                    }}
                    maxLength={30}
                    editable={false}
                />
                <CustomInput
                    control={control}
                    name={'clientName'}
                    heading={'Client Name'}
                    placeholder={'Enter Client Name'}
                    keyboardType={'default'}
                    rules={{
                        required: {
                            value: true,
                            message: 'Client name is required'
                        },
                        pattern: {
                            value: regex?.namePattern,
                            message: 'Enter a valid client name',
                        }
                    }}
                    maxLength={30}
                    editable={false}
                />
                <CustomInput
                    control={control}
                    name={'loanRequirement'}
                    heading={'Loan Requirement'}
                    placeholder={'Enter Loan Requirement'}
                    keyboardType={'numeric'}
                    rules={{
                        // required: {
                        //     value: true,
                        //     message: 'Loan requirement is required'
                        // }
                    }}
                    maxLength={10}
                />
                <Text style={styles?.heading}>Required Date</Text>
                <TouchableOpacity style={styles.dateBtnStyle} activeOpacity={0.8} onPress={onPressLoanDatePicker}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FastImage source={localImages.CALENDER} style={{ width: vw(18), height: vw(18), marginRight: vw(13) }} resizeMode='contain' tintColor={colors?.gray5} />
                        <Text style={styles.dateTextStyle}>{common?.formatUTCDate(requiredDate)}</Text>
                    </View>
                </TouchableOpacity>
                <CustomButton title='Submit' onPressCustomButton={handleSubmit(onPressSubmitButton)} />
            </>
        )
    }, [requiredDate])


    const onPressSave = () => {
        let payload = {
            id: props?.route?.params?.visitId ?? '',
            clientName: visitData?.clientName,
            commentHistory: [],
            followUpDate: common?.formatUTCDate(date) ?? '',
            followUpTime: selectedTime,
            visitStatus: visitStatus?.toLowerCase(),
            overAllRating: ratingData?.[0]?.starCount?.toString(),
            builderBehavior: ratingData?.[1]?.starCount?.toString(),
            builderPunctuality: ratingData?.[2]?.starCount?.toString(),
            builderCleanliness: ratingData?.[3]?.starCount?.toString(),
            rateTheSatisfaction: ratingData?.[4]?.starCount?.toString(),
        }
        dispatch(updateVisitSummary(payload, (data: any) => {
            if (visitStatus === 'Bought') {
                props?.navigation?.navigate(screenNames?.BROKER_BOUGHT_SCREEN, { propertyData: visitData?.propertyId, visitId: props?.route?.params?.visitId, customerName: visitData?.customerId?.clientName, customerId: visitData?.customerId?._id, builderId: visitData?.builderId?._id })
            }
            else {
                props?.navigation?.goBack()
            }
        }))
    }

    const onPressLoanSupport = () => setisOpenLoanSupportModal(true)

    const onchangeCommentText = (text: string) => setCommentText(text)

    const onPressSendComment = () => {
        if (commentText?.length > 4) {
            let payload = {
                id: props?.route?.params?.visitId ?? '',
                date: common?.formatUTCDate(new Date()),
                comment: commentText ?? ''
            }
            dispatch(addVisitComment(payload, (data: any) => {
                commentInputRef?.current?.clear()
                setvisitData(data?.data)
            }))
        }
    }

    const onSpeechStart = (e: any) => console.log('onSpeechStart: ', e)

    const onSpeechEnd = (e: any) => console.log('onSpeechEnd: ', e)

    const onSpeechResults = (e: any) => {
        console.log('onSpeechResults: ', e);
        // setisListening(false)
        onchangeCommentText(e?.value?.[0] ?? '')
        destroyRecognizer()
    };

    const onPressMic = () => {
        let microphonePermission = Platform.OS === 'ios' ? (PERMISSIONS.IOS.MICROPHONE) : (PERMISSIONS.ANDROID.RECORD_AUDIO)
        check(microphonePermission).then(res => {
            switch (res) {
                case RESULTS.GRANTED:
                    console.log('res of permisssion');
                    startRecognizing()
                    break;
                default: request(microphonePermission)?.then(resp => {
                    if (resp === RESULTS.GRANTED) {
                        console.log('res of permisssion default case')
                        startRecognizing()
                    } else {
                        Alert.alert("Please provide Microphone access", "To use Speech-To-Text", [
                            {
                                text: "Cancel",
                                onPress: () => null,
                                style: "cancel"
                            },
                            { text: "Open Settings", onPress: () => openSettings() }
                        ]);
                    }
                })
            }
        })
    }

    const startRecognizing = async () => {
        try {
            // setisListening(true)
            await Voice.start('en-IN');
        } catch (e) {
            console.error('error in recoznizing', e);
        }
    };

    const destroyRecognizer = async () => {
        try {
            await Voice.destroy();
        } catch (e) {
            console.error(e);
        }
    };

    const onChangeTimeSlot = (value: any) => setSelectedTime(value)

    const onPressVisitClaim = () => {
        let payload = {
            visitId: props?.route?.params?.visitId ?? '',
        }
        dispatch(addVisitClaim(payload, (data: any) => {
            setvisitData(data?.data)
        }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Visit Summary Form'} navigation={props?.navigation} showNotification />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <CustomInput
                    control={control}
                    name={'clientName'}
                    heading={'Client Name'}
                    placeholder={'Enter Client Name'}
                    keyboardType={'default'}
                    rules={{
                        required: {
                            value: true,
                            message: 'Client name is required'
                        },
                        pattern: {
                            value: regex?.namePattern,
                            message: 'Enter a valid client name',
                        }
                    }}
                    maxLength={30}
                    editable={false}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <CustomInput
                        control={control}
                        name={'visitID'}
                        heading={'Visit ID'}
                        placeholder={'Enter Visit ID'}
                        keyboardType={'default'}
                        rules={{
                            required: {
                                value: true,
                                message: 'Visit ID is required'
                            }
                        }}
                        maxLength={30}
                        editable={false}
                    />
                    <CustomInput
                        control={control}
                        name={'visitDate'}
                        heading={'Last Visit Date'}
                        placeholder={'Enter Last Visit Date'}
                        keyboardType={'default'}
                        rules={{
                            required: {
                                value: true,
                                message: 'Last Visit Date is required'
                            }
                        }}
                        maxLength={30}
                        editable={false}
                    />
                </View>
                <Text style={styles?.heading}>Property Description</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    {
                        props?.route?.params?.propertyDescription?.map((item: any) => {
                            return (
                                <View style={styles?.descriptionCardView}>
                                    <Text style={styles.propertyDescriptionText} numberOfLines={1}>{item}</Text>
                                </View>
                            )
                        })
                    }
                </View>
                <Text style={styles?.heading}>Visit / Follow Up Comment</Text>
                <View>
                    <TextInput
                        ref={commentInputRef}
                        placeholder='Enter Here'
                        style={styles.reviewInput}
                        multiline
                        textAlignVertical='top'
                        onChangeText={onchangeCommentText}
                    />
                    <View style={styles.btnView}>
                        <TouchableOpacity onPress={onPressMic} activeOpacity={0.8}>
                            <FastImage source={localImages?.MIC} style={{ width: vw(12), height: vh(12), marginRight: vw(17) }} resizeMode='contain' />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPressSendComment} activeOpacity={0.8}>
                            <FastImage source={localImages?.SEND} style={{ width: vw(12), height: vh(12) }} resizeMode='contain' />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={styles?.heading}>Comment History</Text>
                <View style={styles.ratingCard}>
                    <FlashList
                        estimatedItemSize={50}
                        data={visitData?.commentHistory?.slice(0, 3) ?? []}
                        renderItem={renderItem}
                        keyExtractor={keyExtractor}
                        ItemSeparatorComponent={ItemSeparatorComponent}
                        removeClippedSubviews={false}
                        showsVerticalScrollIndicator={false}
                        nestedScrollEnabled
                    />
                </View>
                <Text style={styles?.heading}>Follow Up Date</Text>
                <TouchableOpacity style={styles.dateBtnStyle} activeOpacity={0.8} onPress={onPressDatePicker}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <FastImage source={localImages.CALENDER} style={{ width: vw(18), height: vw(18), marginRight: vw(13) }} resizeMode='contain' tintColor={colors?.gray5} />
                        <Text style={styles.dateTextStyle}>{common?.formatUTCDate(date)}</Text>
                    </View>
                    {/* <FastImage source={localImages.CROSS2} style={{ width: vw(18), height: vw(18) }} resizeMode='contain' tintColor={colors?.gray5} /> */}
                </TouchableOpacity>
                <Text style={styles?.heading}>Follow Up Time</Text>
                <SlotsSelection disabledTimeArray={disabledTimeArray} onChangeTimeSlot={onChangeTimeSlot} />
                <CustomDropdown
                    heading={'Visit Status'}
                    placeholder={'Choose'}
                    optionsArray={['Pending', 'Closed', 'Follow Up', 'Negotiation', 'Bought']}
                    onChangeValue={(value: any) => setVisitStatus(value)}
                />
                <TouchableOpacity style={styles.bottomRatingReviewCard} activeOpacity={0.8} onPress={onPressRating}>
                    <Text style={styles.ratingReviewText}>Ratings & Review</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(3.45) }}>
                        {
                            //@ts-ignore
                            [...Array(5).keys()]?.map((item: any) => {
                                return (
                                    <FastImage source={localImages?.STAR} style={{ width: vw(23), height: vw(23), marginRight: vw(4) }} resizeMode={'contain'} tintColor={ratingData?.[0]?.starCount > item ? colors.cutomYellow : colors.gray2} />
                                )
                            })
                        }
                    </View>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center" }}>
                    {(visitData?.boughtPropertyId?.length && !visitData?.loanSupportTaken) ? <CustomButton title='Loan Support' onPressCustomButton={onPressLoanSupport} extraStyle={{ width: visitData?.visitBrokerage?.length ? vw(155) : '100%' }} /> : null}
                    {visitData?.visitBrokerage?.length && !visitData?.isVisitClaimRaised ? <CustomButton title='Visit Claim' onPressCustomButton={onPressVisitClaim} extraStyle={{ width: !(visitData?.boughtPropertyId?.length && !visitData?.loanSupportTaken) ? '100%' : vw(155) }} /> : null}
                </View>
                <CustomButton title='Save' onPressCustomButton={onPressSave} />
            </KeyboardAwareScrollView>
            <DatePicker
                modal
                open={isDatePickerOpen}
                date={date}
                onConfirm={(date: any) => {
                    setIsDatePickerOpen(false)
                    setDate(date)
                }}
                onCancel={() => {
                    setIsDatePickerOpen(false)
                }}
            />
            <DatePicker
                modal
                open={isLoanDatePickerOpen}
                date={requiredDate}
                onConfirm={(date: any) => {
                    setIsLoanDatePickerOpen(false)
                    setRequiredDate(date)
                }}
                onCancel={() => {
                    setIsLoanDatePickerOpen(false)
                }}
            />
            <CustomActivityModal
                renderModalContent={renderModalContent}
                isVisible={isOpenRatingModal}
                setIsVisible={(val: boolean) => setisOpenRatingModal(val)}
            />
            <CustomActivityModal
                renderModalContent={renderLoanSupportModalContent}
                isVisible={isOpenLoanSupportModal}
                setIsVisible={(val: boolean) => setisOpenLoanSupportModal(val)}
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
    descriptionCardView: {
        width: vw(110),
        height: vh(30),
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: vw(1),
        borderColor: colors.gray2,
        borderRadius: vw(8.5),
        marginTop: vh(14.5)
    },
    heading: {
        fontSize: vw(12),
        fontWeight: '400',
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.black,
        marginBottom: vh(8),
        marginTop: vh(22)
    },
    reviewInput: {
        paddingVertical: vh(12.5),
        backgroundColor: colors.gray7,
        borderRadius: vw(6.5),
        width: vw(345),
        height: vh(84),
        paddingLeft: vw(15),
        paddingRight: vw(15),
        fontSize: vw(10),
        fontWeight: '400',
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.black
    },
    ratingCard: {
        padding: vw(10),
        borderRadius: vw(10),
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
        borderColor: colors.gray5,
        marginVertical: vh(15)
    },
    propertyDescriptionText: {
        fontSize: vw(12),
        fontWeight: '400',
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.black
    },
    dateBtnStyle: {
        backgroundColor: colors.gray3,
        borderWidth: vw(1),
        borderColor: colors.gray4,
        paddingHorizontal: vw(20),
        paddingVertical: vh(16),
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
    bottomRatingReviewCard: {
        padding: vw(12),
        borderRadius: vw(10),
        backgroundColor: colors.white,
        marginTop: vh(20),
        shadowColor: colors.black,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 2,
        marginHorizontal: vw(1),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    ratingReviewText: {
        fontSize: vw(14),
        fontWeight: '400',
        color: colors.black,
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    btnView: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: vh(10),
        right: vw(10)
    },
    commentCard: {
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
    commentDate: {
        fontSize: vw(10),
        fontWeight: '400',
        color: colors.black,
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    commentDesc: {
        fontSize: vw(10),
        fontWeight: '300',
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT,
        lineHeight: vh(15.5),
        marginTop: vh(11)
    },
    loanHeading: {
        fontWeight: '600',
        fontSize: vw(20),
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors?.black,
        textAlign: 'center'
    },
})