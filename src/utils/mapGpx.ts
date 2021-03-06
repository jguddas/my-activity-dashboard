/* eslint-disable no-underscore-dangle */
import dayjs from 'dayjs'
import round from 'lodash/round'
import memoize from 'lodash/memoize'
import getDistance from './getDistance'

import { ActivityWithTrkpts, Trkpt } from '../types/activity'
import { Gpx, Gpxpt } from '../types/gpx'

const toTrkpt = memoize((pt:Gpxpt, arr:Gpxpt[], idx:number, startTime:string):Trkpt => {
  const time = dayjs(pt.time._text)
  const previousPt = arr[idx - 1] ? toTrkpt(arr[idx - 1], arr, idx - 1, startTime) : null
  return [
    parseFloat(pt._attributes.lat),
    parseFloat(pt._attributes.lon),
    parseFloat(pt.ele._text),
    time.diff(startTime),
    previousPt
      ? round(getDistance(previousPt, [
        parseFloat(pt._attributes.lat),
        parseFloat(pt._attributes.lon),
      ]) + previousPt[4], 4)
      : 0,
  ]
})

const mapGpx = (gpx:Gpx['gpx']):Omit<ActivityWithTrkpts, 'id'> => {
  const endTime = gpx.trk.trkseg.trkpt.slice(-1)[0].time._text
  const startTime = gpx.trk.trkseg.trkpt[0].time._text
  const trkpts = gpx.trk.trkseg.trkpt.map((pt, idx, arr) => toTrkpt(pt, arr, idx, startTime))
  const endpt = trkpts.slice(-1)[0]
  const distance = endpt[4]

  return ({
    endTime,
    startTime,
    distance,
    name: gpx.trk.name._text,
    duration: dayjs(endTime).diff(startTime),
    date: dayjs(startTime).format('YYYY-MM-DD'),
    trkpts,
    startpt: trkpts[0],
    endpt,
    speed: distance / (dayjs(endTime).diff(startTime) / 3600000),
  })
}

export default mapGpx
