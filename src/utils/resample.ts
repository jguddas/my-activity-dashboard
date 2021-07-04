import lerp from './lerp'

const resample = (inp:[number, number][], scale:number):[number, number][] => {
  if (!inp.length) return []
  let arr = [...inp]
  const out:[number, number][] = []
  const max = arr[arr.length - 1][0]
  for (let i = 0; i <= max; i += scale) {
    const idx = arr.findIndex(([x]) => x >= i)
    if (arr[idx][0] === i) {
      out.push(arr[idx])
    } else if (idx && arr[idx - 1]) {
      out.push([i, lerp(arr[idx - 1], arr[idx], i)])
      arr = arr.slice(idx - 1)
    }
  }
  return out
}

export default resample
