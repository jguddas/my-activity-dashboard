import { InferValidatorType } from 'ts-blaze'

import isGpx from '../utils/isGpx'

export type Gpx = InferValidatorType<typeof isGpx>

export type Gpxpt = Gpx['gpx']['trk']['trkseg']['trkpt'][0]
