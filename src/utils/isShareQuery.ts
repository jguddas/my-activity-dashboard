import * as blaze from 'ts-blaze'

const isShareQuery = blaze.object({
  name: blaze.string(),
  track: blaze.string(),
  sender: blaze.string(),
})

export type ShareQuery = blaze.InferValidatorType<typeof isShareQuery>

export default isShareQuery
