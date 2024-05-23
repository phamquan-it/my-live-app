import axiosFund from "@/pages/api/axiosClient";
export interface FundPayLoad{
    keyword?:string,

}
export const fundApi = {
  getList(keyword:string, limit:number, offset:number) {
    return axiosFund.get(`/refund-money/list?language=en`,{
        params:{
            keyword: keyword,
            limit:limit,
            offset:offset
        }
    });
  },
//   login(payload: LoginPayload) {
//     return axiosAuth.post(`/auth/login?language=en`, payload);
//   }
};