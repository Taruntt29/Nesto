import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import colors from '@nestoHub/utils/colors'
import { vh, vw } from '@nestoHub/utils/dimensions'
import { useForm } from 'react-hook-form';
import regex from '@nestoHub/utils/regex';
import { CustomInput } from '@nestoHub/components/CustomInput'
import { CustomDropdown } from '@nestoHub/components/CustomDropdown'
import { CustomPhoneNumberDropdown } from '@nestoHub/components/CustomPhoneNumberDropdown'
import { CustomButton } from '@nestoHub/components/CustomButton'
import { CustomSlider } from '@nestoHub/components/CustomSlider'
import { CustomMultiSelectDropdown } from '@nestoHub/components/CustomMultiSelectDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { addCustomer, updateCustomer } from '@nestoHub/actions'

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerAddEditClientScreen(props: Props) {

    const dispatch: any = useDispatch()

    const { control, handleSubmit, formState: { errors }, reset } = useForm()

    const { _id } = useSelector((state: any) => state?.authReducer)

    const [min, setMin] = useState(parseInt(props?.route?.params?.minPrice?.slice(0, -1)) ?? 0)
    const [max, setMax] = useState(parseInt(props?.route?.params?.maxPrice?.slice(0, -1)) ?? 0)
    const [unitType, setUnitType] = useState<any>(props?.route?.params?.recentRequirement ?? [])
    const [preferredLocation, setPreferredLocation] = useState<any>(props?.route?.params?.preferedLocation ?? [])

    useEffect(() => {
        reset({
            clientName: props?.route?.params?.clientName,
            clientID: props?.route?.params?.clientId,
            email: props?.route?.params?.email,
            phoneNumber: props?.route?.params?.phoneNumber,
            alternatePhoneNumber: props?.route?.params?.alternatePhoneNumber,
        })
    }, [props])


    const onPressDone = (data: any) => {
        if (props?.route?.params?.type === 'edit') {
            let payload = {
                id: data?.clientID,
                clientName: data?.clientName,
                email: data?.email,
                phoneNumber: data?.phoneNumber,
                alternatePhoneNumber: data?.alternatePhoneNumber,
                unitType,
                preferredLocation,
                minPrice: min?.toString(),
                maxPrice: max?.toString(),
                brokerId: _id
            }
            dispatch(updateCustomer(payload, (data: any) => {
                props?.navigation?.goBack()
            }))
        }
        else {
            let payload = {
                clientName: data?.clientName,
                email: data?.email,
                phoneNumber: data?.phoneNumber,
                alternatePhoneNumber: data?.alternatePhoneNumber,
                unitType,
                preferredLocation,
                minPrice: min?.toString(),
                maxPrice: max?.toString(),
                brokerId: _id
            }
            dispatch(addCustomer(payload, (data: any) => {
                props?.navigation?.goBack()
            }))
        }
    }

    const onChangeMin = (value: any) => setMin(value)

    const onChangeMax = (value: any) => setMax(value)

    const onChangeUnitType = (value: any) => setUnitType(value)

    const onChangePreferredLocation = (value: any) => setPreferredLocation(value)

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={props?.route?.params?.type === 'edit' ? 'Edit Customer Details' : 'Add New Customer'} navigation={props?.navigation} showNotification />
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
                />
                {
                    props?.route?.params?.type === 'edit' ?
                        <CustomInput
                            control={control}
                            name={'clientID'}
                            heading={'Client ID'}
                            placeholder={'Enter Client ID'}
                            keyboardType={'default'}
                            rules={{
                                required: {
                                    value: true,
                                    message: 'Client ID is required'
                                }
                            }}
                            editable={false}
                            maxLength={10}
                        /> : null
                }
                <CustomInput
                    control={control}
                    name={'email'}
                    heading={'Email'}
                    placeholder={'Enter Email'}
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
                <CustomPhoneNumberDropdown
                    control={control}
                    name='phoneNumber'
                    heading='Phone Number'
                    placeholder='Enter Phone Number'
                    onChangeValue={(value: any) => { }}
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
                />
                <CustomPhoneNumberDropdown
                    control={control}
                    name='alternatePhoneNumber'
                    heading='Alternate Phone Number'
                    placeholder='Enter Alternate Phone Number'
                    onChangeValue={(value: any) => { }}
                    rules={{
                        required: {
                            value: true,
                            message: 'Alternate Phone Number is required'
                        },
                        pattern: {
                            value: regex?.numberPattern,
                            message: 'Enter a valid alternate phone number',
                        }
                    }}
                />
                <CustomMultiSelectDropdown
                    heading={'Unit Type'}
                    placeholder={'Unit Type'}
                    optionsArray={['2 BHK', '3 BHK', '4 BHK', '5 BHK', '6 BHK']}
                    currentSelectedItems={unitType}
                    onChangeValue={onChangeUnitType}
                />
                <CustomMultiSelectDropdown
                    heading={'Preferred Location'}
                    placeholder={'Preferred Location'}
                    optionsArray={['Gurugram, Haryana', 'Bhiwadi, Haryana', 'Karnal, Haryana', 'Panipat, Haryana']}
                    currentSelectedItems={preferredLocation}
                    onChangeValue={onChangePreferredLocation}
                />
                <CustomSlider
                    heading={'Budget'}
                    min={min}
                    max={max}
                    onChangeMin={onChangeMin}
                    onChangeMax={onChangeMax}
                />
                <CustomButton title='Done' onPressCustomButton={handleSubmit(onPressDone)} />
            </KeyboardAwareScrollView>
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
})