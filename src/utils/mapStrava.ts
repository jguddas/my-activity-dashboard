/* eslint-disable camelcase */
import dayjs from 'dayjs'
import round from 'lodash/round'

import { Activity, Trkpt } from '../types/activity'

type Arg = {
  id: number
  name: string
  distance: number
  streams?: {
    time:{data:number[]}
    latlng:{data:[number, number][]}
    altitude:{data:number[]}
    distance:{data:number[]}
  }
  start_date: string
  elapsed_time: number
}

const mapStrava = ({
  id,
  name,
  distance,
  streams,
  start_date,
  elapsed_time,
}:Arg):Activity => {
  const trkpts = streams ? streams.time.data.map((time, idx):Trkpt => ([
    streams.latlng.data[idx][0],
    streams.latlng.data[idx][1],
    streams.altitude.data[idx],
    time * 1000,
    round(streams.distance.data[idx] / 1000, 4),
  ])) : null

  const startTime = dayjs(start_date)

  return {
    id: `${id}`,
    externalLink: `https://www.strava.com/activities/${id}`,
    endTime: startTime.add(elapsed_time, 'second').toISOString(),
    startTime: startTime.toISOString(),
    distance: distance / 1000,
    name,
    duration: elapsed_time * 1000,
    date: startTime.format('YYYY-MM-DD'),
    speed: distance / (elapsed_time / 3.6),
    ...(trkpts && trkpts[0] ? {
      trkpts,
      startpt: trkpts[0],
      endpt: trkpts[trkpts.length - 1],
    } : {
      trkpts: null,
      startpt: null,
      endpt: null,
    }),
  }
}

export default mapStrava
