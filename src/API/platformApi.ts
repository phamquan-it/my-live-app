import axiosClient from "@/pages/api/axiosClient"
const getListPlatform = (params:any)=>{
    return axiosClient.get("/platform/list", {
        params: params
    })
}
export {
    getListPlatform
}