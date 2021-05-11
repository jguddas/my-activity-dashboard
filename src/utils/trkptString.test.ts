import { encode, decode } from './trkptString'

describe('encode', () => {
  it('basic', () => {
    expect(encode([[52, 52, 0, 0, 0], [52, 52, 0, 5000, 5]]))
      .toBe('TURVczNnRT0=TUNFc04xRXMzUUU9,_gk|H_gk|H??')
  })
})

describe('decode', () => {
  it('basic', () => {
    expect(decode('TURVczNnRT0=TUNFc04xRXMzUUU9,_gk|H_gk|H??'))
      .toEqual([[52, 52, 0, 0, 0], [52, 52, 0, 5000, 5]])
  })
})
