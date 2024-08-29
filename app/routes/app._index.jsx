import { authenticate } from "../shopify.server";
import db from "../db.server";
import {
  Form,
  FormLayout,
  TextField,
  Button,
  LegacyCard,
  Layout,
  Page,
} from "@shopify/polaris";
import { useEffect, useState, useCallback } from "react";
import { useSubmit, useLoaderData } from "@remix-run/react";
export async function loader({ request }) {
  const admin = await authenticate.admin(request);
  const shop = admin.session.shop;
  let searchClass = await db.searchClass.findFirst({
    where: { shop },
  });
  console.log(searchClass,"searchClass");
  if(!searchClass?.resultClassName || searchClass?.resultClassName=='')
  {
    const resultSearch=".product-grid";
    const html=`<li class=grid__item><link href="//quickstart-db2dc1d6.myshopify.com/cdn/shop/t/2/assets/component-rating.css?v=24573085263941240431712654692"media=all rel=stylesheet><div class="card-wrapper product-card-wrapper underline-links-hover"><div class="card card--media card--standard"style=--ratio-percent:100.0%><div class="card__inner color-background-2 gradient ratio"style=--ratio-percent:100.0%><div class=card__media><div class="media media--hover-effect media--transparent"><img alt="T shirt"class=motion-reduce height=1200 src=[[IMAGESRC]] width=1200></div></div><div class=card__content><div class=card__information><h3 class=card__heading><a aria-labelledby="StandardCardNoMediaLink-template--22334331289879__product-grid-9192946991383 NoMediaStandardBadge-template--22334331289879__product-grid-9192946991383"class=full-unstyled-link href=[[HANDLE]] id=StandardCardNoMediaLink-template--22334331289879__product-grid-9192946991383>[[TITLE]]</a></h3></div><div class="bottom card__badge left"></div></div></div><div class=card__content><div class=card__information><h3 class="card__heading h5"id=title-template--22334331289879__product-grid-9192946991383><a aria-labelledby="CardLink-template--22334331289879__product-grid-9192946991383 Badge-template--22334331289879__product-grid-9192946991383"class=full-unstyled-link href=[[HANDLE]] id=CardLink-template--22334331289879__product-grid-9192946991383>[[TITLE]]</a></h3><div class=card-information><span class="caption-large light"></span><div class=price><div class=price__container><div class=price__regular><span class="visually-hidden visually-hidden--inline">Regular price</span> <span class="price-item price-item--regular">$[[PRICE]] USD</span></div><div class=price__sale><span class="visually-hidden visually-hidden--inline">Regular price</span> <span><s class="price-item price-item--regular"></s> </span><span class="visually-hidden visually-hidden--inline">Sale price</span> <span class="price-item price-item--last price-item--sale">$[[PRICE]] USD</span></div><small class="caption hidden unit-price"><span class=visually-hidden>Unit price</span> <span class="price-item price-item--last"><span></span> <span aria-hidden=true>/</span> <span class=visually-hidden> per </span><span></span></span></small></div></div></div><div class=collection-extension-btn-os id=collection-extension-btn-os></div><div class="grid__item collection-filter-btn"><button class="button button--full-width button--secondary miros-item miros-supported product-form__submit"data-miros-entry=custom data-miros-id=0.6250888136321999 data-miros-item=[[PRODUCTID]]>Extension Button</button></div></div><div class="bottom card__badge left"></div></div></div></div>`;
    const searchSuggestion="predictive-search-results-products-list";
    const htmlSuggestion=`<div class="product">
                            <img src="[[IMAGE]]" alt="[[NAME]]" style="width: 50px; height: 50px;">
                            <p>[[NAME]]</p>
                        </div>`;
    if(searchClass?.resultClassName=='')
    {
      await db.searchClass.updateMany({
        where: { shop },
        data: {
          resultClassName: resultSearch,
          html :html,
          suggestionSearch:searchSuggestion,
          htmlSuggestion:htmlSuggestion
         },
      });
    }
    else{
    await db.searchClass.create({
      data: {
        shop,
        resultClassName: resultSearch,
        html :html,
        suggestionSearch:searchSuggestion,
        htmlSuggestion:htmlSuggestion
        },
    });
    }
    searchClass = await db.searchClass.findFirst({
      where: { shop },
    });
    console.log("create query end");
  }
  return searchClass;
}
export async function action({ request }) {
  const admin = await authenticate.admin(request);
  const shop = admin.session.shop;
  const body = await request.formData();
  const resultSearch = body.get("resultSearch");
  const html = body.get("html");
  const suggestionSearch = body.get("suggestionSearch");
  const htmlSuggestion = body.get("htmlSuggestion");

  console.log("resultSearch",resultSearch);
  console.log("html",html);

  const existingSearchClass = await db.searchClass.findFirst({
    where: { shop },
  });

  if (!existingSearchClass) {
    await db.searchClass.create({
      data: {
        shop,
        resultClassName: resultSearch,
        html :html,
        suggestionSearch :suggestionSearch,
        htmlSuggestion:htmlSuggestion
      },
    });
  } else {
    await db.searchClass.updateMany({
      where: { shop },
      data: {
        resultClassName: resultSearch,
        html :html,
        suggestionSearch :suggestionSearch,
        htmlSuggestion:htmlSuggestion
      },
    });
  }

  return existingSearchClass;
}

