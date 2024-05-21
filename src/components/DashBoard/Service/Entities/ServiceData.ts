import { ServiceType } from "./ServiceType";
interface ServiceData {
    total:number
    data: ServiceType[];
    onChange?:(paginate?:any, filter?:any, sort?:any)=>void
  }
  export default ServiceData