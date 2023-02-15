import Notionclient from "@/client/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import Link from "next/link";
import Badge from "./Badge";
import Card from "./Card";
import CardTitle from "./ResponsiveCardTitle";

export default async function GetNotionData(){
    type TagData = Record<"TagName" | "TagColor",string[]> 
    type ReturnPageData = Record<"Id" | "UpdateTime" | "Title" | "Url",string> & { Tag: TagData}
    const PageDataList: PageObjectResponse[] = []
    const ReturnPageDataList :ReturnPageData[] = []

    await Notionclient.databases.query({
        database_id: process.env.DATABASE_ID as string,
        "sorts":[
            {
                property: "タグ",
                direction: "descending",
            },
        ],
        /*"filter":[

        ]*/
    }).then((res) => {
        res.results.forEach(result => {
            if("properties" in result){
                PageDataList.push(result)
            }
        })
    })

    if(!PageDataList.length){
        throw new Error("データ取得ができてないよ")
    }else{
        PageDataList.forEach((PageData,i) => {
            const TagDataList : TagData[] = []
            if(
            PageData.properties["タグ"].type === "multi_select" 
            &&
            PageData.properties["名前"].type === "title"
            ){
                const TagDataStore = PageData.properties["タグ"].multi_select
                const TagNameDataStore:string[] = []
                const TagColorDataStore:string[] = []
                TagDataStore.forEach((data,i) => {
                    TagNameDataStore.push(data.name)
                    TagColorDataStore.push(data.color)
                })

                ReturnPageDataList.push({
                    Id: PageData.id,
                    UpdateTime: PageData.last_edited_time,
                    Title: PageData.properties["名前"].title[0].plain_text,
                    Url: PageData.url,
                    Tag: {
                        TagName: TagNameDataStore,
                        TagColor: TagColorDataStore
                    }
                })
                
            }
        })
        return(
            <div className={`flex flex-wrap justify-around`}>
                {ReturnPageDataList.map((data,i) => {
                    return(
                        <div key={i} className="pt-5">
                            <Card padding="pt-5">
                            <CardTitle>{data.Title}</CardTitle>
                                <div className="grid grid-cols-1">
                                    {data.Tag.TagName.map((tag_name,i) => {
                                        return(
                                            <div key={i} className="text-left">
                                                <Badge Tag={tag_name} />
                                            </div>
                                        )
                                    })}
                                </div>
                                <Link href={data.Url} className={`btn btn-success`}>内容はこちら</Link>
                                <p>最終更新日:{data.UpdateTime.split("T")[0]}</p>
                            </Card>
                        </div>
                    )
                })
                }
            </div>
        )
    }
}


        