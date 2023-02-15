import GetNotionData from "@/Component/NotionPage";
export const revalidate = 0 //キャッシュ使いません

export default async function Home() {
  return (
    <div>
      <h1 className="hero phone:text-2xl tablet:text-3xl laptop:text-4xl desktop:text-5xl font-bold py-10">MyNotion-LearnMemo</h1>
      <div className="form-control">
        <div className="input-group">
          <input type="text" placeholder="Tag's Search…" className="input input-bordered" />
          <button className="btn btn-square">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </button>
        </div>
      </div>
      {await GetNotionData()}
    </div>
  )
}
