import NotionPage from "@/Component/NotionPage";

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
                  <p key={i}>{tag}</p>
                )
            })}
          </div>
        )
      })}
    </>
  )
}
