const lerp = ([x0, y0], [x1, y1], i) => y0 + ((y1 - y0) / (x1 - x0)) * (i - x0)

const resample = (inp, scale) => {
  let arr = [...inp]
  const out = []
  const max = arr[arr.length - 1][0]
  for (let i = 0; i < max; i += scale) {
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