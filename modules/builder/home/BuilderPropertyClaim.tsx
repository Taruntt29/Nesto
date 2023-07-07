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

export default function BuilderPropertyClaim(props: Props) {
    const dispatch: any = useDispatch()
    const { _id } = useSelector((state: any) => state?.authReducer)

    const [claimData, setClaimData] = useState<any>()

    useEffect(() => {
        let payload = {
            builderId: _id,
            visitId: props?.route?.params?.visitId ?? ''
        }
        dispatch(getAllClaims(payload, (data: any) => {
            // setClaimData(data?.data)
        }))
    }, [])

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
            <BrokerHeader title={`Property claim`} navigation={props?.navigation} showNotification />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={styles.heading}>Description</Text>
                    <Text style={styles.claimIdText}>Eligible Claim ID : {claimData?.[0]?.visitId?._id?.slice(-10)}</Text>
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
                        <View style={styles.innerContainer}>
                            <Text style={styles.detailTitle}>{'Visit ID'}</Text>
                            <Text style={styles.detailValue}>{claimData?.[0]?.visitId?._id?.slice(-10)}</Text>
                        </View>
                        <View style={styles.innerContainer}>
                            <Text style={styles.detailTitle}>{'Visit Date'}</Text>
                            <Text style={styles.detailValue}>{claimData?.[0]?.visitId?.date}</Text>
                        </View>
                        <View style={styles.innerContainer}>
                            <Text style={styles.detailTitle}>{'Client Name'}</Text>
                            <Text style={styles.detailValue}>{claimData?.[0]?.visitId?.date}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: vh(17.6) }}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.detailTitle}>Unit Type</Text>
                            <Text style={styles.detailValue}>{claimData?.[0]?.visitId?.clientName}</Text>
                        </View>
                        <View style={styles.innerContainer}>
                            <Text style={styles.detailTitle}>Unit Numbere</Text>
                            <Text style={styles.detailValue}>{claimData?.[0]?.visitId?.clientName}</Text>
                        </View>
                        <View style={styles.innerContainer}>
                            <Text style={styles.detailTitle}>Selling Price</Text>
                            <Text style={styles.detailValue}>{claimData?.[0]?.visitId?.clientName}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginTop: vh(17.6) }}>
                        <View style={styles.innerContainer}>
                            <Text style={styles.detailTitle}>Broker ID</Text>
                            <Text style={styles.detailValue}>{claimData?.[0]?.visitId?.clientName}</Text>
                        </View>
                        <View style={styles.innerContainer}>
                            <Text style={styles.detailTitle}>Broker Name</Text>
                            <Text style={styles.detailValue}>{claimData?.[0]?.visitId?.clientName}</Text>
                        </View>
                        <View style={styles.innerContainer}>
                            <Text style={styles.detailTitle}>Selling Date</Text>
                            <Text style={styles.detailValue}>{claimData?.[0]?.visitId?.clientName}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.heading}>Brokerage Plan</Text>
                <View style={styles.propertyDescriptionCard}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <View style={{ flex: 0.8 }}>
                            <Text style={styles.brokeragePrice}>₹ {claimData?.[0]?.brokerageAmount ?? ''}</Text>
                            <Text style={styles.brokeragePercent}>*Brokerage Percentage - 5%</Text>
                        </View>
                        <View style={{ flex: 0.2 }}>
                            <Text style={styles.builderFormText}>Builder Form</Text>
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