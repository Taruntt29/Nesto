import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '@nestoHub/utils/colors'
import { vh, vw } from '@nestoHub/utils/dimensions'
import { CustomButton } from '@nestoHub/components/CustomButton'
import { CustomInput } from '@nestoHub/components/CustomInput'
import AuthHeader from '@nestoHub/components/AuthHeader'
import { useForm } from 'react-hook-form';
import screenNames from '@nestoHub/utils/screenNames'
import regex from '@nestoHub/utils/regex'
import FastImage from 'react-native-fast-image'
import localImages from '@nestoHub/utils/localImages'
import { useDispatch } from 'react-redux'
import { registerBroker, updateLoginStatus } from '@nestoHub/actions'
import { CustomMessageModal } from '@nestoHub/components/CustomMessageModal'

interface Props {
  navigation: any;
  route: any;
}

export default function RegisterScreen(props: Props) {

  const dispatch: any = useDispatch()

  const { control, handleSubmit, formState: { errors }, reset } = useForm()

  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    reset({
      phoneNumber: props?.route?.params?.phoneNumber ?? ''
    })
  }, [props])


  const goBack = () => {
    props?.navigation?.goBack()
  }

  const onPressRegister = (data: any) => {
    if (isChecked) {
      const { name, phoneNumber, referalCode } = data
      let payload = {
        name,
        phoneNumber,
        referalCode
      }
      dispatch(registerBroker(payload, (data: any) => {
        setIsVisible(true)
      }))
    }
  }

  const onPressCheckBox = () => setIsChecked(!isChecked)

  const onPressModalButton = () => {
    dispatch(updateLoginStatus(true))
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <AuthHeader title={'Hello! Register to get started'} onPressBack={goBack} />
        <CustomInput
          control={control}
          name={'name'}
          placeholder={'Name'}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'Name is required'
            },
            pattern: {
              value: regex?.namePattern,
              message: 'Enter a valid name',
            },
            minLength: {
              value: 3,
              message: 'Enter a valid name',
            }
          }}
          maxLength={25}
        />
        <CustomInput
          control={control}
          name={'phoneNumber'}
          placeholder={'Enter Phone Number'}
          keyboardType={'number-pad'}
          rules={{
            required: {
              value: true,
              message: 'Phone number is required'
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
          name={'referalCode'}
          placeholder={'Enter Referral Code'}
          keyboardType={'default'}
          rules={{
            // required: {
            //   value: false,
            //   message: 'Phone number is required'
            // },
            // pattern: {
            //   value: regex.namePattern,
            //   message: 'Enter a valid phone number',
            // }
          }}
          maxLength={6}
        />
        <View style={styles.checkboxView}>
          <TouchableOpacity onPress={onPressCheckBox}>
            <FastImage source={isChecked ? localImages?.CHECK : localImages?.UNCHECK} style={styles.checkbox} resizeMode='contain' tintColor={colors.customBlue} />
          </TouchableOpacity>
          <Text style={styles.termsText}>I agree to the <Text style={{ color: colors.customBlue, fontWeight: 'bold' }}>Terms of Service</Text> and <Text style={{ color: colors.customBlue, fontWeight: 'bold' }}>Privacy Policy</Text></Text>
        </View>
        <CustomButton title={'Register'} onPressCustomButton={handleSubmit(onPressRegister)} />
      </View>
      <CustomMessageModal
        image={localImages.SUCESS}
        imageStyle={{ width: vw(80), height: vh(80) }}
        title={'Successful'}
        description={'Your are successfully registered on NestoHub.'}
        buttonTitle={'Continue'}
        onPress={onPressModalButton}
        isVisible={isVisible}
        setIsVisible={(val: boolean) => setIsVisible(val)}
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
    paddingHorizontal: vw(20)
  },
  checkboxView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(12)
  },
  checkbox: {
    width: vw(16),
    height: vw(16),
    marginRight: vw(6.5),
  },
  termsText: {
    fontSize: vw(10),
    fontWeight: '400'
  }
})