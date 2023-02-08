import Notionclient from "@/client/notion";
//import EmojiRequest,{PageObjectResponse} from "@notionhq/client/build/src/api-endpoints";

export default async function NotionPage(){
    /*type PageData = {
        id: string,
        update_time: string | Date,
        icon: {
            type: "emoji";
            emoji: string;
        } | {
            type: "external";
            external: {
                url: string;
            };
        } | {
            type: "file";
            file: {
                url: string;
                expiry_time: string;
            };
        } | null,
        Tags: string[],
        Title: string,
        Url: string
    }*/
    const PageDataList = [] //: Array<PageData> 
    const res = await Notionclient.databases.query({
        database_id: process.env.DATABASE_ID /*as string*/,
        "sorts":[
            {
                property: "タグ",
                direction: "descending"
            }
        ]
    })
    console.log(res.results[0].properties["タグ"].multi_select.length)
    for(let i in res.results){
        const TagData = res.results[i].properties["タグ"]
        const TagObjList = []
        for(let num in TagData.multi_select){
            //console.log(num + "がnumの値")
            const tag = res.results[i].properties["タグ"].multi_select[num].name
            const tagColor = res.results[i].properties["タグ"].multi_select[num].color
            TagObjList.push({tag: tag,TagColor: tagColor})
            console.log(TagObjList)
        }
        PageDataList.push(
            {
                id: res.results[i].id,
                update_time: res.results[i].last_edited_time,
                icon: res.results[i].icon,
                Tags: TagObjList,
                Title: res.results[i].properties["名前"].title[0].text.content,
                Url: res.results[i].url
            }
        )
        console.log(PageDataList)
    
    }
    
    //console.log(PageDataList)
    return PageDataList
}
