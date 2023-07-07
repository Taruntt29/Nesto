import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo, useCallback, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FlashList } from '@shopify/flash-list'
import regex from '@nestoHub/utils/regex'
import { CustomInput } from '@nestoHub/components/CustomInput'
import { ProfileUserHeader } from '@nestoHub/components/ProfileUserHeader'
import { vh, vw } from '@nestoHub/utils/dimensions'
import colors from '@nestoHub/utils/colors'
import { useDispatch, useSelector } from 'react-redux'
import DocumentPicker from 'react-native-document-picker';
import FastImage from 'react-native-fast-image'
import localImages from '@nestoHub/utils/localImages'
import fonts from '@nestoHub/utils/fonts'
import { useForm } from 'react-hook-form'
import { CustomButton } from '@nestoHub/components/CustomButton'
import { updateBrokerInfo } from '@nestoHub/actions'
import common from '@nestoHub/utils/common'

interface Props {
    navigation: any;
    route: any;
}

export const BrokerPersonalInfoScreen = memo((props: Props) => {

    const dispatch: any = useDispatch()
    const { control, handleSubmit, reset } = useForm()

    const { email, phoneNumber, _id, name, address, panNumber, reraRegistrationNumber, documents } = useSelector((state: any) => state?.userReducer)

    const [profileImg, setProfileImg] = useState(undefined)
    const [documentsArray, setDocumentsArray] = useState(undefined)

    useEffect(() => {
        reset({
            email,
            phoneNumber,
            address,
            pan: panNumber,
            rera: reraRegistrationNumber,
        })
    }, [])

    const onPressDone = (data: any) => {
        const formData: any = new FormData();
        formData?.append('id', _id)
        formData?.append('name', name)
        formData?.append('email', data?.email)
        formData?.append('phoneNumber', phoneNumber)
        formData?.append('address', data?.address)
        formData?.append('panNumber', data?.pan)
        formData?.append('reraRegistrationNumber', reraRegistrationNumber)
        if (profileImg !== undefined) {
            formData?.append('profilePicture', {
                name: profileImg.name,
                type: profileImg.type,
                uri: Platform.OS === 'ios' ? profileImg?.sourceURL.replace('file://', '') : profileImg?.uri,
            })
        }
        if (documentsArray !== undefined) {
            formData?.append('documents', documentsArray)
        }
        dispatch(updateBrokerInfo(formData, (data: any) => {
            props?.navigation?.goack()
        }))
    }

    const onPressBrowseDocument = () => {
        DocumentPicker.pickMultiple({
            presentationStyle: 'fullScreen',
            type: [DocumentPicker.types.pdf, DocumentPicker.types.docx, DocumentPicker.types.doc, DocumentPicker.types.csv, DocumentPicker.types.xlsx, DocumentPicker.types.xls, DocumentPicker.types.images]
        })?.then((res: any) => {
            console.log('response of picker', res);
            setDocumentsArray(res ?? [])
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

    const setProfileImage = (value: any) => {
        setProfileImg(value)
    }

    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
            <ProfileUserHeader name={name} id={_id} canEdit setProfileImage={setProfileImage} />
            <CustomInput
                control={control}
                name={'email'}
                heading={'Email*'}
                placeholder={'Enter Email'}
                defaultValue={email}
                keyboardType={'default'}
                rules={{
                    required: {
                        value: true,
                        message: 'Email is required'
                    },
                    pattern: {
                        value: regex?.emailPattern,
                        message: 'Enter a valid email',
                    }
                }}
                maxLength={30}
            />
            <CustomInput
                control={control}
                name={'phoneNumber'}
                heading={'Phone Number*'}
                placeholder={'Enter Phone Number'}
                defaultValue={phoneNumber}
                keyboardType={'numeric'}
                rules={{
                    required: {
                        value: true,
                        message: 'Phone Number is required'
                    },
                    pattern: {
                        value: regex?.numberPattern,
                        message: 'Enter a valid phone number',
                    }
                }}
                maxLength={10}
                editable={false}
            />
            <CustomInput
                control={control}
                name={'address'}
                heading={'Address*'}
                placeholder={'Enter Address'}
                defaultValue={address}
                keyboardType={'default'}
                rules={{
                    required: {
                        value: true,
                        message: 'Address is required'
                    }
                }}
                maxLength={50}
            />
            <CustomInput
                control={control}
                name={'pan'}
                heading={'Pan Number*'}
                placeholder={'Enter Pan Number'}
                defaultValue={panNumber}
                keyboardType={'default'}
                rules={{
                    required: {
                        value: true,
                        message: 'Pan Number is required'
                    },
                    pattern: {
                        value: regex?.panPattern,
                        message: 'Enter a valid pan number',
                    }
                }}
                maxLength={30}
                extraStyle={{ textTransform: 'uppercase' }}
                editable={false}
            />
            <CustomInput
                control={control}
                name={'rera'}
                heading={'RERA Registration Number*'}
                placeholder={'Enter RERA Registration Number'}
                defaultValue={reraRegistrationNumber}
                keyboardType={'default'}
                rules={{
                    required: {
                        value: true,
                        message: 'RERA Registration Number is required'
                    }
                }}
                editable={false}
            />
            <Text style={styles?.heading}>{'Upload Documents*'}</Text>
            <View style={styles.documentView}>
                {
                    (documentsArray ?? documents)?.map((item: any) => {
                        return (
                            <View style={styles.fileView}>
                                <FastImage source={(item?.length && (item?.includes('png') || item?.includes('jpeg') || item?.includes('jpg'))) ? { uri: item ?? '' } : item?.type?.includes('image') ? { uri: item?.uri ?? '' } : common?.getIcon(item?.name)} style={styles.uploadImg} resizeMode={'contain'} />
                                <Text style={[styles.uploadBtnText, { maxWidth: vw(70) }]} numberOfLines={1}>{item?.name}</Text>
                            </View>
                        )
                    })
                }
                <UploadDocument />
            </View>
            <CustomButton title={'Done'} onPressCustomButton={handleSubmit(onPressDone)} extraStyle={styles.doneBtn} />
        </KeyboardAwareScrollView>
    )
})

const styles = StyleSheet.create({
    mainContainer: {
        paddingHorizontal: vw(12.6),
        paddingBottom: vh(100),
        backgroundColor: colors.white,
    },
    uploadImg: {
        width: vw(20),
        height: vw(20)
    },
    fileImg: {
        width: vw(20),
        height: vw(20)
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
    heading: {
        fontSize: vw(12),
        fontWeight: '400',
        fontFamily: fonts?.BAHNSCHRIFT,
        color: colors.black,
        marginTop: vh(28)
    },
    doneBtn: {
        position: 'absolute',
        bottom: vh(15)
    },
    documentView: {
        flexDirection: 'row',
        alignItems: "center",
        flexWrap: 'wrap'
    }
})