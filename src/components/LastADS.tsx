import { useEffect, useState } from "react";

const LastADS = ()=>{
    const [fistAnimate,setFistAnimate] = useState<string>("-translate-x-10")
    const [secondAnimate,setSecondAnimate] = useState<string>("-translate-y-16")
    const [thirthAnimate,setThirthAnimate] = useState<string>("translate-x-10")
    const [fourthAnimate,setFourthAnimate] = useState<string>("translate-y-14")
    const lastAnimateControl = ()=>{
        setFistAnimate("")
        setSecondAnimate("")
        setThirthAnimate("")
        setFourthAnimate("")
    }
  return(
    <>
    <div className="grid grid-rows-3 grid-cols-2 gap-3 container m-auto" onMouseOver={lastAnimateControl}>
            <div className={`p-3 duration-500 rounded row-span-2 border ${fistAnimate}`}>div1</div>
            <div className={`p-3 duration-700 rounded border ${secondAnimate}`}>div1</div>
            <div className={`p-3 duration-1000 rounded row-span-2 border ${thirthAnimate}`}>div1</div>
            <div className={`p-3 duration-1000 rounded border ${fourthAnimate}`}>div1</div>
    </div>
    </>
);
} 
 export default LastADS