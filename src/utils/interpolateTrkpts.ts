import lerp from './lerp'

import { Trkpt } from '../types/activity'

const interpolatePosition = ([lat1, lon1]:Trkpt, [lat2, lon2]:Trkpt, duration:number, t:number) => {
  let k = t / duration
  k = (k > 0) ? k : 0
  k = (k > 1) ? 1 : k
  return [
    lat1 + k * (lat2 - lat1),
    lon1 + k * (lon2 - lon1),
  ]
}
const interpolatePositions = (pt1: Trkpt, pt2: Trkpt):Trkpt[] => {
  const duration = (pt2[3] - pt1[3])
  const points:Trkpt[] = []
  for (let i = 1000; i <= duration; i += 1000) {
    const [lat, lon] = interpolatePosition(pt1, pt2, duration, i)
    points.push([
      lat,
      lon,
      lerp([pt1[3], pt1[2]], [pt2[3], pt2[2]], pt1[3] + i),
      pt1[3] + i,
      lerp([pt1[3], pt1[4]], [pt2[3], pt2[4]], pt1[3] + i),
    ] as Trkpt)
  }
  return points
}

const interpolateTrkpts = (trkpts:Trkpt[]):Trkpt[] => (
  trkpts.flatMap((trkpt, idx) => (
    idx ? interpolatePositions(trkpts[idx - 1], trkpt) : [trkpt]
  )))

export default interpolateTrkpts
