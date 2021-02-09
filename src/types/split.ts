import { ActivityWithTrkpts, Trkpt } from './activity'

export type AToBSplit = {
  a: [number, number],
  b: [number, number],
  id: string,
  name: string,
  type: 'aTob',
}

export type DistanceSplit = {
  name: string,
  id: string,
  distance: number,
  type: 'distance',
}

export type ActivitySplit = {
  activity: ActivityWithTrkpts,
  name: string,
  type: 'matched',
}

export type StoredSplit = AToBSplit | DistanceSplit

export type Split = StoredSplit | ActivitySplit

export type ATobSplitMatch = {
  id: string,
  name: string,
  date: string,
  startTime: string,
  trkpts: Trkpt[],
  strtpt: Trkpt,
  endpt: Trkpt,
  value: number,
  speed: number,
  duration: number,
  distance: number,
  label: string,
}

export type DistanceSplitMatch = {
  id: string,
  name: string,
  date: string,
  startTime: string,
  distance: number,
  duration: number,
  speed: number,
  value: number,
  label: string
}

export interface ActivitySplitMatch extends ActivityWithTrkpts {
  value: number,
  label: string,
}

export type SplitMatch = ATobSplitMatch | DistanceSplitMatch | ActivitySplitMatch
