import NotionPage from "@/Component/NotionPage";
import Link from "next/link";

export const revalidate = 0 //キャッシュ使いません

export default async function Home() {
  const PageData = await NotionPage()

  return (
    <div  className={``}>
      <h1 className="hero text-5xl font-bold">MyNotion-LearnMemo</h1>
      <div className={`pt-20 grid grid-rows-2 grid-flow-col justify-around`}>
      {PageData.map((data,i) => {
        return (
          <div key={i} className={`card card-bordered	border-slate-400 shadow-xl`}>
            <div className={`card-body rounded-sm`}>
              <h1 className={`font-bold text-3xl`}>{data.Title}</h1>
              <div className="flex flex-row">
              {data.Tags.map((tag,i) => {
                  return(
                    <div key={i} className={`justify-around badge badge-outline badge-${tag.TagColor}`}>
                        <p className={`basis-1/2`}>
                          {tag.tag}
                        </p>
                      </div>
                    )
                })}
              </div>
              <div className={``} />
              <Link href={data.Url} className={`btn btn-success`}>内容はこちら</Link>
              <p>最終更新日:{data.update_time.split("T")[0]}</p>
            </div>
          </div>
        )
      })}
      </div>
    </div>
  )
}
