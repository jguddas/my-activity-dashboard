import interpolateTrkpts from './interpolateTrkpts'

describe('interpolateTrkpts', () => {
  it('basic', () => {
    expect(
      interpolateTrkpts(
        [
          [1, 1, 0, 0, 0],
          [2, 2, 0, 4000, 0],
        ],
      ),
    ).toEqual(
      [
        [1, 1, 0, 0, 0],
        [1.25, 1.25, 0, 1000, 0],
        [1.5, 1.5, 0, 2000, 0],
        [1.75, 1.75, 0, 3000, 0],
        [2, 2, 0, 4000, 0],
      ],
    )
  })
  it('multiple', () => {
    expect(
      interpolateTrkpts(
        [
          [1, 1, 0, 0, 0],
          [2, 2, 0, 4000, 0],
          [3, 3, 0, 5000, 0],
        ],
      ),
    ).toEqual(
      [
        [1, 1, 0, 0, 0],
        [1.25, 1.25, 0, 1000, 0],
        [1.5, 1.5, 0, 2000, 0],
        [1.75, 1.75, 0, 3000, 0],
        [2, 2, 0, 4000, 0],
        [3, 3, 0, 5000, 0],
      ],
    )
  })
})
