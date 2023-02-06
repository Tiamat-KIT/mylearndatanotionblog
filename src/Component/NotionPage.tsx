import Notionclient from "@/client/notion";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default function NotionPage(){
    //const data:string[] = []
    Notionclient.databases.query({
        database_id: process.env.DATABASE_ID as string,
        "sorts":[
            {
                property: "タグ",
                direction: "descending"
            }
        ]
    }).then((res)=> {
        for(let i in res.results){
            //data.push(res.results[i].object)
            console.log(res.results)
        }
        //console.log(data)
    })
    return (<p>TEST</p>)
}