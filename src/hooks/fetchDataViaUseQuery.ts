import axiosClient from "@/pages/api/axiosClient";
import { useQuery } from "@tanstack/react-query";

const fetchListData = (fetchURL: string, QUERY_KEY:string, pageIndex:number,params:object)=>{
    const queryData = useQuery({
        queryFn: () =>
          axiosClient.get(fetchURL, {
            params:params
        
    }),
        queryKey: [QUERY_KEY, pageIndex],
        placeholderData: (previousData) => previousData,
      });
      return queryData;
}

export{
    fetchListData
}