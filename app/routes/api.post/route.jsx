import { json } from "@remix-run/node";
import db from "../../db.server";
import { cors } from "remix-utils/cors";

export async function action({ request }) {
    const data=request.json();
  const { searchParams } = new URL(request.url);
  let shop = data.shop;
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

  return await cors(request, json({ accessToken: accessToken, secretId :'02b02d849e931118bdf6c9a027136c32' ,resultClassName: serachClass.resultClassName ,Html:serachClass.html,filter:serachClass.filter}));
}

