import { SafeAreaView, StyleSheet, View } from 'react-native';
import React from 'react';
import AuthHeader from '@nestoHub/components/AuthHeader';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { useForm } from 'react-hook-form';
import { CustomButton } from '@nestoHub/components/CustomButton';
import { CustomInput } from '@nestoHub/components/CustomInput';
import regex from '@nestoHub/utils/regex';
import screenNames from '@nestoHub/utils/screenNames';
import { useDispatch, useSelector } from 'react-redux';
import { sendOTP } from '@nestoHub/actions';
import common from '@nestoHub/utils/common';

interface Props {
  navigation: any;
  route: any;
}

export default function LoginScreen(props: Props) {
  const dispatch: any = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loggedInModule } = useSelector((state: any) => state?.authReducer);

  const goBack = () => {
    props?.navigation?.goBack();
  };

  const onPressContinue = (data: any) => {
    let phoneNumber = data?.phoneNumber;
    let payload = {
      phoneNumber,
    };
    dispatch(
      sendOTP(payload, loggedInModule, (data: any) => {
        props?.navigation?.navigate(screenNames?.OTP_SCREEN, {
          phoneNumber: phoneNumber,
        });
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <AuthHeader
          title={'Welcome back! Glad to see you, Again!'}
          onPressBack={goBack}
        />
        <CustomInput
          control={control}
          name={'phoneNumber'}
          placeholder={'Enter your phone number'}
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
        <CustomButton
          title={'Continue'}
          onPressCustomButton={handleSubmit(onPressContinue)}
        />
      </View>
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
