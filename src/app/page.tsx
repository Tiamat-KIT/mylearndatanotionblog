import NotionPage from "@/Component/NotionPage";
import Link from "next/link";

export default async function Home() {
  const PageData = await NotionPage()
  /*if(!PageData.length){
    throw new Error("中身ないですね")
  }else {
    console.log("中身はある")
  }*/

  return (
    <>
      <h1>MyNotion-LearnMemo</h1>
      {PageData.map((data,i) => {
        return (
          <div key={i}>
            <h1>{data.Title}</h1>
            {data.Tags.map((tag,i) => {
                return(
                  <div key={i} style={{display: "inline-flex",paddingLeft: "5px"}}>
                    <p style={{backgroundColor: `${tag.TagColor}`,color: "white"}}>{tag.tag}</p>
                  </div>
                )
            })}
            <div style={{padding: "5px"}} />
            <Link href={data.Url}>内容はこちら</Link>
            <p>最終更新日:{data.update_time.split("T")[0]}</p>
          </div>
        )
      })}
    </>
  )
}
