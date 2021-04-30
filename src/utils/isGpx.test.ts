import set from 'lodash/set'

import isGpx, { isNumberString, isDateTime } from './isGpx'

import { Gpx, Gpxpt } from '../types/gpx'

const getGpx = ():Gpx => {
  const validTrkPt:Gpxpt = {
    time: { _text: '2001-01-01T01:01:01Z' },
    ele: { _text: '5' },
    _attributes: { lat: '5', lon: '5' },
  }
  const validTrkPts:Gpxpt[] = [validTrkPt, validTrkPt]
  const validTrkSeg:Gpx['gpx']['trk']['trkseg'] = { trkpt: validTrkPts }
  const validTrk:Gpx['gpx']['trk'] = { name: { _text: 'string' }, trkseg: validTrkSeg }
  return { gpx: { trk: validTrk } }
}

describe('isDateTime', () => {
  it('basic', () => {
    expect(isDateTime('2001-01-01T01:01:01Z')).toBe(true)
    expect(isDateTime('string')).toBe(false)
  })
})

describe('isNumberString', () => {
  it('basic', () => {
    expect(isNumberString('0')).toBe(true)
    expect(isNumberString('50')).toBe(true)
    expect(isNumberString('50.55')).toBe(true)
    expect(isNumberString('')).toBe(false)
    expect(isNumberString('false')).toBe(false)
    expect(isNumberString('true')).toBe(false)
  })
})

describe('isGpx', () => {
  it('basic', () => {
    expect(isGpx(getGpx())).toBe(true)
  })
  it('name', () => {
    expect(isGpx(set(getGpx(), 'gpx.trk.name._text', 'Hello World'))).toBe(true)
    expect(isGpx(set(getGpx(), 'gpx.trk.name', null))).toBe(false)
    expect(isGpx(set(getGpx(), 'gpx.trk.name._text', null))).toBe(false)
  })
  it('trkpt min length', () => {
    expect(getGpx().gpx.trk.trkseg.trkpt.length).toBeGreaterThan(1)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt', []))).toBe(false)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt', [getGpx().gpx.trk.trkseg.trkpt[0]]))).toBe(false)
  })
  it('trkpt time format', () => {
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0.time._text', '2021-04-20T06:41:56Z'))).toBe(true)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0.time._text', null))).toBe(false)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0.time._text', 'Hello World'))).toBe(false)
  })
  it('trkpt ele format', () => {
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0.ele._text', '300'))).toBe(true)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0.ele._text', '300.55'))).toBe(true)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0.ele._text', 300))).toBe(false)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0.ele._text', null))).toBe(false)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0.ele._text', 'Hello World'))).toBe(false)
  })
  it('trkpt lat format', () => {
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0._attributes.lat', '50'))).toBe(true)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0._attributes.lat', '55.555555'))).toBe(true)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0._attributes.lat', 55))).toBe(false)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0._attributes.lat', null))).toBe(false)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0._attributes.lat', 'Hello World'))).toBe(false)
  })
  it('trkpt lon format', () => {
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0._attributes.lon', '50'))).toBe(true)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0._attributes.lon', '55.555555'))).toBe(true)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0._attributes.lon', 50))).toBe(false)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0._attributes.lon', null))).toBe(false)
    expect(isGpx(set(getGpx(), 'gpx.trk.trkseg.trkpt.0._attributes.lon', 'Hello World'))).toBe(false)
  })
})
