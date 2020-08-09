/* eslint-disable no-underscore-dangle */
import L from 'leaflet'

const simplifyTrkPts = (trkpts, lvl) => L.LineUtil.simplify(
  trkpts.map((pt) => ({
    x: Number(pt._attributes.lat),
    y: Number(pt._attributes.lon),
    ...pt,
  })),
  10 ** lvl / 1000000,
)

export default simplifyTrkPts
