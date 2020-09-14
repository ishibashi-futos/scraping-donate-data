import {doRequest} from "./requestWrapper"
import {JSDOM} from "jsdom"

describe("doRequestのテスト", () => {
  const url = "https://www.bs.jrc.or.jp/th/aomori/place/m1_03_bus.html?selectarea=%E5%85%AB%E6%88%B8%E5%B8%82&selectday=-"
  test("googleのページを取得できる", async () => {
    const body = await doRequest({uri: "https://www.google.co.jp/", method: "GET"});
    expect(body).not.toEqual("");
    const dom = (new JSDOM(body)).window.document;
    expect(dom.title).toEqual("Google");
  });

  test("献血バス運航スケジュールのページを取得できる", async() => {
    const body = await doRequest({uri: url, method: "GET"});
    const dom = (new JSDOM(body)).window.document;
    expect(dom.title).toEqual("献血バス運行スケジュール｜青森県赤十字血液センター｜日本赤十字社");
  });
})
