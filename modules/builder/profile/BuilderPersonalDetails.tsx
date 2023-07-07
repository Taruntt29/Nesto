import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity, Platform } from 'react-native';
import React, { useState, useEffect, memo } from 'react';
import { ProfileUserHeader } from '@nestoHub/components/ProfileUserHeader';
import { useForm } from 'react-hook-form';
import regex from '@nestoHub/utils/regex';
import { CustomInput } from '@nestoHub/components/CustomInput';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { CustomDropdown } from '@nestoHub/components/CustomDropdown';
import fonts from '@nestoHub/utils/fonts';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import { CustomButton } from '@nestoHub/components/CustomButton';
import { getBuilderDetails, UpdateBuilderDetails } from '@nestoHub/actions';
import DocumentPicker, { types } from 'react-native-document-picker';
import { useDispatch, useSelector } from 'react-redux';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import screenNames from '@nestoHub/utils/screenNames';
import common from '@nestoHub/utils/common';
interface Props {
  navigation: any;
}

const BuilderPersonalDetails = (props: Props) => {
  const dispatch: any = useDispatch();
  const { control, handleSubmit, formState: { errors }, reset, } = useForm();

  const { _id, name, companyName, email, phoneNumber, address, companyType, gst, panOfCompany, documents } = useSelector((state: any) => state?.userReducer);

  const [profileImg, setProfileImg] = useState(undefined)
  const [documentsArray, setDocumentsArray] = useState(undefined)

  useEffect(() => {
    reset(
      {
        email,
        companyName,
        phoneNumber,
        address,
        companyType,
        gst,
        panOfCompany,
        documents
      }
    )
  }, []);

  const onPressDone = (data: any) => {
    const formData: any = new FormData();
    formData.append('id', _id);
    formData.append('companyName', data?.companyName);
    formData.append('email', data?.email);
    formData.append('address', data?.address);
    formData.append('gst', gst);
    formData.append('panOfCompany', panOfCompany);
    formData.append('companyType', companyType);
    formData.append('phoneNumber', phoneNumber);
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
    dispatch(UpdateBuilderDetails(formData, (data: any) => {
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

  const setProfileImage = (value: any) => {
    setProfileImg(value)
  }

  const UploadDocument = memo(() => {
    return (
      <TouchableOpacity style={styles.uploadBtn} onPress={onPressBrowseDocument}>
        <FastImage source={localImages?.UPLOAD} style={styles.fileImg} resizeMode={'contain'} />
        <Text style={styles.uploadBtnText}>Drag & drop files or Browse</Text>
      </TouchableOpacity>
    )
  })

  return (
    <SafeAreaView style={styles.container}>
      <BrokerHeader title={'Personal Details'} navigation={props?.navigation} isBuilder showNotification />
      <ScrollView
        contentContainerStyle={styles.mainContainer}
        showsVerticalScrollIndicator={false}
        bounces={false}>
        <ProfileUserHeader
          setProfileImage={setProfileImage}
          name={name}
          id={`Builder ID: ${_id}`}
          canEdit
        />
        <CustomInput
          control={control}
          name={'companyName'}
          heading={'Company Name*'}
          placeholder={'Enter Company Name'}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'Company Name is required',
            },
            pattern: {
              value: regex?.namePattern,
              message: 'Enter a valid Company Name',
            },
          }}
          maxLength={30}
        />
        <CustomInput
          control={control}
          name={'email'}
          heading={'Email Address*'}
          placeholder={'Enter Email Address'}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: regex?.emailPattern,
              message: 'Enter a valid Email Address',
            },
          }}
          maxLength={30}
        />
        <CustomInput
          control={control}
          name={'phoneNumber'}
          heading={'Phone Number*'}
          placeholder={'Enter Phone Number'}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'Phone Number is required',
            },
            pattern: {
              value: regex?.numberPattern,
              message: 'Enter a valid Phone Number',
            },
          }}
          maxLength={10}
          editable={false}
        />
        <CustomInput
          control={control}
          name={'address'}
          heading={'Address*'}
          placeholder={'Enter Address'}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'Address is required',
            },

          }}
          maxLength={50}
        />
        <CustomDropdown
          heading={'Company Type*'}
          defaultValue={companyType}
          editable={false}
        />
        <CustomInput
          control={control}
          name={'gst'}
          heading={'GST*'}
          placeholder={'Enter GST'}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'GST is required',
            },
            pattern: {
              value: regex?.gstPattern,
              message: 'Enter a valid GST',
            },
          }}
          maxLength={15}
          editable={false}
        />
        <CustomInput
          control={control}
          name={'panOfCompany'}
          heading={'PAN of Company*'}
          placeholder={'Enter PAN of Company'}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'PAN of Company is required',
            },
            pattern: {
              value: regex?.panPattern,
              message: 'Enter a valid PAN of Company',
            },
          }}
          maxLength={12}
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
      </ScrollView>
      <CustomButton title="Done" onPressCustomButton={handleSubmit(onPressDone)} />
    </SafeAreaView>
  );
};

export default BuilderPersonalDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    paddingHorizontal: vw(12.6),
    paddingBottom: vh(50),
  },
  companyType: {
    marginTop: vh(22),
    color: colors.black,
    fontWeight: '400',
    fontFamily: fonts?.BAHNSCHRIFT,
    fontSize: vw(12),
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
  fileImg: {
    width: vw(20),
    height: vw(20)
  },
  heading: {
    fontSize: vw(12),
    fontWeight: '400',
    fontFamily: fonts?.BAHNSCHRIFT,
    color: colors.black,
    marginTop: vh(28)
  },
  documentView: {
    flexDirection: 'row',
    alignItems: "center",
    flexWrap: 'wrap'
  },
  uploadImg: {
    width: vw(20),
    height: vw(20)
  },
});
