import { object, string, array } from 'ts-blaze'

const isGpx = object({
  gpx: object({
    trk: object({
      name: object({ _text: string() }),
      trkseg: object({
        trkpt: array(object({
          time: object({ _text: string() }),
          ele: object({ _text: string() }),
          _attributes: object({
            lat: string(),
            lon: string(),
          }),
        })).satisfies((val) => val.length > 1),
      }),
    }),
  }),
})

export default isGpx
