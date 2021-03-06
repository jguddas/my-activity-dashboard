const padZero = (x:number) => (x < 10 ? `0${x}` : `${x}`)

const formatDuration = (duration:number):string => `${
  padZero(Math.floor(duration / 3600000))
}:${
  padZero(Math.floor(duration / 60000) % 60)
}:${
  padZero(Math.floor(duration / 1000) % 60)
}`

export default formatDuration
