import Notionclient from "@/client/notion";
import { ReactElement, JSXElementConstructor, ReactFragment } from "react";

export default function NotionPage(){
    const val: string[] = []
    Notionclient.databases.query({
        database_id: process.env.DATABASE_ID as string
    }).then((res)=> {
        for (let n in res.results){
            let item = res.results[n].object
            val.push(item)
        } 
    })
    return <p>{val}</p>
}