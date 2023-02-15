import React from "react";
export default function CardTitle({children}: {children: React.ReactNode}){
    return (
        <>
            <h1 className={`font-bold desktop:text-3xl laptop:text-2xl tablet:text-xl phone:text-md`}>
                {children}
            </h1>
        </>
    )
}