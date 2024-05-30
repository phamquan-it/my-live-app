import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";

export function middleware(req:NextRequest){
    const response = NextResponse.next()
    const token = req.cookies.get("token")
    try{
        const decoded:any = jwtDecode(token?.value+"");
        console.log(decoded.role==="admin");
        
        if (decoded.exp * 1000 < Date.now()) {
            return NextResponse.redirect(new URL("/login", req.url))
        }
        if(decoded.role == "admin" && req.nextUrl.pathname !=="/dashboard"){
            return NextResponse.redirect(new URL("/dashboard", req.url))
        }
    }catch(e){
        if(!token && req.nextUrl.pathname != "/dashboard"){
            return response;
        }
        console.log("invalid token");
        if(req.nextUrl.pathname !=="/login")
        return NextResponse.redirect(new URL("/login", req.url))
    }
    
}

export const config = {
    matcher:["/dashboard", "/login", "/register"]
}