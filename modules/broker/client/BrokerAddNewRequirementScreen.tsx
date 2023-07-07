import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomButton } from '@nestoHub/components/CustomButton';
import { CustomSlider } from '@nestoHub/components/CustomSlider';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import { CustomInput } from '@nestoHub/components/CustomInput';
import regex from '@nestoHub/utils/regex';
import { CustomPhoneNumberDropdown } from '@nestoHub/components/CustomPhoneNumberDropdown';
import { CustomMultiSelectDropdown } from '@nestoHub/components/CustomMultiSelectDropdown';
import { addNewRequirement } from '@nestoHub/actions';
import { CustomDropdown } from '@nestoHub/components/CustomDropdown';

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerAddNewRequirementScreen(props: Props) {

    const dispatch: any = useDispatch()

    const { control, handleSubmit, formState: { errors }, reset } = useForm()

    const { _id } = useSelector((state: any) => state?.authReducer)
    const { allPropertyCategory } = useSelector((state: any) => state?.brokerHomeReducer)
    const { clientData } = useSelector((state: any) => state?.bufferReducer)
    const { preferredLocations } = useSelector((state: any) => state?.masterReducer)

    const [min, setMin] = useState<number>(1500000)
    const [max, setMax] = useState<number>(9500000)
    const [unitType, setUnitType] = useState<any>([])
    const [preferredLocation, setPreferredLocation] = useState<any>([])
    const [propertyType, setPropertyType] = useState<string>('')

    useEffect(() => {
        reset({
            clientName: clientData?.clientName,
            clientID: clientData?._id,
            email: clientData?.email,
            phoneNumber: clientData?.phoneNumber,
        })
    }, [])


    const onChangeMin = (value: any) => setMin(value)

    const onChangeMax = (value: any) => setMax(value)

    const onChangeUnitType = (value: any) => setUnitType(value)

    const onChangePropertyType = (value: any) => setPropertyType(value)

    const onChangePreferredLocation = (value: any) => setPreferredLocation(value)

    const onPressDone = (data: any) => {
        if (unitType?.length && preferredLocation?.length && min && max) {
            let payload = {
                unitType,
                propertyType,
                preferredLocation,
                minPrice: min?.toString(),
                maxPrice: max?.toString(),
                customerId: clientData?._id,
                brokerId: _id
            }
            dispatch(addNewRequirement(payload, (data: any) => {
                props?.navigation?.goBack()
            }))
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Add New Requirement'} navigation={props?.navigation} showNotification />
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
                />
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
                    editable={false}
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
                    editable={false}
                />
                <CustomDropdown
                    heading={'Property Type'}
                    placeholder={'Property Type'}
                    optionsArray={allPropertyCategory?.map((item: any) => item?.name) ?? []}
                    onChangeValue={onChangePropertyType}
                />
                {
                    (propertyType?.toLowerCase()?.includes('flat') || propertyType?.toLowerCase()?.includes('plot')) ?
                        <CustomMultiSelectDropdown
                            heading={'Unit Type'}
                            placeholder={'Unit Type'}
                            optionsArray={['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK', '6 BHK', 'Others']}
                            currentSelectedItems={unitType}
                            onChangeValue={onChangeUnitType}
                        /> : null
                }
                <CustomMultiSelectDropdown
                    heading={'Preferred Location'}
                    placeholder={'Preferred Location'}
                    optionsArray={preferredLocations}
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
