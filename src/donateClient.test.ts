import {DonateClientFactory, DonateBloodBusDataClient} from "./donateClient"

describe("メイン処理", () => {
  describe("getSchedulePage", () => {
    test("八戸市のデータを正常に取得できる", async () => {
      const client: DonateBloodBusDataClient = <DonateBloodBusDataClient> DonateClientFactory.create()
      expect.assertions(1)
      const document = await client.getSchedulePage("八戸市")
      expect(document.window.document.title).toEqual("献血バス運行スケジュール｜青森県赤十字血液センター｜日本赤十字社")
    })
  })

  describe("全体を通してのテスト", () => {
    test("2020/9/13", async () => {
      const client = DonateClientFactory.create()
      const result = client.isOperationDate("八戸市", new Date())
      expect(result).toBeTruthy()
    })
  })
})
