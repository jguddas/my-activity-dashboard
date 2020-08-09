/* eslint-disable camelcase */
import dayjs from 'dayjs'
import { last, round } from 'lodash'

const mapStrava = ({
  id, name, distance, streams, start_date, elapsed_time,
}) => {
  const trkpts = streams.time.data.map((time, idx) => ([
    streams.latlng.data[idx][0],
    streams.latlng.data[idx][1],
    streams.altitude.data[idx],
    time * 1000,
    round(streams.distance.data[idx] / 1000, 4),
  ]))

  const startTime = dayjs(start_date)

  return {
    id: `${id}`,
    endTime: startTime.add(elapsed_time, 'seconds').toISOString(),
    startTime: startTime.toISOString(),
    distance: distance / 1000,
    name,
    duration: elapsed_time * 1000,
    date: startTime.format('YYYY-MM-DD'),
    trkpts,
    startpt: trkpts[0],
    endpt: last(trkpts),
    speed: distance / (elapsed_time / 3.6),
  }
}

export default mapStrava
