/* eslint-disable no-underscore-dangle */
import dayjs from 'dayjs'
import round from 'lodash/round'
import last from 'lodash/last'

import getDistance from './getDistance'

const mapGpx = (gpx) => {
  const endTime = last(gpx.trk.trkseg.trkpt).time._text
  const startTime = gpx.trk.trkseg.trkpt[0].time._text
  const trkpts = gpx.trk.trkseg.trkpt.reduce((acc, pt, idx) => {
    const time = dayjs(pt.time._text)
    const previousPt = acc[idx - 1]
    return [...acc, [
      pt._attributes.lat,
      pt._attributes.lon,
      pt.ele._text,
      time.diff(startTime),
      previousPt
        ? round(getDistance(previousPt, [
          pt._attributes.lat,
          pt._attributes.lon,
        ]) + previousPt[4], 4)
        : 0,
    ]]
  }, [])
  const endpt = last(trkpts)
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
