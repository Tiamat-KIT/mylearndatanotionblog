import React from "react";

export default function Budge({children}: {children: React.ReactNode}){
    return (
        <div className={`justify-around badge badge-outline`}>
            {children}
        </div>
    )
}