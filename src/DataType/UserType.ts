import RoleType from "./RoleType";

export default interface UserType{
    key:string,
    id: string,
    name: string,
    email: string,
    type: string,
    ratio: any,
    isActive: number,
    roleId: number,
    createdAt: string,
    funds: number,
    total_money: number,
    role: RoleType
  }