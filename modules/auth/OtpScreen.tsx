import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import screenNames from '@nestoHub/utils/screenNames';
import AuthHeader from '@nestoHub/components/AuthHeader';
import { CustomButton } from '@nestoHub/components/CustomButton';
import { CustomOtpInput } from '@nestoHub/components/CustomOtpInput';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import { useDispatch, useSelector } from 'react-redux';
import { resendOTP, updateLoginStatus, verifyOTP } from '@nestoHub/actions';
import common from '@nestoHub/utils/common';
import Snackbar from 'react-native-snackbar';
import { CustomMessageModal } from '@nestoHub/components/CustomMessageModal';
import actionNames from '@nestoHub/utils/actionNames';
interface Props {
  navigation: any;
  route: any;
}
export default function OtpScreen(props: Props) {
  const dispatch: any = useDispatch();
  const { loggedInModule } = useSelector((state: any) => state?.authReducer);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [time, setTime] = useState<number>(30);
  const [OTP, setOTP] = useState<string>('');
  const timerRef = React.useRef(time);

  useEffect(() => {
    timerFunction();
  }, []);

  const timerFunction = () => {
    const timerId = setInterval(() => {
      timerRef.current -= 1;
      if (timerRef?.current < 0) clearInterval(timerId);
      else setTime(timerRef?.current);
    }, 1000);
    return () => {
      clearInterval(timerId);
      setTime(30)
      timerRef.current = 30
    }
  };

  const goBack = () => {
    props?.navigation?.goBack();
  };

  const onPressVerify = () => {
    if (OTP?.length === 6) {
      let payload = {
        phoneNumber: props?.route?.params?.phoneNumber ?? '',
        otp: OTP,
      };
      dispatch(
        verifyOTP(payload, loggedInModule, (data: any) => {
          if (data?.data?.status === 'newuser') {
            setIsVisible(true);
          } else {
            if (data?.data?.token?.length) {
              common.setAuthorizationToken(data?.data?.token);
              dispatch(updateLoginStatus(true))
              if (loggedInModule === 'broker') {
                const { name, phoneNumber, token, _id, referalCode, status } = data?.data;
                dispatch({
                  type: actionNames?.AUTH_REDUCER,
                  payload: {
                    name,
                    phoneNumber,
                    token,
                    _id,
                    referalCode,
                    status
                  },
                });
              }
              else {
                const { email, gst, locationOfProperty, name, panOfCompany, phoneNumber, profilePictureUrl, projectName, rating, referalCode, status, termAndCondition, typeOfProperty, _id, token, } = data?.data;
                dispatch({
                  type: actionNames?.AUTH_REDUCER,
                  payload: {
                    _id,
                    email,
                    gst,
                    locationOfProperty,
                    name,
                    panOfCompany,
                    phoneNumber,
                    profilePictureUrl,
                    projectName,
                    rating,
                    referalCode,
                    status,
                    termAndCondition,
                    typeOfProperty,
                    token,
                  },
                });
              }
            }
          }
        }),
      );
    }
  };
  const onPressSetOTP = (val: string) => {
    setOTP(val);
  };
  const onPressResendOTP = () => {
    timerFunction()
    let payload = {
      phoneNumber: props?.route?.params?.phoneNumber ?? '',
    }
    dispatch(resendOTP(payload, loggedInModule, (data: any) => { }))
  };
  const onPressModalButton = () => {
    setIsVisible(false);
    if (loggedInModule === 'builder')
      props?.navigation?.navigate(screenNames?.LIST_PROPERTY_OR_REQUIREMENT_SCREEN, { phoneNumber: props?.route?.params?.phoneNumber ?? '' });
    else
      props?.navigation?.navigate(screenNames?.REGISTER_SCREEN, { phoneNumber: props?.route?.params?.phoneNumber ?? '' });
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.mainContainer}>
        <AuthHeader title={'OTP Verification'} onPressBack={goBack} />
        <Text style={styles.description}>
          Enter the verification code we just sent on your phone number.
        </Text>
        <CustomOtpInput setOTP={onPressSetOTP} />
        <CustomButton title={'Verify'} onPressCustomButton={onPressVerify} />
        <View style={styles.timerView}>
          <FastImage
            source={localImages.CLOCK}
            style={styles.clockImg}
            resizeMode="contain"
          />
          <Text style={styles?.timerText}>
            00:{time < 10 ? 0 : null}
            {time}
          </Text>
        </View>
        <Text style={styles.resendText}>
          Didn’t received code?{' '}
          <Text
            style={{
              ...styles.resendText,
              color: colors.customBlue,
              fontWeight: 'bold',
            }}
            onPress={onPressResendOTP}>
            Resend
          </Text>
        </Text>
      </View>
      <CustomMessageModal
        image={localImages.NOT_REGISTERED}
        imageStyle={{ width: vw(125), height: vh(125) }}
        title={'Not Registered'}
        description={`You are not register with us! ${loggedInModule === 'broker' ? 'Please share your information' : 'Please share your intent'}`}
        buttonTitle={'Register'}
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
  description: {
    fontSize: vw(16),
    fontWeight: '400',
    lineHeight: vh(24),
    color: colors?.gray2,
    marginTop: vh(12.5),
    marginBottom: vh(38),
  },
  clockImg: {
    width: vw(9),
    height: vh(11.2),
    marginRight: vw(6),
  },
  timerView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: vh(70),
  },
  timerText: {
    fontSize: vw(10),
    fontWeight: '400',
    color: colors.customBlue,
  },
  resendText: {
    fontSize: vw(14),
    fontWeight: '400',
    textAlign: 'center',
    marginTop: vh(3.5),
    color: colors.black,
  },
});