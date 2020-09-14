import {JSDOM} from "jsdom"

function analysis(jsdom: JSDOM, today: Date): Promise<boolean> {
  return new Promise<boolean>((resolve, reject) => {
    const dates = jsdom.window.document.querySelectorAll(".mod-table-scrollWrap");
    if (dates.length <= 0) {
      reject("elements not found.")
    } else {
      dates.forEach((e) => {
        const textContent = e.previousElementSibling?.textContent
        if (textContent && format(textContent) === DateFormatter().format(today)) {
            resolve(true)
        }
      })
      resolve(false)
    }
  })
}

const format = (md: string) => {
  return md.replace("月", "/").replace("日", "").replace(/\(.\)/, "")
}

const DateFormatter = () => {
  const fmt = {
    "MM": (date: Date) => (date.getMonth() + 1).toString(),
    "dd": (date: Date) => date.getDate().toString()
  }
  return {
    format: (date: Date) => {
      return `${fmt.MM(date)}/${fmt.dd(date)}`
    }
  }
}

export {
  analysis,
  format,
  DateFormatter
}
