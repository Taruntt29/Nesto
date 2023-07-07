import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import fonts from '@nestoHub/utils/fonts';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import { CustomButton } from '@nestoHub/components/CustomButton';
import screenNames from '@nestoHub/utils/screenNames';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClaims, updateClaimStatus } from '@nestoHub/actions';
import common from '@nestoHub/utils/common';

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerBrokerageClaimScreen(props: Props) {
    const dispatch: any = useDispatch()
    const { screenTitle } = props?.route?.params
    const paymentFlowData = [
        {
            title: 'Claim',
            color: '#FC5C67'
        },
        {
            title: 'Submitted',
            color: '#D64D00'
        },
        {
            title: 'Approved',
            color: '#278FD9'
        },
        {
            title: 'Payment received',
            color: '#88C879'
        },
        {
            title: 'Paid',
            color: '#3fde1b'
        }
    ]

    const { _id } = useSelector((state: any) => state?.authReducer)

    const [claimData, setClaimData] = useState<any>()

    useEffect(() => {
        let brokeragePayload = {
            claimType: screenTitle,
            brokerId: _id,
            boughtPropertyId: props?.route?.params?.boughtPropertyId ?? ''
        }
        let visitPayload = {
            claimType: screenTitle,
            brokerId: _id,
            propertyId: props?.route?.params?.propertyId,
            visitid: props?.route?.params?.visitid
        }
        dispatch(getAllClaims(screenTitle === 'visit' ? visitPayload : brokeragePayload, (data: any) => {
            setClaimData(data?.data)
        }))
    }, [])

    const onPressViewDetails = () => {
        props?.navigation?.navigate(screenNames?.BROKER_TERMS_AND_CONDITIONS_SCREEN, { data: claimData?.[0]?.propertyId?.termAndCondition ?? '', fromScreen: screenNames?.BROKER_BROKERAGE_CLAIM_SCREEN })
    }

    const onPressClaimStatus = (claimId: string, index: number) => {
        let payload = {
            id: claimId,
            claimStatus: 'submitted'
        }
        dispatch(updateClaimStatus(payload, (data: any) => {
            let temp = [...claimData]
            temp[index] = {
                ...temp[index],
                claimStatus: 'submitted'
            }
            setClaimData(temp)
        }))
    }

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={`${screenTitle ?? ''} claim`} navigation={props?.navigation} showNotification />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.heading}>Description</Text>
                    <Text style={styles.claimIdText}>Eligible Claim ID : {screenTitle === 'property' ? '' : claimData?.[0]?.visitId?._id?.slice(-10)}</Text>
                </View>
                <View style={styles.propertyDescriptionCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={styles.propertyNameText}>Property Name</Text>
                            <Text style={styles.propertyNameTextValue}>{claimData?.[0]?.propertyId?.name}</Text>
                        </View>
                        <FastImage source={localImages?.MAP} style={{ width: vw(22), height: vw(22) }} resizeMode={'contain'} />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: vh(17.6) }}>
                        <View style={(screenTitle === 'property' || screenTitle === 'dsa') ? styles.innerContainer : { ...styles.innerContainer, flex: 0.5 }}>
                            <Text style={styles.detailTitle}>{screenTitle === 'dsa' ? 'Loan Query' : 'Visit ID'}</Text>
                            <Text style={styles.detailValue}>{screenTitle === 'property' ? claimData?.[0]?.boughtPropertyId?.visitId?._id?.slice(-10) : screenTitle === 'dsa' ? claimData?.[0]?.loanQueryId?._id?.slice(-10) : claimData?.[0]?.visitId?._id?.slice(-10)}</Text>
                        </View>
                        <View style={(screenTitle === 'property' || screenTitle === 'dsa') ? styles.innerContainer : { ...styles.innerContainer, flex: 0.5 }}>
                            <Text style={styles.detailTitle}>{screenTitle === 'dsa' ? 'Query Date' : 'Visit Date'}</Text>
                            <Text style={styles.detailValue}>{screenTitle === 'property' ? claimData?.[0]?.boughtPropertyId?.visitId?.date : screenTitle === 'dsa' ? common?.formatUTCDate(claimData?.[0]?.loanQueryId?.createdAt) : claimData?.[0]?.visitId?.date}</Text>
                        </View>
                        {
                            (screenTitle === 'property' || screenTitle === 'dsa') ?
                                <View style={styles.innerContainer}>
                                    <Text style={styles.detailTitle}>{screenTitle === 'dsa' ? 'DSA Name' : 'Customer Name'}</Text>
                                    <Text style={styles.detailValue}>{screenTitle === 'dsa' ? claimData?.[0]?.loanQueryId?.clientId?.clientName : claimData?.[0]?.boughtPropertyId?.visitId?.clientName}</Text>
                                </View> : null
                        }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: vh(17.6) }}>
                        <View style={(screenTitle === 'property' || screenTitle === 'dsa') ? styles.innerContainer : { ...styles.innerContainer, flex: 0.5 }}>
                            <Text style={styles.detailTitle}>{screenTitle === 'dsa' ? 'Customer Name' : 'Builder Name'}</Text>
                            <Text style={styles.detailValue}>{claimData?.[0]?.builderId?.name}</Text>
                        </View>
                        {
                            (screenTitle === 'property' || screenTitle === 'dsa') ?
                                <>
                                    <View style={styles.innerContainer}>
                                        <Text style={styles.detailTitle}>{screenTitle === 'dsa' ? 'Bank Name' : 'Unit Type'}</Text>
                                        <Text style={styles.detailValue}>{screenTitle === 'dsa' ? claimData?.[0]?.loanQueryId?.disbursementDetails?.bankName : claimData?.[0]?.boughtPropertyId?.unitType}</Text>
                                    </View>
                                    <View style={styles.innerContainer}>
                                        <Text style={styles.detailTitle}>{screenTitle === 'dsa' ? 'Amount of Disbursal' : 'Unit Number'}</Text>
                                        <Text style={styles.detailValue}>{screenTitle === 'dsa' ? claimData?.[0]?.loanQueryId?.disbursementDetails?.disbursementAmount : claimData?.[0]?.boughtPropertyId?.unitNumber}</Text>
                                    </View>
                                </> :
                                <View style={screenTitle === 'property' ? styles.innerContainer : { ...styles.innerContainer, flex: 0.5 }}>
                                    <Text style={styles.detailTitle}>Customer Name</Text>
                                    <Text style={styles.detailValue}>{claimData?.[0]?.visitId?.clientName}</Text>
                                </View>
                        }
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: vh(17.6) }}>
                        {
                            screenTitle === 'property' ?
                                <>
                                    <View style={styles.innerContainer}>
                                        <Text style={styles.detailTitle}>Selling Price</Text>
                                        <Text style={styles.detailValue}>₹ {claimData?.[0]?.boughtPropertyId?.sellingPrice}</Text>
                                    </View>
                                    <View style={styles.innerContainer}>
                                        <Text style={styles.detailTitle}>Selling Date</Text>
                                        <Text style={styles.detailValue}>{claimData?.[0]?.boughtPropertyId?.bookingDate}</Text>
                                    </View>
                                </> :
                                <View style={screenTitle === 'property' ? styles.innerContainer : { ...styles.innerContainer, flex: 0.5 }}>
                                    <Text style={styles.detailTitle}>{screenTitle === 'visit' ? 'Unit Type' : 'Date of Disbursal'}</Text>
                                    <Text style={styles.detailValue}>{screenTitle === 'dsa' ? claimData?.[0]?.loanQueryId?.disbursementDetails?.disbursementDate ?? '' : claimData?.[0]?.visitId?.unitType?.toString()}</Text>
                                </View>
                        }
                    </View>
                </View>
                <Text style={styles.heading}>Brokerage Plan</Text>
                <View style={styles.propertyDescriptionCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <View style={{ flex: 0.8 }}>
                            <Text style={styles.brokeragePrice}>₹ {claimData?.[0]?.brokerageAmount ?? ''}</Text>
                            {screenTitle === 'property' ? <Text style={styles.brokeragePercent}>*Brokerage Percentage - 5%</Text> : null}
                        </View>
                        <View style={{ flex: 0.2 }}>
                            <Text style={styles.builderFormText}>{screenTitle === 'property' ? 'Builder' : 'Claim'} Form</Text>
                            <FastImage source={localImages?.PDF} style={{ ...styles.pdf, marginTop: vh(14.5) }} resizeMode={'contain'} />
                        </View>
                    </View>
                </View>
                <Text style={styles.heading}>Milestone</Text>
                {
                    claimData?.map((item: any, index: any) => {
                        return (
                            <View style={styles.milestoneCard}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.milestoneTitle}>M{index + 1}</Text>
                                    <Text style={styles.milestoneDate}>{item?.date}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: vh(12) }}>
                                    <View style={styles.milestoneInnerContainer}>
                                        <Text style={styles.milestoneDetailTitle}>Brokerage %</Text>
                                        <Text style={styles.milestoneDetailValue}>{item?.brokeragePercentage ?? '-'}</Text>
                                    </View>
                                    <View style={styles.milestoneInnerContainer}>
                                        <Text style={styles.milestoneDetailTitle}>Brokerage Amount</Text>
                                        <Text style={styles.milestoneDetailValue}>₹ {item?.brokerageAmount ?? '-'}</Text>
                                    </View>
                                    <View style={styles.milestoneInnerContainer}>
                                        <Text style={styles.milestoneDetailTitle}>Claimed ID</Text>
                                        <Text style={styles.milestoneDetailValue}>{item?._id?.slice(-10) ?? '-'}</Text>
                                    </View>
                                    <View style={styles.milestoneInnerContainer}>
                                        <Text style={styles.milestoneDetailTitle}>Payment Date</Text>
                                        <Text style={styles.milestoneDetailValue}>{item?.paymentDate ?? '-'}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: vh(12) }}>
                                    <View style={styles.milestoneInnerContainer}>
                                        <Text style={styles.milestoneDetailTitle}>Claim PDF</Text>
                                        <FastImage source={localImages?.PDF} style={styles.pdf} resizeMode={'contain'} />
                                    </View>
                                    <View style={styles.milestoneInnerContainer}>
                                        <Text style={styles.milestoneDetailTitle}>Payment PDF</Text>
                                        <FastImage source={localImages?.PDF} style={styles.pdf} resizeMode={'contain'} />
                                    </View>
                                    <View style={styles.milestoneInnerContainer}>
                                        <Text style={styles.milestoneDetailTitle}>Payment ID</Text>
                                        <Text style={styles.milestoneDetailValue}>-</Text>
                                    </View>
                                    <TouchableOpacity style={styles.milestoneInnerButtonContainer} onPress={() => onPressClaimStatus(item?._id ?? '', index)}>
                                        <Text style={styles.milestoneInnerButtonText}>{item?.claimStatus}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )
                    })
                }
                <Text style={styles.heading}>Payment Flow</Text>
                <View style={styles.milestoneCard}>
                    {
                        paymentFlowData?.map((item: any, index: any) => {
                            return (
                                <>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: vh(13.8), flex: 1 }}>
                                        <Text style={{ ...styles?.paymentFlowHeading, color: item?.color }}>{item?.title}</Text>
                                        <View style={styles.paymentFlowInnerCard}>
                                            <Text style={styles.paymentFlowInnerCardText}>Lorem Ipsum</Text>
                                        </View>
                                    </View>
                                    {
                                        index < paymentFlowData?.length - 1 ?
                                            <FastImage source={localImages?.VERTICAL_ARROW} style={{ ...styles.arrow, top: vh(55 + (index * 45)) }} resizeMode={'contain'} /> : null
                                    }
                                </>
                            )
                        })
                    }
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                    <Text style={styles.heading}>{`Terms & Conditions`}</Text>
                    <TouchableOpacity activeOpacity={0.8} onPress={onPressViewDetails}>
                        <Text style={styles.viewDetailsText}>View Details</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.termsAndConditionsCard}>
                    <Text style={styles.termsAndConditionsCardText}>{claimData?.[0]?.propertyId?.termAndCondition ?? ''}</Text>
                </View>
            </KeyboardAwareScrollView>
            <CustomButton title='Download PDF' onPressCustomButton={() => { }} extraStyle={styles.downloadBtn} />
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
        paddingBottom: vh(100)
    },
    heading: {
        fontWeight: '700',
        fontSize: vw(14),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
        marginTop: vh(21.5)
    },
    claimIdText: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.gray2,
        marginTop: vh(21.5)
    },
    propertyDescriptionCard: {
        padding: vw(12),
        borderRadius: vw(10),
        backgroundColor: colors.gray7,
        marginTop: vh(15)
    },
    innerContainer: {
        flex: 0.3333333333,
        height: '100%',
    },
    detailTitle: {
        fontWeight: '400',
        fontSize: vw(8),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.gray2
    },
    detailValue: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
        marginTop: vh(5.2)
    },
    brokeragePrice: {
        fontWeight: '400',
        fontSize: vw(20),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
    },
    brokeragePercent: {
        fontWeight: '400',
        fontSize: vw(12),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
        marginTop: vh(10.8)
    },
    builderFormText: {
        fontWeight: '400',
        fontSize: vw(8),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.gray2,
    },
    pdf: {
        width: vw(21),
        height: vh(21),
        marginTop: vh(5)
    },
    milestoneCard: {
        padding: vw(12),
        borderRadius: vw(10),
        backgroundColor: colors.white,
        marginTop: vh(15),
        shadowColor: colors.black,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowOpacity: 0.4,
        shadowRadius: vw(2),
        elevation: 2,
    },
    milestoneInnerContainer: {
        flex: 0.25,
        height: '100%',
    },
    milestoneInnerButtonContainer: {
        flex: 0.25,
        backgroundColor: colors.lightRed,
        borderWidth: vw(1),
        borderColor: colors.customRed,
        borderRadius: vw(100),
        paddingVertical: vh(6),
        alignItems: 'center'
    },
    milestoneInnerButtonText: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
        textAlign: 'center'
    },
    milestoneDetailTitle: {
        fontWeight: '400',
        fontSize: vw(8),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.gray2,
    },
    milestoneDetailValue: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
    },
    milestoneTitle: {
        fontWeight: '600',
        fontSize: vw(14),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
    },
    milestoneDate: {
        fontWeight: '400',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
    },
    paymentFlowInnerCard: {
        borderRadius: vw(8),
        paddingVertical: vh(12.5),
        paddingHorizontal: vw(9.5),
        backgroundColor: colors.gray7,
        flex: 0.55,
    },
    paymentFlowInnerCardText: {
        fontWeight: '400',
        fontSize: vw(8),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors?.black,
    },
    paymentFlowHeading: {
        fontWeight: '400',
        fontSize: vw(12),
        fontFamily: fonts?.BAHNSCHRIFT,
        textAlign: 'center',
        flex: 0.45,
    },
    arrow: {
        width: vw(20),
        height: vh(30),
        position: 'absolute',
        left: vw(70)
    },
    viewDetailsText: {
        fontWeight: '700',
        fontSize: vw(10),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.customRed,
        marginTop: vh(21.5)
    },
    termsAndConditionsCard: {
        borderRadius: vw(10),
        borderWidth: vw(1),
        borderColor: colors.gray5,
        paddingHorizontal: vw(12),
        paddingVertical: vh(14),
        marginTop: vh(12)
    },
    termsAndConditionsCardText: {
        fontWeight: '400',
        fontSize: vw(12),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.gray2,
        textAlign: 'justify',
        lineHeight: vh(20)
    },
    downloadBtn: {
        position: 'absolute',
        bottom: vh(15)
    },
    propertyNameText: {
        fontWeight: '400',
        fontSize: vw(9),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.gray2,
    },
    propertyNameTextValue: {
        fontWeight: '400',
        fontSize: vw(12),
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.black,
        marginTop: vh(4.2)
    }
})