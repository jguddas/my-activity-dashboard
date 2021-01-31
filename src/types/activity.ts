export type Trkpt = [
  number,
  number,
  number,
  number,
  number,
]

export type Activity = {
  id: string
  externalLink: string
  endTime: Date
  startTime: Date
  distance: number
  name: string
  duration: number
  date: Date
  trkpts: Trkpt[]
  startpt: Trkpt
  endpt: Trkpt
  speed: number
}
