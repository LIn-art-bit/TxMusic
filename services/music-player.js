import TxRequest from "./index"
export function getMusicDetail(ids) {
  return TxRequest.get({
    url: "/song/detail",
    data: {
      ids
    }
  })
}
export function getlyric(id) {
  return TxRequest.get({
    url: "/lyric",
    data: {
      id
    }
  })
}