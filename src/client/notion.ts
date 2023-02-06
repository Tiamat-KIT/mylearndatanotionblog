import { Client } from "@notionhq/client";
const NotionClient = new Client({auth: process.env.NOTION_SECRET as string})
export default NotionClient