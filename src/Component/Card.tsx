import React from "react";

export default function Card({children,padding}: {children: React.ReactNode,padding: string}) {
    return (
        <div className={` ${padding}`}>
            <div className={`card card-bordered desktop:basis-1/4 laptop:basis-1/4 tablet:basis-1/2 phone:basis-1`}>
                <div className={`card-body rounded-sm`}>
                    {children}
                </div>
            </div>  
        </div>
    )
}