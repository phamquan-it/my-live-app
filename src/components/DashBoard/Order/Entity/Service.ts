interface Provider{
    id:number,
    name:string,
    link:string
}
interface Service{
    id: number,
    name: string,
    provider: Provider
}

export type{
    Provider,
    Service
}