import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState, useEffect, memo } from 'react';
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { FlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import localImages from '@nestoHub/utils/localImages';
import { useForm } from 'react-hook-form';
import regex from '@nestoHub/utils/regex';
import { CustomActivityModal } from '@nestoHub/components/CustomActivityModal';
import { CustomDropdown } from '@nestoHub/components/CustomDropdown';
import { CustomInput } from '@nestoHub/components/CustomInput';
import fonts from '@nestoHub/utils/fonts';
import { CustomButton } from '@nestoHub/components/CustomButton';
import { useDispatch, useSelector } from 'react-redux';
import { BrokerHeader } from '@nestoHub/components/BrokerHeader';
import { CustomMultiSelectDropdown } from '@nestoHub/components/CustomMultiSelectDropdown';
import screenNames from '@nestoHub/utils/screenNames';
import { UpdateRoles, deleteRoles, getAllRoles } from '@nestoHub/actions';

interface Props {
  navigation: any;
  route: any;
}

export default function BuilderListOfManager(props: Props) {

  const dispatch: any = useDispatch()
  const { control, handleSubmit, reset, formState: { errors } } = useForm();

  const { _id } = useSelector((state: any) => state?.authReducer);
  const { propertyManagerList } = useSelector((state: any) => state?.builderHomeReducer);

  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [roleData, setRoleData] = useState<any>([]);

  useEffect(() => {
    let payload = {
      builderId: _id,
      add: props?.route?.params?.title
    };
    dispatch(getAllRoles(payload, (data: any) => {
      setRoleData(data?.data)
    }));
  }, []);

  // useEffect(() => {
  //   reset({
  //     name: propertyData?.name, email: propertyData?.email, phoneNumber: propertyData?.phoneNumber, selectProperties: propertyData?.selectProperties
  //   })
  // }, [propertyData])

  const onPressDeleteManager = (item: any) => {
    let payload = {
      id: ''
    }
    dispatch(deleteRoles(payload, (data: any) => {

    }))
  }

  const UpdateRolesInfo = (data: any) => {
    let payload = {

    }
    dispatch(UpdateRoles(payload, (propertyData: any) => {

    }))
    setIsVisible(false)
  }

  const renderModalContent = useCallback(() => {
    return (
      <View style={styles.refModalView}>
        <Text style={styles.addRoleText}>Edit Property Managers</Text>
        <CustomInput
          control={control}
          name={'name'}
          heading={'Name*'}
          placeholder={'Enter Name'}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'Name is required',
            },
            pattern: {
              value: regex?.namePattern,
              message: 'Enter a valid Name',
            },
          }}
          maxLength={30}
        />
        <CustomInput
          control={control}
          name={'email'}
          heading={'Email*'}
          placeholder={'Enter Email'}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'Email is required',
            },
            pattern: {
              value: regex?.emailPattern,
              message: 'Enter a valid Email',
            },
          }}
          maxLength={30}
        />
        <CustomInput
          control={control}
          name={'phoneNumber'}
          heading={'Mobile Number*'}
          placeholder={'Enter Mobile Number'}
          keyboardType={'default'}
          rules={{
            required: {
              value: true,
              message: 'Mobile Number is required',
            },
            pattern: {
              value: regex?.numberPattern,
              message: 'Enter a valid Mobile Number',
            },
          }}
          maxLength={10}
        />
        <CustomMultiSelectDropdown
          heading='Select Properties*'
          placeholder={'Select Properties'}
          currentSelectedItems={[1, 2]}
          optionsArray={['6422b53b5c3', '6422b53b5d3', '6422b53b5e3']}
          onChangeValue={(value: any) => { }}
        />
        <CustomButton title="Update" onPressCustomButton={handleSubmit(UpdateRolesInfo)} />
      </View>
    );
  }, []);

  const renderItem = useCallback(({ item, index }: any) => {
    return (
      <View style={styles.invoiceView}>
        <Text style={{ ...styles.invoiceIDText, width: vw(65) }}>{item?.name}</Text>
        <Text style={{ ...styles.invoiceIDText, width: vw(75) }}>{item?.phoneNumber}</Text>
        <Text style={{ ...styles.invoiceIDText, width: vw(85) }}>{item?.email}</Text>
        <View>
          {item?.selectProperties?.map((item: any) => {
            return (
              <Text style={{ ...styles.invoiceIDText, width: vw(95), lineHeight: vh(12) }}>{item?.name}</Text>
            )
          })}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => setIsVisible(true)} style={{ ...styles.iconView, backgroundColor: colors.customBlue }}>
            <FastImage
              source={localImages.EDIT_PENCIL}
              style={styles?.deleteIcon}
              tintColor={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onPressDeleteManager(item)} style={{ ...styles.iconView, backgroundColor: colors.customRed }}>
            <FastImage
              source={localImages.DELETE}
              style={styles?.deleteIcon}
              tintColor={colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }, []);

  const keyExtractor = useCallback((item: any, index: any) => index?.toString(), []);

  const ListHeaderComponent = memo(() => {
    return (
      <View style={styles.invoiceView}>
        <Text style={{ ...styles.invoiceText, width: vw(65) }}>Assigned To</Text>
        <Text style={{ ...styles.invoiceText, width: vw(75) }}>Phone Number</Text>
        <Text style={{ ...styles.invoiceText, width: vw(85) }}>Email</Text>
        <Text style={{ ...styles.invoiceText, width: vw(95) }}>Properties</Text>
        <Text style={{ ...styles.invoiceText, width: vw(65) }}>Action</Text>
      </View>
    );
  });

  const onPressEdit = (item: any) => {
    // setIsVisible(true);
    // setPropertyData(item),
    //   setIsVisible(true);
  };
  return (
    <SafeAreaView style={styles?.container}>
      <BrokerHeader title={`List of ${props?.route?.params?.title ?? ''} Manager`} navigation={props?.navigation} isBuilder showNotification />
      <ScrollView style={styles?.mainContainer} showsVerticalScrollIndicator={false}>
        <ScrollView style={styles.flatView} nestedScrollEnabled horizontal showsHorizontalScrollIndicator={false}>
          <FlashList
            data={propertyManagerList}
            estimatedItemSize={50}
            renderItem={renderItem}
            bounces={false}
            keyExtractor={keyExtractor}
            removeClippedSubviews={false}
            ListHeaderComponent={ListHeaderComponent}
            nestedScrollEnabled
          />
        </ScrollView>
      </ScrollView>
      <CustomActivityModal
        renderModalContent={renderModalContent}
        isVisible={isVisible}
        setIsVisible={(val: boolean) => setIsVisible(val)}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  mainContainer: {
    paddingHorizontal: vw(12.6),
    paddingBottom: vh(50),
  },
  flatView: {
    borderWidth: 1,
    borderRadius: vw(10),
    marginTop: vh(32),
    borderColor: colors.borderColor,
  },
  invoiceText: {
    color: colors.black,
    fontSize: vw(10),
    fontWeight: '600',
  },
  pdfImg: {
    width: vw(17),
    height: vh(21),
    alignSelf: 'center',
  },
  invoiceIDText: {
    fontSize: vw(10),
    fontWeight: '400',
    fontFamily: fonts.BAHNSCHRIFT,
    color: colors.textGrey,
  },
  invoiceView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh(20),
    borderBottomWidth: 1,
    paddingBottom: vh(14),
    borderColor: colors.borderColor,
    paddingHorizontal: vw(20)
  },
  deleteIcon: {
    width: vw(10),
    height: vh(10),
  },
  iconView: {
    borderRadius: vw(100),
    marginHorizontal: vw(5),
    padding: vw(5),
    alignItems: 'center',
  },
  refModalView: {
    width: '100%',
  },
  addRoleText: {
    textAlign: 'center',
    fontSize: vw(20),
    fontFamily: fonts.BAHNSCHRIFT,
    fontWeight: '600',
  },
});