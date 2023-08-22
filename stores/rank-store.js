import{ HYEventStore } from "hy-event-store"
import { getRecomend } from "../services/music"
const rankIds = {
  newRank: 3779629,
  orginRank: 2884035,
  upRank: 19723756
}
export const rankStore = new HYEventStore({
  state: {
    newRank: {},
    orginRank: {},
    upRank: {}
  },
  actions: {
    fetchRank(ctx) {
      for (const key in rankIds) {
        getRecomend(rankIds[key]).then((res) =>{
          ctx[key] = res.data.playlist
        })
      }
    }
  }
})