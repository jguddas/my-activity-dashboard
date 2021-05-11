import * as polylineUtil from 'polyline-encoded'
import { compress, decompress } from 'int-compress-string'

import { Trkpt } from '../types/activity'

export const encode = (trkpts:Trkpt[]):string => {
  const { t, d } = trkpts.reduce<{t:number[], d:number[]}>((acc, trkpt) => ({
    t: acc.t.concat(Math.floor(trkpt[3] / 1000)),
    d: acc.d.concat(Math.floor(trkpt[4] * 100)),
  }), { t: [], d: [] })
  return [
    compress(t),
    compress(d),
    polylineUtil.encode(trkpts),
  ].join(',').replace(/=,/g, '=')
}

export const decode = (str: string):Trkpt[] => {
  const [ct, cd, cp] = str.replace(/=+/g, '$&,').split(',')
  const t = decompress(ct)
  const d = decompress(cd)
  const line = polylineUtil.decode(cp)
  return t.map((_, idx) => [
    line[idx][0],
    line[idx][1],
    0,
    t[idx] * 1000,
    d[idx] / 100,
  ])
}