export default function Index() {
  const submit = useSubmit();
  const invoices = useLoaderData();
  const prevData = invoices?.resultClassName;
  const prevSuggestion = invoices?.suggestionSearch || "";
  const htmlprevData = invoices?.html;
  const htmlprevSuggestion = invoices?.htmlSuggestion || "";
  const [data, setdata] = useState(prevData || "");
  const [searchSuggestion, setSearchSuggestion] = useState(prevSuggestion);
  const [htmldata, sethtmldata] = useState(htmlprevData || "")
  const [htmlSuggestion, sethtmlSuggestion] = useState(htmlprevSuggestion)
  const handleSubmit = useCallback(() => {
    submit({ resultSearch: data,html:htmldata , suggestionSearch : searchSuggestion ,  htmlSuggestion: htmlSuggestion}, { method: "post" });
  }, [htmldata,data,searchSuggestion ,htmlSuggestion, submit]);
  const handleDataChange = useCallback((value) => setdata(value), []);
  const handleSuggestion = useCallback((value) => setSearchSuggestion(value), []);
  const handleHtmlDataChange = useCallback((value) => sethtmldata(value), []);
  const handleHtmlSuggestion = useCallback((value) => sethtmlSuggestion(value), []);
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <LegacyCard title="Enter input data" sectioned>
            <Form onSubmit={handleSubmit}>
              <FormLayout>
                <TextField
                  value={data}
                  onChange={handleDataChange}
                  label="Enter UL Class eg(.product-grid)"
                  type="text"
                  autoComplete="off"
                  name="resultSearch"
                />

                 <TextField
                  value={htmldata}
                  onChange={handleHtmlDataChange}
                  label="Enter li code"
                  type="text"
                  multiline={4}
                  autoComplete="off"
                  name="html"
                />
                 <TextField
                  value={searchSuggestion}
                  onChange={handleSuggestion}
                  label="Enter suggestion Id eg(predictive-search-results-products-list)"
                  type="text"
                  autoComplete="off"
                  name="suggestionSearch"
                />

                 <TextField
                  value={htmlSuggestion}
                  onChange={handleHtmlSuggestion}
                  label="Enter div suggestion"
                  type="text"
                  multiline={4}
                  autoComplete="off"
                  name="htmlSuggestion"
                />
                <Button textAlign="center" submit>
                  Save
                </Button>
              </FormLayout>
            </Form>
          </LegacyCard>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

