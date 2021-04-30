import { object, string, array } from 'ts-blaze'
import isFinite from 'lodash/isFinite'

const DATE_TIME_REGEXP = /^(\d\d\d\d)-(\d\d)-(\d\d)(t|\s)(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d:\d\d)?$/i

export const isDateTime = DATE_TIME_REGEXP.test.bind(DATE_TIME_REGEXP)

export const isNumberString = (s: string):boolean => isFinite(parseFloat(s))

const isGpx = object({
  gpx: object({
    trk: object({
      name: object({ _text: string() }),
      trkseg: object({
        trkpt: array(object({
          time: object({ _text: string().satisfies(isDateTime) }),
          ele: object({ _text: string().satisfies(isNumberString) }),
          _attributes: object({
            lat: string().satisfies(isNumberString),
            lon: string().satisfies(isNumberString),
          }),
        })).satisfies((val) => val.length > 1),
      }),
    }),
  }),
})

export default isGpx
