import axios from 'axios'
import Config from 'react-native-config';
import Snackbar from 'react-native-snackbar';
import colors from './colors';
import { Alert, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import localImages from './localImages';

const axiosInstance: any = axios.create({
    baseURL: Config.BASE_URL_NEW,
    timeout: 30000,
})

const setAuthorizationToken = (token: string) => {
    if (token) {
        axiosInstance.defaults.headers.Authorization = `bearer ${token}`;
    }
};

const snackBar = (title: string) => Snackbar.show({ text: title, duration: 2000, textColor: colors.white, backgroundColor: colors.black })

const formatUTCDate = (timestamp: any) => {
    const date = new Date(timestamp);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear());
    return `${day}/${month}/${year}`;
}

const formatToLacOrCrore = (value: number) => {
    let val: any = Math.abs(value)
    if (val >= 10000000) {
        val = (val / 10000000).toFixed(1) + ' Crore';
    } else if (val >= 100000) {
        val = (val / 100000).toFixed(0) + ' Lakh';
    }
    return val;
}

const downloadPDF = (url: string) => {
    if (Platform.OS === 'android') {
        const permission = PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
        check(permission).then((result: any) => {
            if (result === RESULTS.GRANTED) {
                startDownloadPDF(url?.trim())
            } else {
                request(permission).then((res: any) => {
                    if (res === 'granted') {
                        startDownloadPDF(url?.trim());
                    }
                    else {
                        Alert.alert(
                            'To download the pdf', 'Please allow the external storage permission.',
                            [
                                {
                                    text: 'cancel',
                                    onPress: undefined,
                                    style: 'destructive',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => openSettings().catch(() => console.warn('cannot open settings'))
                                },
                            ],
                        );
                    }
                });
            }
        }).catch((error: any) => {
            snackBar('Error while downloadingPDF')
            console.log('error while downloading pdf : ', error)
        })
    }
    else
        startDownloadPDF(url?.trim())
}

const startDownloadPDF = async (url: string) => {
    let pdfLocation = RNFetchBlob?.fs?.dirs?.DownloadDir + '/' + Math?.random()?.toString(36)?.substring(2, 7) + '.pdf';

    RNFetchBlob?.fs?.writeFile(pdfLocation, url, 'base64')
        ?.then((response: any) => console.log('response of download pdf', response), (error: any) => console.log('error of download pdf', error))
}

const getIcon = (format: string) => {
    switch (format?.split('.')?.[1]) {
        case 'pdf': return localImages?.PDF_FILE
            break;
        case 'docx': return localImages?.DOC_FILE
            break;
        case 'doc': return localImages?.DOC_FILE
            break;
        case 'csv': return localImages?.EXCEL_FILE
            break;
        case 'xls': return localImages?.EXCEL_FILE
            break;
        case 'xlsx': return localImages?.EXCEL_FILE
            break;
        default: return ''
            break;
    }
}

export default {
    axiosInstance,
    setAuthorizationToken,
    snackBar,
    formatUTCDate,
    formatToLacOrCrore,
    downloadPDF,
    getIcon
};