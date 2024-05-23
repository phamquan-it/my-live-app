import { Provider } from "../../Order/Entity/Service"

interface ServiceType {
    key:number
    id: number
    service:{
        cancel:string
        description:string
        dripfeed:string
        id: number
        initial_rate:string
        level: number,
        max: string
        min:string
        refill:string
        name:string
    }
    
    type:string
    ratio:any
    rate: string
   
    status:number
    providerId: number,
    provider: Provider
    rate_config: number
  }
export type{
    ServiceType
}