import formatDuration from './formatDuration'

describe('formatDuration basic', () => {
  it('zero', () => {
    expect(formatDuration(0)).toBe('00:00:00')
  })
  it('seconds', () => {
    expect(formatDuration(5 * 1000)).toBe('00:00:05')
  })
  it('minutes', () => {
    expect(formatDuration(5 * 1000 * 60)).toBe('00:05:00')
  })
  it('hours', () => {
    expect(formatDuration(5 * 1000 * 60 * 60)).toBe('05:00:00')
  })
  it('days', () => {
    expect(formatDuration(500 * 1000 * 60 * 60)).toBe('500:00:00')
  })
})

describe('formatDuration round', () => {
  it('floor', () => {
    expect(formatDuration(5001)).toBe('00:00:05')
  })
  it('ceil', () => {
    expect(formatDuration(5999)).toBe('00:00:05')
  })
})
