import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { BrokerHeader } from '@nestoHub/components/BrokerHeader'
import colors from '@nestoHub/utils/colors';
import { vh, vw } from '@nestoHub/utils/dimensions';
import { CustomButton } from '@nestoHub/components/CustomButton';
import fonts from '@nestoHub/utils/fonts';
import { CustomDropdown } from '@nestoHub/components/CustomDropdown';
import { CustomMultiSelectDropdown } from '@nestoHub/components/CustomMultiSelectDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateBrokerPreferences } from '@nestoHub/actions';

interface Props {
    navigation: any;
    route: any;
}

export default function BrokerPreferencesScreen(props: Props) {

    const dispatch: any = useDispatch()

    const { locality, propertyType, experience, top3Builders, _id } = useSelector((state: any) => state?.userReducer)
    const [preferencesData, setPreferencesData] = useState<any>({})

    useEffect(() => {
        setPreferencesData({ locality, propertyType, experience, top3Builders })
    }, [locality, propertyType, experience, top3Builders])


    const onchangeLocality = (value: any) => setPreferencesData({ ...preferencesData, locality: value })

    const onchangePropertyType = (value: any) => setPreferencesData({ ...preferencesData, propertyType: value })

    const onchangeExperience = (value: any) => setPreferencesData({ ...preferencesData, experience: value })

    const onchangeTopBuilders = (value: any) => setPreferencesData({ ...preferencesData, top3Builders: value })

    const onPressDone = () => {
        let payload = {
            id: _id,
            ...preferencesData
        }
        dispatch(UpdateBrokerPreferences(payload, (data: any) => {
            props?.navigation?.goBack()
        }))
    }
    return (
        <SafeAreaView style={styles.container}>
            <BrokerHeader title={'Preferences'} navigation={props?.navigation} showNotification />
            <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer} showsVerticalScrollIndicator={false} bounces={false}>
                <CustomMultiSelectDropdown
                    heading={'Locality*'}
                    placeholder={'Locality'}
                    optionsArray={locality}
                    currentSelectedItems={preferencesData?.locality}
                    onChangeValue={onchangeLocality}
                />
                <CustomMultiSelectDropdown
                    heading={'Property Type*'}
                    placeholder={'Type of Property'}
                    optionsArray={propertyType}
                    currentSelectedItems={preferencesData?.propertyType}
                    onChangeValue={onchangePropertyType}
                />
                <CustomDropdown
                    heading={'Experience (in years)*'}
                    placeholder={'Experience'}
                    optionsArray={[experience]}
                    defaultValue={preferencesData?.experience}
                    onChangeValue={onchangeExperience}
                />
                <CustomMultiSelectDropdown
                    heading={'Top 3 Builders with whom you have work*'}
                    placeholder={'Builders'}
                    optionsArray={top3Builders}
                    currentSelectedItems={preferencesData?.top3Builders}
                    onChangeValue={onchangeTopBuilders}
                />
            </KeyboardAwareScrollView>
            <CustomButton title={'Done'} onPressCustomButton={onPressDone} extraStyle={styles.doneBtn} />
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
        paddingBottom: vh(100)
    },
    doneBtn: {
        position: 'absolute',
        bottom: vh(15)
    },
})