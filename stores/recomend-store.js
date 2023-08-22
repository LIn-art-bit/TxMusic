import{ HYEventStore } from "hy-event-store"
import { getRecomend } from "../services/music"
export const recommendStore = new HYEventStore({
  state: {
    recommendList: []
  },
  actions: {
    fetchRecommend(ctx) {
      getRecomend(3778678).then((res) =>{
        ctx.recommendList = res.data.playlist
      })
    }
  }
})