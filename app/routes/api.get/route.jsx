import { json } from "@remix-run/node";
import db from "../../db.server";
import { cors } from "remix-utils/cors";

export async function loader({ request }) {
  const { searchParams } = new URL(request.url);
  let shop = searchParams.get("shop");
  const token = await db.session.findFirst({
    where: { shop },
  });

  const serachClass = await db.searchClass.findFirst({
    where: { shop },
  });

  const accessToken = token?.accessToken;
  const currectShop = token?.shop;
  console.log(accessToken);
  console.log(currectShop);
  return await cors(request, json({ accessToken: accessToken, secretId :'d573e782ff3675dde17f01560c3a8efc' ,resultClassName: serachClass.resultClassName ,Html:serachClass.html,filter:serachClass.filter}));
}

