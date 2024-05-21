import { Provider } from "../../Order/Entity/Service"

interface ServiceType {
    key:number
    id: number
    service:{
        cancel:string
        description:string
        id: number
        min:string
        max: string
        dripfeed:string
        refill:string
        level: number,
        name:string
    }
    
    type:string
    ratio:any
    rate: string
    initial_rate:string
    status:number
    providerId: number,
    provider: Provider
    rate_config: number
  }
export type{
    ServiceType
}