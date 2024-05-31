import axiosClient from "@/pages/api/axiosClient"
const getListServicePublic = (params:any)=>{
    return axiosClient.get("/service/list-public", {
        params: params
    })
}
export {
    getListServicePublic
}