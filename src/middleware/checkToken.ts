import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";

const WhenAdminValidToken = (req:any,token:any)=>{
    if(req.nextUrl.pathname == "/login"||"/register"){
        console.log("tk1234");
        try{
            const decoded:any = jwtDecode(token?.value+"");
            console.log(decoded.role==="admin");
            
            if (decoded.exp * 1000 < Date.now()) {
                console.log('Token has expired');
                return NextResponse.redirect(new URL('/login', req.url));
            }
            if(decoded.role == "admin"){
                return NextResponse.redirect(new URL("/dashboard", req.url))
            }
        }catch(e){
            console.log("invalid token"); 
        }
    }
} 

export{
    WhenAdminValidToken
}