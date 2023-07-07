import { StyleSheet, Text, View } from 'react-native'
import React, { memo, useEffect } from 'react'
import { vh, vw } from '@nestoHub/utils/dimensions'
import colors from '@nestoHub/utils/colors'
import { useForm } from 'react-hook-form'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { CustomInput } from '@nestoHub/components/CustomInput'
import regex from '@nestoHub/utils/regex'
import { useDispatch, useSelector } from 'react-redux'
import { CustomButton } from '@nestoHub/components/CustomButton'
import { updateBrokerBankInfo } from '@nestoHub/actions'

interface Props {
    navigation: any;
    route: any;
}

export const BrokerBankInfoScreen = memo((props: Props) => {
    const dispatch: any = useDispatch()

    const { control, handleSubmit, reset } = useForm()

    const { bankName, accountNumber, ifscCode, recipientName, _id } = useSelector((state: any) => state?.userReducer)

    useEffect(() => {
        reset({
            bankName,
            accountNumber,
            confirmAccountNumber: accountNumber,
            ifsc: ifscCode,
            recipientName
        })
    }, [])

    const onPressDone = (data: any) => {
        let payload = {
            id: _id,
            bankName: data?.bankName,
            accountNumber: data?.accountNumber,
            ifscCode: data?.ifsc,
            recipientName: data?.recipientName
        }
        dispatch(updateBrokerBankInfo(payload, (data: any) => {
            props?.navigation?.pop(2)
        }))
    }
    return (
        <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
            <CustomInput
                control={control}
                name={'bankName'}
                heading={'Bank Name*'}
                placeholder={'Enter Bank Name'}
                defaultValue={bankName}
                keyboardType={'default'}
                rules={{
                    required: {
                        value: true,
                        message: 'Bank Name is required'
                    },
                }}
                maxLength={20}
            />
            <CustomInput
                control={control}
                name={'accountNumber'}
                heading={'Account Number*'}
                placeholder={'Enter Account Number'}
                defaultValue={accountNumber}
                keyboardType={'numeric'}
                rules={{
                    required: {
                        value: true,
                        message: 'Account Number is required'
                    },
                    pattern: {
                        value: regex?.bankAccountNumberPattern,
                        message: 'Enter a valid account number',
                    }
                }}
                maxLength={18}
                secureTextEntry
            />
            <CustomInput
                control={control}
                name={'confirmAccountNumber'}
                heading={'Confirm Account Number*'}
                placeholder={'Enter Confirm Account Number'}
                defaultValue={accountNumber}
                keyboardType={'numeric'}
                rules={{
                    required: {
                        value: true,
                        message: 'Confirm Account Number is required'
                    },
                    pattern: {
                        value: regex?.bankAccountNumberPattern,
                        message: 'Enter a valid confirm account number',
                    }
                }}
                maxLength={18}
            />
            <CustomInput
                control={control}
                name={'ifsc'}
                heading={'IFSC Code*'}
                placeholder={'Enter IFSC Code'}
                defaultValue={ifscCode}
                keyboardType={'default'}
                rules={{
                    required: {
                        value: true,
                        message: 'IFSC Code is required'
                    },
                    pattern: {
                        value: regex?.ifscPattern,
                        message: 'Enter a valid IFSC code',
                    }
                }}
                maxLength={11}
            />
            <CustomInput
                control={control}
                name={'recipientName'}
                heading={'Recipient Name*'}
                placeholder={'Enter Recipient Name'}
                defaultValue={recipientName}
                keyboardType={'default'}
                rules={{
                    required: {
                        value: true,
                        message: 'Recipient Name is required'
                    },
                    pattern: {
                        value: regex?.namePattern,
                        message: 'Enter a valid Recipient Name',
                    }
                }}
                maxLength={20}
            />
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
    doneBtn: {
        position: 'absolute',
        bottom: vh(15)
    },
})