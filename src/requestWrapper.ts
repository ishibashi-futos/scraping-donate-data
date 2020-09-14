import request, {Options} from "request"

const doRequest = (options: Options): Promise<string> => {
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (!err && res.statusCode === 200) {
        resolve(body)
      } else {
        reject(err)
      }
    })
  })
}

export {doRequest}
