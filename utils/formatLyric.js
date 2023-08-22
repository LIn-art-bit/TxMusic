const timeReg = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/ //时间片段的正则表达式
export function formatLyric(lyric) {
  const lyricLine =  lyric.split("\n")
  const lyricList = []
  for (const line of lyricLine) {
   const result = timeReg.exec(line)
   if(!result) continue
   const minute = result[1] * 60 * 1000  //隐形转化为num类型
   const second = result[2] * 1000
   const mSecond = result[3].length === 2 ? result[3] * 10 : result[3] * 1
   const time  = minute + second + mSecond
   const text = line.replace(timeReg, "")
  //  console.log(time, text)
   lyricList.push({
     time,
     text
   })
  }
  return lyricList
}