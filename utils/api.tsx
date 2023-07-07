import common from "./common"

const getAPI = (endPoint: any, body: any, successCallback: any, errorCallback: any,) => {
    common?.axiosInstance?.get(endPoint, { params: body })
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            errorCallback(error);
        })
}

const postAPI = (endPoint: any, body: any, successCallback: any, errorCallback: any,) => {
    common?.axiosInstance?.post(endPoint, body)
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            errorCallback(error);
        })
}

const putAPI = (endPoint: any, body: any, successCallback: any, errorCallback: any,) => {
    common?.axiosInstance?.put(endPoint, body)
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            errorCallback(error);
        })
}

const deleteAPI = (endPoint: any, body: any, successCallback: any, errorCallback: any,) => {
    common?.axiosInstance?.delete(endPoint, { data: body })
        .then((response: any) => {
            successCallback(response);
        })
        .catch((error: any) => {
            errorCallback(error);
        })
}

export {
    getAPI,
    postAPI,
    putAPI,
    deleteAPI
}