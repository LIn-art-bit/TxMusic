import TxRequest from "./index"
export function getSwipe(type = 0) {
  return TxRequest.get({
    url: '/banner',
    data: {
      type
    }
  })
}
export function getRecomend(id) {
  return TxRequest.get({
    url: '/playlist/detail',
    data: {
      id
    }
  })
}
export function getMenu(cat = "全部", limt = 6, offset = 0) {
  return TxRequest.get({
    url: "/top/playlist",
    data: {
      cat,
      limt,
      offset
    }
  })
}
export function getMenuTag() {
  return TxRequest.get({
    url: "/playlist/hot"
  })
}