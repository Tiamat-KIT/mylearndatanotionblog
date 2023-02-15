import NotionPage from "@/Component/NotionPage";
import Link from "next/link";
import Card from "@/Component/Card";
import Badge from "@/Component/Badge";
import CardTitle from "@/Component/ResponsiveCardTitle";
export const revalidate = 0 //キャッシュ使いません

export default async function Home() {
  const PageData = await NotionPage()

  return (
    <div  className={``}>
      <h1 className="hero phone:text-2xl tablet:text-3xl laptop:text-4xl desktop:text-5xl font-bold pt-10">MyNotion-LearnMemo</h1>
      <div className={`flex flex-wrap justify-around`}>
      {PageData.map((data,i) => {
        return (
          <div key={i} className="pt-5">
              <Card padding="pt-5">
                <CardTitle>{data.Title}</CardTitle>
                  <div className="flex flex-row">
                    {data.Tags.map((tag,i) => {
                      return(
                        <div key={i}>
                          <Badge>
                            <p className={`basis-1/2`}>
                              {tag.tag}
                            </p>
                          </Badge>
                        </div>
                      )
                  })}
                </div>
                <div className={``} />
                <Link href={data.Url} className={`btn btn-success`}>内容はこちら</Link>
                <p>最終更新日:{data.update_time.split("T")[0]}</p>
              </Card>
          </div>
        )
      })}
      </div>
    </div>
  )
}
