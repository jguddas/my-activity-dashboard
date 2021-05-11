import simplify from 'simplify-js'

import { Trkpt } from '../types/activity'

const simplifyTrkpts = (trkpts:Trkpt[], tolarance:number):Trkpt[] => simplify(
  trkpts.map((pt) => ({
    x: Number(pt[0]),
    y: Number(pt[1]),
    pt,
  })),
  tolarance,
  true,
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
).map(({ pt }) => pt)

export default simplifyTrkpts
