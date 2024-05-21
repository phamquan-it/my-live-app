import { OrderType } from "./OrderType";


interface OrderData {
    total:number
    data: OrderType[];
    onChange?:(paginate?:any, filter?:any, sort?:any)=>void
  }

  export default OrderData