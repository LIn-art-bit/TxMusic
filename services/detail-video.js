import TxRequest from "./index"
export function getMvUrl(id) {
 return  TxRequest.get({
    url: "/mv/url",
    data: {
      id
    }
  })
}
export function getMvInfo(mvid) {
  return  TxRequest.get({
     url: "/mv/detail",
     data: {
       mvid
     }
   })
 }
 export function getRelateMv(id) {
  return TxRequest.get({
     url: "/related/allvideo",
     data: {
       id
     }
   })
 }
