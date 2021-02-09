export type Trkpt = [ number, number, number, number, number ]

export type ActivityWithTrkpts = {
  id: string
  externalLink: string
  endTime: string
  startTime: string
  distance: number
  name: string
  duration: number
  date: string
  trkpts: Trkpt[]
  startpt: Trkpt
  endpt: Trkpt
  speed: number
}

export type ActivityWithoutTrkpts = {
  id: string
  externalLink: string
  endTime: string
  startTime: string
  distance: number
  name: string
  duration: number
  date: string
  trkpts: null
  startpt: null
  endpt: null
  speed: number
}

export type Activity = ActivityWithTrkpts | ActivityWithoutTrkpts

export type SkeletonActivity = {
  duration: number
  trkpts: [number, number, number, number][]
  endpt: Trkpt
}
