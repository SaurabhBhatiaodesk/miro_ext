import { json } from "@remix-run/node";
import db from "../../db.server";
import { cors } from "remix-utils/cors";

export async function loader({ request }) {
  const { searchParams } = new URL(request.url);
  let shop = searchParams.get("shop");

  const serachClass = await db.searchClass.findFirst({
    where: { shop },
  });


  return await cors(request, json(serachClass));
}

