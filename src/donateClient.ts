import {JSDOM} from "jsdom"
import { Options } from "request"
import {doRequest} from "./requestWrapper"
import {analysis} from "./scheduleAnalysis"

const BASE_URL = "https://www.bs.jrc.or.jp/th/aomori/place/m1_03_bus.html"

interface IDonateBloodBusDataClient {
  isOperationDate(municipality: string, date: Date): Promise<boolean>
}

class DonateBloodBusDataClient implements IDonateBloodBusDataClient {
  constructor(private request: (options: Options) => Promise<string> = doRequest,
    private analisys: (dom: JSDOM, date: Date) => Promise<boolean> = analysis) {
  }

  async isOperationDate(municipality: string, date: Date): Promise<boolean> {
    const body = await this.getSchedulePage(municipality)
    return await analysis(body, date)
  }

  public async getSchedulePage(municipality: string): Promise<JSDOM> {
    const body = await this.request({uri: encodeURI(`${BASE_URL}?selectarea=${municipality}&selectday=-`), method: "GET"})
    return new JSDOM(body)
  }

}

const DonateClientFactory = {
  create: (): IDonateBloodBusDataClient => {
    return new DonateBloodBusDataClient()
  }
}

export {
  DonateClientFactory,
  IDonateBloodBusDataClient,
  DonateBloodBusDataClient,
}
