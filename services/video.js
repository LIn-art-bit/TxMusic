import TxRequest from "./index"
export function getVideoList(limit = 20, offSet = 0) {
  return TxRequest.get({
    url: "/top/mv",
    data: {
      limit,
      offSet
    }
  })
}