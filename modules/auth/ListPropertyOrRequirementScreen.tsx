import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AuthHeader from '@nestoHub/components/AuthHeader';
import { CustomInput } from '@nestoHub/components/CustomInput';
import regex from '@nestoHub/utils/regex';
import { CustomButton } from '@nestoHub/components/CustomButton';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { CustomDropdown } from '@nestoHub/components/CustomDropdown';
import { CustomMessageModal } from '@nestoHub/components/CustomMessageModal';
import localImages from '@nestoHub/utils/localImages';
import { registerbuilder, requestNewProperty } from '@nestoHub/actions';
import { updateLoginStatus, verifyOTP } from '@nestoHub/actions';
import { useDispatch, useSelector } from 'react-redux';
import screenNames from '@nestoHub/utils/screenNames';
interface Props {
  navigation: any;
  route: any;
}

export default function ListPropertyOrRequirementScreen(props: Props) {
  const dispatch: any = useDispatch();
  const { control, handleSubmit, formState: { errors }, reset } = useForm();

  const { isLoggedIn, _id } = useSelector((state: any) => state?.authReducer)

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [propertyType, setPropertyType] = useState([]);

  useEffect(() => {
    reset({
      phoneNumber: props?.route?.params?.phoneNumber ?? ''
    })
  }, [props])

  const onPressSubmit = (data: any) => {
    const { name, phoneNumber, email, projectName, breifDescription, propertyLocation } = data;
    let payload: any = {
      name,
      phoneNumber,
      email,
      typeOfProperty: propertyType,
      locationProperty: propertyLocation,
      projectName,
    };
    payload = isLoggedIn ? { ...payload, description: breifDescription, builderId: _id } : { ...payload, breifDescription }
    if (isLoggedIn) {
      dispatch(requestNewProperty(payload, (data: any) => {
        goBack()
      }))
    }
    else {
      dispatch(registerbuilder(payload, (data: any) => {
        setIsVisible(true)
      }))
    }
  };

  const goBack = () => {
    props?.navigation?.goBack();
  };

  const onPressModalButton = () => {
    dispatch(updateLoginStatus(true))
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <View style={styles.mainContainer}>
          <AuthHeader
            title={'Hello! List your property / requirement'}
            onPressBack={goBack}
          />
          <CustomInput
            control={control}
            name={'name'}
            placeholder={'Name'}
            keyboardType={'default'}
            rules={{
              required: {
                value: true,
                message: 'Name is required',
              },
              pattern: {
                value: regex?.namePattern,
                message: 'Enter a valid name',
              },
              minLength: {
                value: 3,
                message: 'Enter a valid name',
              },
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
                message: 'Phone number is required',
              },
              pattern: {
                value: regex?.numberPattern,
                message: 'Enter a valid phone number',
              },
            }}
            maxLength={10}
          />
          <CustomInput
            control={control}
            name={'email'}
            placeholder={'Enter Email Address'}
            keyboardType={'email-address'}
            rules={{
              required: {
                value: true,
                message: 'Email is required',
              },
              pattern: {
                value: regex?.emailPattern,
                message: 'Enter a valid email',
              },
            }}
            maxLength={30}
          />
          <CustomDropdown
            placeholder={'Type of Property'}
            optionsArray={[
              'Flats / Apartment',
              'Farmhouse /  Villa',
              'Plots / Lands',
              'Commercial',
            ]}
            onChangeValue={(value: any) => setPropertyType(value)}
          />
          <CustomInput
            control={control}
            name={'propertyLocation'}
            placeholder={'Location of Property'}
            keyboardType={'default'}
            rules={{
              required: {
                value: true,
                message: 'Location of Property is required',
              },
              pattern: {
                value: regex?.namePattern,
                message: 'Enter a valid location of property',
              },
              minLength: {
                value: 3,
                message: 'Location of property should be greater than 3 characters',
              },
            }}
            maxLength={30}
          />
          <CustomInput
            control={control}
            name={'projectName'}
            placeholder={'Name of Project'}
            keyboardType={'default'}
            rules={{
              required: {
                value: true,
                message: 'Project Name is required',
              },
              pattern: {
                value: regex?.namePattern,
                message: 'Enter a valid name',
              },
              minLength: {
                value: 5,
                message: 'Project Name should be greater than 5 characters',
              },
            }}
            maxLength={30}
          />
          <CustomInput
            control={control}
            name={'briefDescription'}
            placeholder={'Brief Description'}
            keyboardType={'default'}
            rules={{
              required: {
                value: true,
                message: 'Brief Description is required',
              },
              pattern: {
                value: regex?.namePattern,
                message: 'Enter a valid Brief Description',
              },
              minLength: {
                value: 11,
                message:
                  'Brief Description should be greater than 10 characters',
              },
            }}
            maxLength={30}
          />
          <CustomButton
            title={'Submit'}
            onPressCustomButton={handleSubmit(onPressSubmit)}
          />
        </View>
      </KeyboardAwareScrollView>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    paddingHorizontal: vw(20),
  },
});
