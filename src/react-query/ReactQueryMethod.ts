import axiosClient from "@/pages/api/axiosClient"
import { useQuery } from "@tanstack/react-query"

const ReactQueryMethod = {
    get:(key:string, url:string, params:object)=>{
        return useQuery({
            queryKey: [key, params],
            queryFn: () => axiosClient.get(url, params),
          })
    }
}

export default ReactQueryMethod;
