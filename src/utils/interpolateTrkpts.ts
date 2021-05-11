const interpolatePosition = ([lat1, lon1], [lat2, lon2], duration, t) => {
  let k = t / duration
  k = (k > 0) ? k : 0
  k = (k > 1) ? 1 : k
  return [
    lat1 + k * (lat2 - lat1),
    lon1 + k * (lon2 - lon1),
  ]
}
const interpolatePositions = (pt1, pt2) => {
  const duration = (pt2[3] - pt1[3])
  const points = []
  for (let i = 1000; i <= duration; i += 1000) {
    points.push([...interpolatePosition(pt1, pt2, duration, i), 0, pt1[3] + i])
  }
  return points
}

const interpolateTrkpts = (trkpts) => trkpts.flatMap((trkpt, idx) => (
  idx ? interpolatePositions(trkpts[idx - 1], trkpt) : [trkpt]
))

export default interpolateTrkpts
