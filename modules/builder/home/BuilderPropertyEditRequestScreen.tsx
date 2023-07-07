import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import colors from '@nestoHub/utils/colors';
import { normalize, vh, vw } from '@nestoHub/utils/dimensions';
import { useForm } from 'react-hook-form';
import regex from '@nestoHub/utils/regex';
import { CustomInput } from '@nestoHub/components/CustomInput';
import { CustomDropdown } from '@nestoHub/components/CustomDropdown';
import { CustomButton } from '@nestoHub/components/CustomButton';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import fonts from '@nestoHub/utils/fonts';
import { CustomActivityModal } from '@nestoHub/components/CustomActivityModal';
import { BrokerPropertyHorizontalCard } from '@nestoHub/components/BrokerPropertyHorizontalCard';
import { useDispatch, useSelector } from 'react-redux';
import { CustomMessageModal } from '@nestoHub/components/CustomMessageModal';
import { CustomMultiSelectDropdown } from '@nestoHub/components/CustomMultiSelectDropdown';
import DocumentPicker from 'react-native-document-picker';
import { getAllAmenties, getAllBanks, getAllLocationAdvantages, updateRequestProperty } from '@nestoHub/actions';

interface Props {
    navigation: any;
    route: any;
}

export default function BuilderPropertyEditRequestScreen(props: Props) {

    const dispatch: any = useDispatch()
    const { control, handleSubmit, formState: { errors }, reset } = useForm();

    const { _id } = useSelector((state: any) => state?.authReducer)
    const { allPropertyCategory } = useSelector((state: any) => state?.builderHomeReducer)
    const { allAmenities, allLocationAdvantages, allBanks } = useSelector((state: any) => state?.masterReducer)

    const [propertyData, setPropertyData] = useState(props?.route?.params)
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [currentModal, setCurrentModal] = useState<any>({ name: '', isVisible: false })
    const [selectedOptionData, setSelectedOptionData] = useState<any>([])

    useEffect(() => {
        reset({
            Name: props?.route?.params?.propertyData?.name,
            Location: props?.route?.params?.propertyData?.location
        })
        setPropertyData(props?.route?.params?.propertyData ?? {})
        if (allAmenities === undefined) {
            dispatch(getAllAmenties({}, (data: any) => { }))
        }
        if (allLocationAdvantages === undefined) {
            dispatch(getAllLocationAdvantages({}, (data: any) => { }))
        }
        if (allBanks === undefined) {
            dispatch(getAllBanks({}, (data: any) => { }))
        }
    }, [props])

    const getCurrentOptionArray = () => {
        let idsArray = []
        switch (currentModal?.name) {
            case 'Amenities':
                idsArray = propertyData?.amenitiesId?.map((item: any) => item?._id)
                return allAmenities?.filter((item: any) => !idsArray?.includes(item?._id))
                break;
            case 'Location Advantages':
                idsArray = propertyData?.locationAdvantagesId?.map((item: any) => item?._id)
                return allLocationAdvantages?.filter((item: any) => !idsArray?.includes(item?._id))
                break;
            case 'Bank':
                idsArray = propertyData?.loanApprovedByIds?.map((item: any) => item?._id)
                return allBanks?.filter((item: any) => !idsArray?.includes(item?._id))
                break;
            default: return []
        }
    }

    const onPressModalDoneButton = () => {
        let temp = { ...propertyData }
        switch (currentModal?.name) {
            case 'Amenities':
                temp = { ...temp, amenitiesId: temp?.amenitiesId?.concat(selectedOptionData) }
                setPropertyData(temp)
                break;
            case 'Location Advantages':
                temp = { ...temp, locationAdvantagesId: temp?.locationAdvantagesId?.concat(selectedOptionData) }
                setPropertyData(temp)
                break;
            case 'Bank':
                temp = { ...temp, loanApprovedByIds: temp?.loanApprovedByIds?.concat(selectedOptionData) }
                setPropertyData(temp)
                break;
            default: null
        }
        setCurrentModal({ name: '', isVisible: false })
    }

    const renderModalContent = () => {
        return (
            <View style={styles.mainContainer}>
                <Text style={styles.text}>{currentModal?.name}</Text>
                <CustomMultiSelectDropdown
                    heading={'Add ' + currentModal?.name}
                    placeholder={'Add ' + currentModal?.name}
                    optionsArray={getCurrentOptionArray()?.map((item: any) => item?.name) ?? []}
                    onChangeValue={(value: any) => {
                        let extraData = value?.map((item: any) => getCurrentOptionArray()?.find((ele: any) => ele?.name === item))
                        setSelectedOptionData(extraData)
                    }}
                />
                <CustomButton title="Done" onPressCustomButton={onPressModalDoneButton} />
            </View>
        );
    };

    const AboutView = memo((props: any) => {
        return (
            <>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                    <Text style={styles.floorPlansHeading}>{props?.title}</Text>
                    {
                        props?.onPressViewDetails ?
                            <TouchableOpacity
                                style={{ marginTop: vh(23.5) }}
                                onPress={props?.onPressViewDetails}>
                                <Text style={styles?.viewDetailsText}>View Details</Text>
                            </TouchableOpacity> : null
                    }
                </View>
                <View style={styles?.aboutCard}>
                    <Text style={styles?.aboutCardText}>{props?.description}</Text>
                </View>

            </>
        );
    });

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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(15), justifyContent: 'space-between' }}>
                    <Text style={{ ...styles.floorPlansHeading, marginTop: vh(0) }}>View official brochure</Text>
                    <TouchableOpacity onPress={onPressBrowseBrochure}>
                        <FastImage source={localImages.ADDICON} style={styles.add} />
                    </TouchableOpacity>
                </View>
                <View style={styles?.brochureCard}>
                    <ImageBackground source={localImages?.BROCHURE} style={{ height: vh(212) }} imageStyle={{ borderRadius: vw(10) }}>
                        <Text style={styles?.brochureText}>{propertyData?.name} Brochure</Text>
                    </ImageBackground>
                </View>
            </View>
        )
    })

    const onPressBrowseDocument = () => {
        DocumentPicker.pickMultiple({
            presentationStyle: 'fullScreen',
            type: [DocumentPicker.types.images]
        })?.then((res: any) => {
            console.log('response of picker', res);
            let temp = { ...propertyData, images: res ?? [] }
            setPropertyData(temp)
        })?.catch((e: any) => console.log('error of picker', e))
    }

    const UploadDocument = memo(() => {
        return (
            <TouchableOpacity style={styles.uploadBtn} onPress={onPressBrowseDocument}>
                <FastImage source={localImages?.UPLOAD} style={styles.fileImg} resizeMode={'contain'} />
                <Text style={styles.uploadBtnText}>Drag & drop files or Browse</Text>
            </TouchableOpacity>
        )
    })

    const onPressBrowseBrochure = () => {
        DocumentPicker.pickMultiple({
            presentationStyle: 'fullScreen',
            type: [DocumentPicker.types.pdf, DocumentPicker.types.docx, DocumentPicker.types.doc]
        })?.then((res: any) => {
            console.log('response of picker', res);
            // setBrochureArray(res ?? [])
        })?.catch((e: any) => console.log('error of picker', e))
    }

    const onPressSubmit = (data: any) => {
        const formData: any = new FormData();
        formData?.append('id',)
        formData?.append('name',)
        formData?.append('location',)
        formData?.append('categoryId',)
        formData?.append('amenities',)
        formData?.append('loanApprovedBy',)
        formData?.append('propertyId',)
        formData?.append('builderId',)
        formData?.append('locationAdvantages',)
        formData?.append('paymentPlan', [])
        formData?.append('brochure', [])
        formData?.append('images', propertyData?.images)

        // if (profileImg !== undefined) {
        //     formData?.append('profilePicture', {
        //         name: profileImg.name,
        //         type: profileImg.type,
        //         uri: Platform.OS === 'ios' ? profileImg?.sourceURL.replace('file://', '') : profileImg?.uri,
        //     })
        // }
        // if (documentsArray !== undefined) {
        //     formData?.append('documents', documentsArray)
        // }
        dispatch(updateRequestProperty(formData, (data: any) => {
            setIsVisible(true)
        }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader
                title={'Property Edit Request'}
                showNotification
                navigation={props?.navigation}
                isBuilder
            />
            <ScrollView
                contentContainerStyle={styles.mainContainer}
                showsVerticalScrollIndicator={false}
                bounces={false}>
                <Text style={styles.head}>Images</Text>
                <View style={styles.documentView}>
                    {
                        (propertyData?.images ?? [])?.map((item: any) => {
                            return (
                                <View style={styles.fileView}>
                                    <FastImage source={{ uri: item ?? item?.uri ?? '' }} style={styles.uploadImg} resizeMode={'contain'} />
                                    <Text style={[styles.uploadBtnText, { maxWidth: vw(70) }]} numberOfLines={1}>{item?.name}</Text>
                                </View>
                            )
                        })
                    }
                    <UploadDocument />
                </View>
                <CustomInput
                    control={control}
                    name={'Name'}
                    heading={'Name'}
                    placeholder={'Enter Name'}
                    keyboardType={'default'}
                    rules={{
                        required: {
                            value: true,
                            message: 'Name is required',
                        },
                        pattern: {
                            value: regex?.namePattern,
                            message: 'Enter a valid Name',
                        },
                    }}
                    maxLength={30}
                />
                <CustomInput
                    control={control}
                    name={'Location'}
                    heading={'Location'}
                    placeholder={'Enter Location'}
                    keyboardType={'default'}
                />
                <CustomDropdown
                    heading="Property Category"
                    placeholder={'Enter Property Category'}
                    optionsArray={allPropertyCategory?.map((item: any) => item?.name) ?? []}
                    defaultValue={propertyData?.propertyType?.name ?? ''}
                    onChangeValue={(value: any) => {
                        let temp = { ...propertyData }
                        temp = {
                            ...temp,
                            propertyType: {
                                ...temp?.propertyType,
                                name: value
                            }
                        }
                        setPropertyData(temp)
                    }}
                />
                <View style={styles.headingView}>
                    <Text style={styles.head}>Amenities</Text>
                    <TouchableOpacity onPress={() => setCurrentModal({ name: 'Amenities', isVisible: true })}>
                        <FastImage source={localImages.ADDICON} style={styles.add} />
                    </TouchableOpacity>
                </View>
                <BrokerPropertyHorizontalCard
                    itemList={propertyData?.amenitiesId ?? []}
                    iconStyle={styles?.amenitiesIcon}
                    viewAll
                />
                <View style={styles.headingView}>
                    <Text style={styles.head}>Location Advantages</Text>
                    <TouchableOpacity onPress={() => setCurrentModal({ name: 'Location Advantages', isVisible: true })}>
                        <FastImage source={localImages.ADDICON} style={styles.add} />
                    </TouchableOpacity>
                </View>
                <BrokerPropertyHorizontalCard
                    itemList={propertyData?.locationAdvantagesId ?? []}
                    iconStyle={styles?.advantagesIcon}
                    extraTextStyle={styles?.advantagesText}
                    viewAll
                />
                <AboutView
                    title={'About the Project'}
                    description={propertyData?.propertyDescription ?? ''}
                />
                <PaymentView />
                <View style={styles.headingView}>
                    <Text style={styles.head}>Loan Approved</Text>
                    <TouchableOpacity onPress={() => setCurrentModal({ name: 'Bank', isVisible: true })}>
                        <FastImage source={localImages.ADDICON} style={styles.add} />
                    </TouchableOpacity>
                </View>
                <BrokerPropertyHorizontalCard
                    itemList={propertyData?.loanApprovedByIds}
                    iconStyle={styles?.loanIcon}
                    viewAll
                />
                <AboutView
                    title="About the builder"
                    description={propertyData?.builderId?.description}
                />
                <BrochureView />
                <CustomMessageModal
                    image={localImages.SUCESS}
                    imageStyle={{ width: vw(80), height: vh(80) }}
                    title={'Request Submitted'}
                    description={'Changes suggested by you will be live, Post review by NestoHub team'}
                    buttonTitle={'Done'}
                    onPress={() => {
                        setIsVisible(false);
                        props?.navigation?.goBack()
                    }}
                    isVisible={isVisible}
                    setIsVisible={(val: boolean) => setIsVisible(val)}
                />
                <CustomActivityModal
                    renderModalContent={renderModalContent}
                    isVisible={currentModal?.isVisible}
                    setIsVisible={(val: boolean) => setCurrentModal({ name: '', isVisible: val })}
                />
                <CustomButton title="Submit" onPressCustomButton={handleSubmit(onPressSubmit)} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    mainContainer: {
        paddingHorizontal: vw(10),
        paddingBottom: vh(50),
    },
    add: {
        height: vh(32),
        width: vw(32),

    },
    amenitiesIcon: {
        width: vw(17),
        height: vh(17),
    },
    advantagesIcon: {
        width: vw(16),
        height: vh(16),
    },
    advantagesText: {
        fontWeight: '300',
        fontSize: vw(11),
        color: colors?.black,
        fontFamily: fonts?.BAHNSCHRIFT,
        marginTop: vh(9),
    },
    floorPlansHeading: {
        fontWeight: '400',
        fontSize: vw(12),
        marginTop: vh(15),
        color: colors?.black,
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    aboutCard: {
        padding: vw(12),
        borderRadius: vw(10),
        borderWidth: vw(1),
        borderColor: colors.gray5,
        marginTop: vh(15),
    },
    aboutCardText: {
        fontWeight: '400',
        fontSize: vw(12),
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT,
        lineHeight: vh(20),
    },
    viewDetailsText: {
        fontWeight: '700',
        fontSize: vw(10),
        color: colors.customRed,
        fontFamily: fonts?.BAHNSCHRIFT,
    },
    paymentText1: {
        fontWeight: '300',
        fontSize: vw(10),
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT,
        textAlign: 'center',
    },
    paymentText2: {
        fontWeight: '300',
        fontSize: vw(10),
        color: colors.gray2,
        fontFamily: fonts?.BAHNSCHRIFT,
        lineHeight: vh(16),
    },
    paymentCard: {
        paddingHorizontal: vw(12),
        borderRadius: vw(10),
        borderWidth: vw(1),
        borderColor: colors.gray5,
        marginTop: vh(15),
    },
    loanIcon: {
        width: vw(50),
        height: vh(50),
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
        elevation: 4,
    },
    brochureText: {
        fontWeight: '600',
        fontSize: vw(15),
        color: colors.white,
        fontFamily: fonts?.BAHNSCHRIFT,
        position: 'absolute',
        bottom: vh(10),
        left: vw(11),
    },
    success: { width: vw(79), height: vw(79), alignSelf: 'center' },
    text: {
        fontFamily: fonts.BAHNSCHRIFT,
        fontWeight: '600',
        fontSize: normalize(20),
        textAlign: 'center'
    },
    subHead: {
        textAlign: 'center',
        fontFamily: fonts.BAHNSCHRIFT,
        color: colors.gray1,
    },
    head: { fontFamily: fonts.BAHNSCHRIFT, fontSize: normalize(12) },
    headingView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: vw(15),
        marginBottom: vh(-12)
    },
    documentView: {
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap'
    },
    uploadBtn: {
        width: vw(75),
        height: vw(75),
        backgroundColor: colors.gray7,
        borderRadius: vw(11.5),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vh(8)
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
        fontWeight: '400',
        fontSize: vw(5.5),
        fontFamily: fonts?.BAHNSCHRIFT,
        marginTop: vh(8)
    },
    uploadImg: {
        width: vw(20),
        height: vw(20)
    },
    fileImg: {
        width: vw(20),
        height: vw(20)
    },
});
