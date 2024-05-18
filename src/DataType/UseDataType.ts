import UserType from "./UserType";

interface UserData {
    total:number
    data: UserType[];
    onChange?:(paginate?:any, filter?:any, sort?:any)=>void
  }

  export default UserData