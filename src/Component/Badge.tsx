import React from "react";

export default function Budge({Tag}:{Tag: string}){
    if(Tag == "途中"){
        return(
            <div className={`justify-around badge badge-error`}>
                <p className={`text-white`}>{Tag}</p>
            </div>
        )
    }else{
        return (
            <div className={`justify-around badge badge-outline`}>
                <p>{Tag}</p>
            </div>
        )
    }
}