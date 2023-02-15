import Notionclient from "@/client/notion";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
//import EmojiRequest,{PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";

export default async function NotionPage(){
    type TagData = Record<"TagName" | "TagColor",string[]> 
    type ReturnPageData = Record<"Id" | "UpdateTime" | "Title" | "Url",string> & { Tag: TagData}
    const PageDataList: PageObjectResponse[] = []
    const ReturnPageDataList :ReturnPageData[] = []

    await Notionclient.databases.query({
        database_id: process.env.DATABASE_ID as string,
        "sorts":[
            {
                property: "タグ",
                direction: "descending"
            }
        ]
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
            //console.log(i)
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
    }
    return ReturnPageDataList

}
    /* const TagData = PageDataList[i].properties["タグ"].multi_select
        const TagObjList = []
        for(let num in TagData.multi_select){
            //TagObjList.push({tag: TagData[num].name,TagColor: TagData[num].color})
    */
